<template>
  <div class="nav-container">
    <nav>
      <img alt="logo" height="20px" :src="require('@/assets/PIYA.png')" />
      <router-link v-for="(list, i) in menus" :key="i" :to="list.path">
        {{ list.name }}
      </router-link>
    </nav>
    <v-btn outlined rounded id="menu-activator" color="primary100">
      {{ user.first_name + " " + user.last_name }}
      <v-icon right dark> mdi-login </v-icon>
    </v-btn>

    <v-menu activator="#menu-activator">
      <v-list>
        <v-list-item
          @click="action(item.value)"
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <template></template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog v-model="confirmLogout" max-width="400" persistent>
      <v-card
        prepend-icon="mdi-map-marker"
        text="คุณต้องการออกจากระบบตอนนี้หรือไม่ โปรดยืนยัน"
        title="ยืนยันการออกจากระบบ"
      >
        <template v-slot:actions>
          <v-spacer></v-spacer>

          <v-btn @click="logout(ConfirmEnum.NO)"> ยกเลิก </v-btn>

          <v-btn @click="logout(ConfirmEnum.YES)"> ยืนยัน </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Menu } from "./Type";
import { ref } from "vue";
import { ValueEnum } from "./Type";
import { ConfirmEnum } from "./Type";
import axios from "axios";
import { useLoginStore } from "@/store";
import router from "@/router";

interface Items {
  title: string;
  value: ValueEnum;
}
const loginStore = useLoginStore();
const user = ref<any>({});
const confirmLogout = ref<boolean>(false);

const menus: Menu[] = [
  { name: "หน้าแรก", path: "/" },
  { name: "ห้องทั้งหมด", path: "/all-booking" },
  { name: "เกี่ยวกับเรา", path: "/about" },
  { name: "แอดมิน", path: "/admin" },
];

const items: Items[] = [
  { title: "ปรับเปลี่ยนอวาตาร์", value: ValueEnum.AVATAR },
  { title: "ลงชื่อออก", value: ValueEnum.LOGOUT },
];

const logout = async (value: ConfirmEnum) => {
  confirmLogout.value = false;
  if (value === ConfirmEnum.YES) {
    try {
      const authen = localStorage.getItem("authen");
      let token = "";
      if (authen) {
        token = JSON.parse(authen).token;
      }
      await axios.post(`http://127.0.0.1:8000/api/logout`, null, {
        headers: {
          Authorization: "Bearer" + " " + token,
        },
      });
      loginStore.logout((route) => {
        const params = {
          name: route,
        };

        router.push(params);
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const action = (value: ValueEnum) => {
  if (value === ValueEnum.AVATAR) {
    const params = {
      name: "ProfileView",
    };

    router.push(params);
  } else if (value === ValueEnum.LOGOUT) {
    confirmLogout.value = true;
  }
};

onMounted(() => {
  const authen = localStorage.getItem("authen");
  if (authen) {
    user.value = JSON.parse(authen).user;
  }
});
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
