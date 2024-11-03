<template>
  <div class="">
    <ModalComponent
      :size="dataModal.user ? SizeEnum.LG : SizeEnum.SM"
      :title="
        dataModal.user
          ? ''
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
        <div class="d-flex flex-wrap" style="justify-content: center">
          <div class="mx-6 mt-2 avatar-background">
            <AvatarComponent
              :size="SizeEnum.LG"
              :custom-avatar="avatar"
            ></AvatarComponent>
          </div>
          <div class="px-4 d-flex flex-column ga-3">
            <div class="d-flex mb-5">
              <h3>
                {{ "ที่นั่งหมายเลข" + " " + dataModal.id }}
              </h3>
            </div>
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
            <div class="d-flex">
              <b>Email: </b>
              <p class="mr-3 ml-2">
                {{ dataModal.user?.email }}
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
      <DotLottieVue
        class="tree-component"
        style="height: 150px; width: 150px"
        autoplay
        loop
        src="https://lottie.host/100726f9-f9af-4a2b-ae53-c40ce65561b7/xbHIAhcCBL.json"
      />
      <DotLottieVue
        class="air-component-1"
        style="height: 150px; width: 150px"
        autoplay
        loop
        src="https://lottie.host/342702f3-ba8f-4644-986c-2942595e98a5/HiHKX8AnCg.json"
      />
      <DotLottieVue
        class="air-component-2"
        style="height: 150px; width: 150px"
        autoplay
        loop
        src="https://lottie.host/342702f3-ba8f-4644-986c-2942595e98a5/HiHKX8AnCg.json"
      />

      <div v-if="status !== '2'" class="is-locked">
        <v-icon class="icon-locked" :size="150" color="white">mdi-lock</v-icon>
      </div>
      <div class="table">
        <div class="bottle-component"></div>
        <DotLottieVue
          class="lamp-component"
          style="height: 150px; width: 150px"
          autoplay
          loop
          src="https://lottie.host/38944677-aad1-41d0-b3f9-7874be129500/lO3s8Gv6kx.json"
        />
        <DotLottieVue
          class="coffee-component"
          style="height: 50px; width: 50px"
          autoplay
          loop
          src="https://lottie.host/45af2d4d-47a4-4a01-b33c-25299aa6241b/SWEDnWHk5l.json"
        />
        <DotLottieVue
          class="labtop-component"
          style="height: 100px; width: 100px"
          autoplay
          loop
          src="https://lottie.host/ad0f1d5c-2262-4b5f-8dfe-37f9aac989e1/ni7yBVDMXS.json"
        />
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
import {
  CustomAvatar,
  ThemeButtonEnum,
  TitleActionEnum,
  SizeEnum,
} from "./Type";
import ModalComponent from "./ModalComponent.vue";
import AnimateScroll from "@/components/AnimateScroll.vue";
import AvatarComponent from "./AvatarComponent.vue";
import { setAvatar } from "./helpers";
import { useRoute } from "vue-router";
import axios from "axios";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

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
    const status = ref<string>("");

    watch(
      () => props.data,
      (newValue) => {
        status.value = newValue.status;
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
      status,
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
      SizeEnum,
    };
  },
  components: {
    ChairComponent,
    GetInfoSection,
    ModalComponent,
    AnimateScroll,
    AvatarComponent,
    DotLottieVue,
  },
};
</script>

<style scoped>
.room {
  position: relative;
  background-color: #fffdf3;
  padding: 1px;
  margin: auto;
  max-width: 450px;
  border-radius: 8px;
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

.is-locked:hover {
  background: rgba(0, 0, 0, 0.658);
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
.is-locked {
  position: absolute;
  z-index: 5;
  background: rgba(0, 0, 0, 0.763);
  text-align: center;
  border-radius: 8px;
  margin: auto;
  transition: 0.2s linear;
  width: 100%;
  height: 100%;
}

.icon-locked {
  top: 45%;
}
.tree-component {
  position: absolute;
  right: -40px;
  top: -20px;
}
.lamp-component {
  position: absolute;
  right: -40px;
  top: -80px;
}
.air-component-1 {
  transform: rotate(90deg);
  position: absolute;
  right: -40px;
  top: 200px;
}
.air-component-2 {
  transform: rotate(90deg);
  position: absolute;
  right: -40px;
  top: 450px;
}

.bottle-component {
  position: absolute;
  height: 30px;
  width: 30px;
  top: 20px;
  left: 15px;
  /* padding: 171px 216px 0 216px; */
  background: url("../assets/water-bottle.png") center/cover no-repeat;
  color: white;
}
.coffee-component {
  position: absolute;
  top: 15px;
  left: -10px;
}

.labtop-component {
  transition: 0.3s;
  position: absolute;
  top: 320px;
}
.labtop-component:hover {
  transform: scale(1.2);
}
</style>
