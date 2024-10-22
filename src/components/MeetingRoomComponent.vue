<template>
  <div class="">
    <ModalComponent
      :title="
        dataModal.user
          ? 'ที่นั่งหมายเลข' + ' ' + dataModal.id
          : 'คุณต้องการจองที่นั่งหมายเลข' +
            ' ' +
            dataModal.id +
            ' ' +
            'หรือไม่ ?'
      "
      :isOpen="isModalOpen"
      @close="closeModal"
    >
      <!-- has user -->
      <div v-if="dataModal.user">
        <div class="d-flex">
          <div class="mx-6 mt-2 avatar-background">
            <AvatarComponent :custom-avatar="avatar"></AvatarComponent>
          </div>
          <div class="px-4 d-flex flex-column ga-3" style="flex: 1">
            <div class="d-flex">
              <b>ชื่อ: </b>
              <p class="mr-3 ml-2">
                {{ dataModal.user.first_name }}
              </p>
              <p>
                {{ dataModal.user.last_name }}
              </p>
            </div>
            <div class="d-flex">
              <b>ตำแหน่ง: </b>
              <p class="mr-3 ml-2">
                {{ dataModal.user?.position }}
              </p>
            </div>
            <div class="d-flex">
              <b>เบอร์โทรติดต่อ: </b>
              <p class="mr-3 ml-2">
                {{ dataModal.user?.tel }}
              </p>
            </div>
          </div>
        </div>
        <div class="text-right mt-4">
          <v-btn
            @click="closeModal"
            :theme="ThemeButtonEnum.OUTLINE"
            text="ปิด"
          ></v-btn>
        </div>
      </div>
      <!-- space -->
      <div v-else>
        <div>
          <p class="mb-4">
            กรุณายืนยัน หากต้องการจองที่นั่งหมายเลข {{ dataModal.id }}
          </p>
          <div class="d-flex justify-space-between">
            <v-btn
              @click="closeModal"
              :theme="ThemeButtonEnum.OUTLINE"
              text="ปิด"
            ></v-btn>
            <v-btn color="#ce1212" @click="onSubmit()" text="ยืนยัน"></v-btn>
          </div>
        </div>
      </div>
    </ModalComponent>
    <GetInfoSection></GetInfoSection>
    <div class="room">
      <div class="table">
        <div
          v-for="item in seats"
          :key="item.id"
          :class="`chair-${item.id} chair-container`"
        >
          <animate-scroll :animationType="'fade'">
            <ChairComponent
              :number="item.id"
              :user="item.user"
              :onclick="
                () => {
                  openModal(item);
                }
              "
            ></ChairComponent>
          </animate-scroll>
        </div>
      </div>
    </div>
    <v-snackbar v-model="snackbar" vertical>
      <div class="text-subtitle-1 pb-2">This is a snackbar message</div>

      <p>This is a longer paragraph explaining something</p>

      <template v-slot:actions>
        <v-btn color="indigo" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch } from "vue";
import ChairComponent from "./ChairComponent.vue";
import GetInfoSection from "./GetInfoSection.vue";
import { CustomAvatar, ThemeButtonEnum, TitleActionEnum } from "./Type";
import ModalComponent from "./ModalComponent.vue";
import AnimateScroll from "@/components/AnimateScroll.vue";
import AvatarComponent from "./AvatarComponent.vue";
import { setAvatar } from "./helpers";
import { useRoute } from "vue-router";
import axios from "axios";

// import axios from "axios";

export default {
  name: "MeetingRoomComponent",
  props: {
    data: {
      type: Object,
      default: null,
    },
    actionBooking: {
      type: String,
      default: "view",
    },
  },
  setup(props: any, { emit }: any) {
    const isModalOpen = ref(false);
    const seats = ref<any>([]);
    const dataModal = ref<any>({});
    const avatar = ref<CustomAvatar>({});
    const token = ref<string>("");
    const reserveId = ref<string>("");
    const snackbar = ref<boolean>(false);

    watch(
      () => props.data,
      (newValue) => {
        for (const seat of seats.value) {
          let findUser = newValue.room_members.find(
            (value: any) => value.seat == seat.id
          );
          if (findUser) {
            seat.user = findUser.users;
          }
        }
      }
    );

    onMounted(() => {
      const router = useRoute();
      if (router.params.id) {
        reserveId.value = router.params.id as string;
      }
      const authen = localStorage.getItem("authen");
      token.value = authen ? JSON.parse(authen).token : "";
      for (let i = 1; i <= 13; i++) {
        let seat = {
          id: i.toString(),
          user: null,
        };
        seats.value.push(seat);
      }
    });

    const onSubmit = async () => {
      let authen = localStorage.getItem("authen");
      let userId = "";
      if (authen) {
        userId = JSON.parse(authen).user.id;
      }
      let checkDuplicated = seats.value?.some(
        (seat: any) => seat?.user?.id == userId
      );
      if (!checkDuplicated) {
        try {
          console.log(dataModal.value);
          let body = {
            reserve_id: reserveId.value,
            user_id: userId,
            seat: dataModal.value.id,
          };
          await axios.post("http://127.0.0.1:8000/api/roomMember", body, {
            headers: {
              Authorization: "Bearer" + " " + token.value,
            },
          });
          isModalOpen.value = false;
          emit("getReserve", "getReserve!");
        } catch (error) {
          console.log(error);
        }
      } else {
        snackbar.value = true;
      }
    };

    const openModal = (value: any) => {
      dataModal.value = value;
      if (value.user?.user_details) {
        let userDetail = value.user?.user_details;
        avatar.value = setAvatar(userDetail);
      }
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };
    return {
      TitleActionEnum,
      openModal,
      closeModal,
      isModalOpen,
      seats,
      dataModal,
      avatar,
      onSubmit,
      ThemeButtonEnum,
      snackbar,
    };
  },
  components: {
    ChairComponent,
    GetInfoSection,
    ModalComponent,
    AnimateScroll,
    AvatarComponent,
  },
};
</script>

<style scoped>
.room {
  background-color: #fff6ee;
  padding: 1px;
  margin: auto;
  max-width: 450px;
}

.table {
  position: relative;
  background: #913f00;
  margin: 150px auto 40px auto;
  height: 553px;
  width: 145px;
  border-radius: 15px;
}

.chair-container {
  cursor: pointer;
  position: absolute;
}

.chair-1 {
  right: 160px;
}
.chair-2 {
  right: 160px;
  top: 95px;
}
.chair-3 {
  right: 160px;
  top: 190px;
}
.chair-4 {
  right: 160px;
  top: 285px;
}
.chair-5 {
  right: 160px;
  top: 380px;
}
.chair-6 {
  right: 160px;
  top: 475px;
}
.chair-7 {
  right: -68px;
}
.chair-8 {
  right: -68px;
  top: 95px;
}
.chair-9 {
  right: -68px;
  top: 190px;
}
.chair-10 {
  right: -68px;
  top: 285px;
}
.chair-11 {
  right: -68px;
  top: 380px;
}
.chair-12 {
  right: -68px;
  top: 475px;
}
.chair-13 {
  left: 47px;
  top: -79px;
}
.avatar-background {
  height: fit-content;
  background: rgb(98, 198, 255);
  border-radius: 100%;
}
</style>
