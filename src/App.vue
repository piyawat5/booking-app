<template>
  <navbar-component
    v-if="!isLoginPage && loginStore.isLogin"
  ></navbar-component>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import NavbarComponent from "./components/NavbarComponent.vue";
import { computed, onMounted } from "vue";
import axios from "axios";
import router from "@/router";
import { useLoginStore } from "@/store";

//https://github.com/vuejs/vue-cli/issues/7431
//แก้ bug ERROR ResizeObserver loop completed with undelivered notifications.
// eslint-disable-next-line no-unused-vars
const debounce = (callback: (...args: any[]) => void, delay: number) => {
  let tid: any;
  return function (...args: any[]) {
    const ctx = self;
    tid && clearTimeout(tid);
    tid = setTimeout(() => {
      callback.apply(ctx, args);
    }, delay);
  };
};

//แก้ bug animation vue
const _ = (window as any).ResizeObserver;
(window as any).ResizeObserver = class ResizeObserver extends _ {
  // eslint-disable-next-line no-unused-vars
  constructor(callback: (...args: any[]) => void) {
    callback = debounce(callback, 20);
    super(callback);
  }
};
const route = useRoute();
const loginStore = useLoginStore();
const isLoginPage = computed(() => route.name === "LoginView");

const verify = async () => {
  const authen = localStorage.getItem("authen");
  let token = "";
  if (authen) {
    token = JSON.parse(authen).token;
  }
  try {
    await axios.post(`http://127.0.0.1:8000/api/verify`, null, {
      headers: {
        Authorization: "Bearer" + " " + token,
      },
    });
    loginStore.login();
    if (route.name === "LoginView") {
      const route = {
        name: "HomeView",
      };
      router.push(route);
    }
  } catch (error) {
    console.log(error);
    loginStore.logout();
    const route = {
      name: "LoginView",
    };
    router.push(route);
  }
  return false; // return false หาก verify ไม่สำเร็จ
};

onMounted(() => {
  verify();
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap");

#app {
  font-family: "IBM Plex Sans Thai", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

body {
  background: #f0f2f5;
}

/* route transitions */
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
thead {
  background-color: #f8f9fa;
}
.v-table > .v-table__wrapper > table > tbody > tr > th,
.v-table > .v-table__wrapper > table > thead > tr > th,
.v-table > .v-table__wrapper > table > tfoot > tr > th {
  height: 40px !important;
  border-bottom: 1px solid #e9ecef !important;
}

.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  height: 40px !important;
  border-bottom: 1px solid #e9ecef !important;
  text-align: left;
}
.v-table__wrapper {
  font-size: 12px;
}

/* .v-input__control {
  height: 20px !important;
} */
.v-checkbox .v-selection-control {
  max-height: 20px !important;
  min-height: 0px !important;
  font-size: 14px;
}
.v-selection-control .v-label {
  font-size: 14px;
}
</style>
