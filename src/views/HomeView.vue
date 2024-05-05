<template>
  <div class="home">
    <div class="banner">
      <div class="content">
        <div>
          <h1>ก้าวไปข้างหน้าได้ด้วยการปรึกษา</h1>
          <h1>“กันและกัน”</h1>
        </div>
        <p>
          เพื่อความเป็นระเบียบ แบบแผน และความรวดเร็ว
          เราจึงจัดทำเว็ปไซต์สำหรับจองห้องประชุม ภายในบริษัท ปิยะวัตร จำกัด
        </p>
        <div class="button">
          <v-btn color="primary100"
            >จองทันที <v-icon right dark> mdi-book-edit-outline </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="service-container">
      <title-component
        text="ประกาศ"
        :action="TitleActionEnum.ANNOUNCE"
      ></title-component>
      <animate-scroll :animationType="'zoom'">
        <announce-component></announce-component>
      </animate-scroll>
      <animate-scroll :animationType="'zoom'">
        <announce-component></announce-component>
      </animate-scroll>
      <animate-scroll :animationType="'zoom'">
        <announce-component></announce-component>
      </animate-scroll>
      <animate-scroll :animationType="'zoom'">
        <announce-component></announce-component>
      </animate-scroll>
      <animate-scroll :animationType="'zoom'">
        <announce-component></announce-component>
      </animate-scroll>
      <animate-scroll :animationType="'zoom'">
        <announce-component></announce-component>
      </animate-scroll>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { onBeforeMount } from "vue";
import TitleComponent from "@/components/TitleComponent.vue";
import { colors } from "../main";
import { TitleActionEnum } from "@/components/Type";
import AnnounceComponent from "@/components/AnnounceComponent.vue";
import AnimateScroll from "@/components/AnimateScroll.vue";

export default {
  name: "HomeView",
  setup() {
    onBeforeMount(() => {
      window.scrollTo(0, 0);
    });
    return { colors, TitleActionEnum };
  },
  components: { TitleComponent, AnnounceComponent, AnimateScroll },
};
</script>

<style scoped>
.service-container {
  padding: 0 24px;
}

h1,
p {
  color: white;
}

.banner {
  position: relative;
  height: 500px;
  padding: 171px 216px 0 216px;
  background: url("../assets/meeting.png") center/cover no-repeat;
  color: white;
}

.banner::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.banner h1,
.banner p,
.banner div {
  position: relative;
  z-index: 1;
}

.content {
  width: 100%;
  max-width: 615px;
  display: flex;
  flex-direction: column;
  gap: 43px;
}
@media (max-width: 900px) {
  .banner {
    padding: 150px 80px 0 80px;
  }
}

@media (max-width: 600px) {
  .banner {
    padding: 150px 20px 0 20px;
  }
}

@media (max-width: 475px) {
  .banner {
    padding: 120px 20px 0 20px;
  }

  .content {
    gap: 20px;
  }
}
</style>
