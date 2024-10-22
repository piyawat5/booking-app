<template>
  <div class="testla">
    <div class="page-container">
      <DotLottieVue
        class="lotties-meeting"
        autoplay
        loop
        src="https://lottie.host/430558a0-2050-404c-a464-5e49bfd2aee9/4WyxSB28R2.json"
      />
      <form @submit.prevent="submit">
        <h1 class="mb-7">ระบบจองห้องประชุม</h1>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              :disabled="loading"
              v-model="account.email"
              label="Email"
              density="compact"
              outlined
              variant="solo"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              :disabled="loading"
              v-model="account.password"
              label="password"
              density="compact"
              outlined
              variant="solo"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="12">
            <v-btn
              :loading="loading"
              type="submit"
              style="width: 100%"
              :color="'#ce1212'"
              >เข้าสู่ระบบ</v-btn
            >
          </v-col>
        </v-row>
      </form>
    </div>
    <v-snackbar v-model="snackbar" vertical :color="'red'">
      <div class="text-subtitle-1 pb-2">อุปส์! กรุณาลองใหม่อีกครั้ง</div>

      <p>Email หรือ Password ไม่ถูกต้อง</p>

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { Account } from "@/components/Type";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import axios from "axios";
import { ref } from "vue";
import router from "@/router";
import { useLoginStore } from "@/store";
// @ is an alias to /src
const account = ref<Account>({
  email: "admin04@hotmail.com",
  password: "1234",
});
const loginStore = useLoginStore();
const snackbar = ref<boolean>(false);

const loading = ref<boolean>(false);

const submit = async () => {
  try {
    loading.value = true;
    let res = await axios.post(
      `http://127.0.0.1:8000/api/login`,
      account.value
    );
    localStorage.setItem("authen", JSON.stringify(res.data));
    loginStore.login();
    loading.value = false;
    const route = {
      name: "HomeView",
    };
    router.push(route);
  } catch (error) {
    console.log(error);
    loginStore.logout();
    loading.value = false;
    snackbar.value = true;
  }
};
</script>

<style scoped>
.testla {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.page-container {
  display: flex;
  font-size: 14px;
  max-width: 900px;
  width: 100%;
  padding: 2px 24px 24px 24px;
  flex-wrap: wrap;
  background: white;
  align-items: center;
  border-radius: 8px;
}

.lotties-meeting {
  height: 500px;
  width: 500px;
}

@media only screen and (max-width: 838px) {
  .page-container {
    justify-content: center;
    width: 95%;
  }
  .lotties-meeting {
    height: 300px;
    width: 300px;
  }
}
</style>
