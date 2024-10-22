<template>
  <div class="meeting-room-container">
    <div>{{ JSON.stringify(props.reserveRes) }}</div>
    <MeetingRoomComponent
      @getReserve="getReserveById()"
      :action-booking="actionBooking"
      :data="reserve"
    ></MeetingRoomComponent>
  </div>
</template>

<script setup lang="ts">
import MeetingRoomComponent from "@/components/MeetingRoomComponent.vue";
import axios from "axios";
import { PropType, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";

// @ is an alias to /src
// eslint-disable-next-line no-undef
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  actionStep3: {
    type: String as PropType<"SEND_APPROVE" | "APPROVE">,
    default: "SEND_APPROVE",
  },
  reserveRes: {
    type: Object,
    default: null,
  },
});

// const reserveRes = ref<any>({})
const loading = ref<boolean>(false);
const token = ref<string>("");
const actionBooking = ref<string>("");
const role = ref<number>(0);
const reserveId = ref<string>("");
const reserve = ref<any>(null);

watch(
  () => props.value,
  () => {
    handleSubmit();
  }
);

const handleSubmit = async () => {
  // let body: { [key: string]: boolean | string } = {
  //   reserve_id: reserveId.value,
  //   ac: false,
  // };

  loading.value = true;
  const route = {
    name: "AllBookingView",
  };
  if (actionBooking.value !== "view") {
    let body: any = {};

    //set new time format
    const [hStart, mStart] = props.reserveRes.start_time.split(":");
    let start_time = hStart + ":" + mStart;
    let [hEnd, mEnd] = props.reserveRes.end_time.split(":");
    let end_time = hEnd + ":" + mEnd;

    const reserver =
      typeof props.reserveRes.reserver === "object"
        ? props.reserveRes.reserver.id
        : props.reserveRes.reserver;

    let reserve = {
      ...props.reserveRes,
      start_time,
      end_time,
      reserver: reserver,
    };

    //0 = สร้าง | 1 = ส่งขอ | 2 = อนุมัติ
    if (actionBooking.value === "create") {
      //case สร้าง
      if (props.reserveRes) {
        body = { ...reserve, status: "1" };
      }
      //case admin อนุมัติ
    } else if (actionBooking.value === "edit" && role.value == 1) {
      if (props.reserveRes) {
        body = { ...reserve, status: "2" };
      }
    } else if (actionBooking.value === "edit" && role.value == 2) {
      if (props.reserveRes) {
        body = { ...reserve, status: "1" };
      }
    }

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/reserve/${props.reserveRes.id}`,
        body,
        {
          headers: {
            Authorization: "Bearer" + " " + token.value,
          },
        }
      );

      loading.value = false;
      router.push(route);
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  } else {
    // กรณี user เข้ามาจองห้อง
    router.push(route);
  }
};

const getReserveById = async () => {
  try {
    let reserveIdRes = await axios.get(
      `http://127.0.0.1:8000/api/reserve/${reserveId.value}`,
      {
        headers: {
          Authorization: "Bearer" + " " + token.value,
        },
      }
    );
    let data = await reserveIdRes.data.data;
    reserve.value = data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  window.scrollTo(0, 0);
  const authen = localStorage.getItem("authen");

  token.value = authen ? JSON.parse(authen).token : "";
  role.value = authen ? JSON.parse(authen).user.role : "";

  const router = useRoute();
  if (router.params.id) {
    reserveId.value = router.params.id as string;
  }
  actionBooking.value = router.params.action as string;

  if (actionBooking.value === "view") {
    getReserveById();
  }
});
</script>

<style scoped>
.meeting-room-container {
  border-radius: 4px;
  background: white;
  width: 100%;
  margin: auto;
  /* max-width: 900px; */
}
</style>
