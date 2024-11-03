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
        <div class="mt-8">
          <v-btn
            :loading="loading"
            color="#ce1212"
            style="flex: 1"
            @click="submit()"
          >
            บันทึก
          </v-btn>
        </div>
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
const loading = ref<boolean>(false);

const userDetail = ref<any>(null);

const token = ref<string>("");
const user = ref<any>(null);

const submit = async () => {
  let body = {
    avatar_back: avatar.value?.back
      ? avatar.value?.back.replaceAll("back", "")
      : null,
    avatar_face: avatar.value?.face
      ? avatar.value?.face.replaceAll("face", "")
      : null,
    avatar_hair: avatar.value?.hair
      ? avatar.value?.hair.replaceAll("hair", "")
      : null,
    avatar_head: avatar.value?.head
      ? avatar.value?.head.replaceAll("head", "")
      : null,
    avatar_shirt: avatar.value?.shirt
      ? avatar.value?.shirt.replaceAll("shirt", "")
      : null,
    avatar_skin: avatar.value?.skin
      ? avatar.value?.skin.replaceAll("skin", "")
      : null,
  };

  loading.value = true;

  try {
    await axios.put(
      `http://127.0.0.1:8000/api/userDetail/${userDetail.value?.id}`,
      body,
      {
        headers: {
          Authorization: "Bearer" + " " + token.value,
        },
      }
    );

    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};

const getUserDetail = async () => {
  loading.value = true;
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
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
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
