<template>
  <div class="nav-container">
    <nav>
      <img alt="logo" height="20px" :src="require('@/assets/PIYA.png')" />
      <router-link v-for="(list, i) in routes" :key="i" :to="list.path">
        {{ list.name }}
      </router-link>
    </nav>
    <button class="account">เข้าสู่ระบบ</button>
  </div>
</template>

<script lang="ts">
import { routes } from "../router/index";

export default {
  setup() {
    return { routes };
  },
};
</script>

<style scoped>
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
  max-width: 840px;
  display: flex;
  align-items: center;
  gap: 48px;
}

nav {
  width: 100%;
  border-radius: 40px;
  padding: 16px;
  background: hsla(0, 0%, 19%, 0.506);
  display: flex;
  justify-content: space-between;
}

nav a {
  text-decoration: none;
  color: white;
}

.account {
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
