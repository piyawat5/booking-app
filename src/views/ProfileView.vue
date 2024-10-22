<template>
  <div class="page-container">
    <TitleComponent
      :action="TitleActionEnum.BOOKING"
      text="จองห้องประชุม"
    ></TitleComponent>
    <div class="d-flex" style="gap: 36px">
      <div
        class="mx-12 my-8"
        style="
          background-color: cornflowerblue;
          border-radius: 100%;
          height: fit-content;
        "
      >
        <AvatarComponent
          :size="SizeEnum.LG"
          :custom-avatar="avatar"
        ></AvatarComponent>
      </div>
      <div style="flex: 1">
        <CustomAvatarComponent
          @selected="onSelected($event)"
          :userDetail="userDetail"
        ></CustomAvatarComponent>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useRoute } from "vue-router";
// import router from "@/router";
import AvatarComponent from "@/components/AvatarComponent.vue";
import TitleComponent from "@/components/TitleComponent.vue";
import { CustomAvatar, TitleActionEnum, SizeEnum } from "@/components/Type";
import CustomAvatarComponent from "@/components/CustomAvatarComponent.vue";
import { onBeforeMount, ref } from "vue";
import axios from "axios";

const avatar = ref<CustomAvatar>({});

const userDetail = ref<any>(null);

const token = ref<string>("");
const user = ref<any>(null);

const getUserDetail = async () => {
  try {
    let response = await axios.get(
      "http://127.0.0.1:8000/api/userDetail/" + user.value.id,
      {
        headers: {
          Authorization: "Bearer" + " " + token.value,
        },
      }
    );

    let json = await response.data;
    userDetail.value = json.userDetail;

    for (const key in userDetail.value) {
      const [first, sec] = key.split("_");
      if (first === "avatar" && userDetail.value[key]) {
        avatar.value[sec as keyof CustomAvatar] = sec + userDetail.value[key];
      }
    }
    // eslint-disable-next-line no-unused-vars
    let { skin, ...newObj } = avatar.value;
    avatar.value = newObj;
  } catch (error) {
    console.log(error);
  }
};

const onSelected = (value: any) => {
  let customObj: CustomAvatar = {};
  for (const key in value) {
    // eslint-disable-next-line no-unused-vars
    const [first, sec] = key.split("_");
    if (value[key] && value[key] !== "0") {
      customObj[sec as keyof CustomAvatar] = sec + value[key];
    } else if (value[key] && value[key] === "0") {
      customObj[sec as keyof CustomAvatar] = undefined;
      console.log("foo");
    }
  }
  avatar.value = { ...avatar.value, ...customObj };
  console.log(89, avatar.value);
};

onBeforeMount(() => {
  window.scrollTo(0, 0);
  const authen = localStorage.getItem("authen");
  token.value = authen ? JSON.parse(authen).token : "";
  user.value = authen ? JSON.parse(authen).user : null;
  getUserDetail();
});
// @ is an alias to /src
</script>

<style>
.page-container {
  font-size: 14px;
  width: 95%;
  margin: 100px auto;
  padding: 2px 24px 24px 24px;
  background: white;
  border-radius: 8px;
}

.view .v-stepper-header {
  display: none;
}
</style>
