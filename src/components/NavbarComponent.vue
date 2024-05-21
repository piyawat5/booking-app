<template>
  <div class="nav-container">
    <nav>
      <img alt="logo" height="20px" :src="require('@/assets/PIYA.png')" />
      <router-link v-for="(list, i) in menus" :key="i" :to="list.path">
        {{ list.name }}
      </router-link>
    </nav>
    <v-btn outlined rounded color="primary100"
      >เข้าสู่ระบบ <v-icon right dark> mdi-login </v-icon></v-btn
    >
  </div>
</template>

<script lang="ts">
import { colors } from "@/main";
import { Menu } from "./Type";

export default {
  setup() {
    const menus: Menu[] = [
      { name: "หน้าแรก", path: "/" },
      { name: "ห้องทั้งหมด", path: "/all-booking" },
      { name: "เกี่ยวกับเรา", path: "/about" },
      { name: "แอดมิน", path: "/admin" },
    ];

    return { menus, colors };
  },
};
</script>

<style scoped>
.fb-btn.v-btn--outlined {
  border: thin solid #cccccc;
}
img {
  margin: 2px;
}
.nav-container {
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  gap: 24px;
}

nav {
  width: 100%;
  border-radius: 40px;
  padding: 16px;
  background: hsla(0, 0%, 19%, 0.727);
  display: flex;
  justify-content: space-between;
}

nav a {
  text-decoration: none;
  color: white;
}

.account {
  margin-right: 24px;
  width: 116px;
}

nav a.router-link-exact-active {
  font-weight: bold;
  display: inline-block;
  position: relative;
}
nav a.router-link-exact-active::after {
  content: "";
  width: 40%;
  border-bottom: 5px solid #ce1212;
  border-radius: 40px;
  position: absolute;
  left: calc(40% - 10%);
  bottom: -5px;
}
</style>
