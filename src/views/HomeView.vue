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
        <div @click="navigate" class="button">
          <v-btn color="primary100"
            >จองทันที <v-icon right dark> mdi-book-edit-outline </v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <div class="home-content-container">
      <div class="home-intro-container">
        <animate-scroll :animationType="'zoom'">
          <DotLottieVue
            class="lotties-about-us"
            autoplay
            loop
            src="https://lottie.host/e14a695f-2884-49bf-b21e-f5c9456b0381/Ez5f6Yj88j.json"
          />
        </animate-scroll>
        <div>
          <div class="intro-box">
            <div class="feedback-text">
              <div style="font-size: 40px">เราน้อมรับทุก Feedback</div>
              <div>เพื่อพัฒนาระบบที่ดียิ่งขึ้น...</div>
            </div>
            <p>
              ระบบนี้ทำขึ้นเพื่อ เป็น personal project สำหรับสมัครงาน ของ นาย
              ปิยะวัตร พินทุสรศรี และเพื่อฝึกฝน ทักษะในการใช้ framework Laravel
              11 และ Vue 3
            </p>
            <p>
              วัตถุประสงค์ของระบบนี้ สร้างมาเพื่อจัดการ
              การจองห้องประชุมภายในบริษัท (ที่สมมติขึ้นมาเอง)
              เพื่อให้มีความสะดวกสบายของพนักงานมากยิ่งขึ้น
            </p>
            <ul>
              <li>ช่วยลดเวลาในการหาห้องประชุม</li>
              <li>
                มีหลักฐานการจองที่ชัดเจน เพื่อป้องกันการจองทับซ้อนกันเกิดขึ้น
              </li>
              <li>
                มีระบบตั้งค่าห้องประชุม
                เพื่อเพิ่มความรวดเร็วในการจัดเดรียมห้องประชุม
              </li>
              <li>สามารถติดตามเวลาการจองได้อย่างแม่นยำ</li>
              <li>
                ลดภาระค่าใช้จ่ายในส่วน ค่าไฟส่วนเกิน
                กรณีที่เปิดเครื่องใช้ไฟฟ้าทิ้งไว้ในห้องที่ไม่มีการจอง
              </li>
              <li>พนักงานรับรู้ข่าวสารได้ง่ายขึ้นจากการประกาศ บนหน้าระบบ</li>
            </ul>
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
import router from "@/router";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

export default {
  name: "HomeView",
  setup() {
    onBeforeMount(() => {
      window.scrollTo(0, 0);
    });

    const navigate = () => {
      const route = {
        name: "CreateBookingView",
        params: {
          action: "create",
        },
      };
      router.push(route);
    };
    return {
      navigate,
      colors,
      TitleActionEnum,
    };
  },
  components: {
    TitleComponent,
    AnnounceComponent,
    AnimateScroll,
    DotLottieVue,
  },
};
</script>

<style scoped>
.home-content-container {
  position: relative;
  border-radius: 26px;
  top: -70px;
  width: 95%;
  padding: 34px;
  margin: auto;
  box-shadow: inset 0 0 1px 1px#fefefee6, 0 20px 27px#0000000d !important;
  background-color: #fff !important;
}

.service-container {
  padding: 0 24px;
}

h1,
p {
  color: white;
}

.banner {
  border-bottom-left-radius: 80px;
  border-bottom-right-radius: 80px;
  position: relative;
  min-height: 95vh;
  /* height: 900px; */
  padding: 171px 216px 0 216px;
  background: url("../assets/meeting.png") center/cover no-repeat;
  color: white;
}

.banner::after {
  border-bottom-left-radius: 80px;
  border-bottom-right-radius: 80px;
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
.lotties-about-us {
  height: 500px;
  width: 500px;
}

.content {
  position: absolute;
  bottom: 50px;
  width: 100%;
  max-width: 615px;
  display: flex;
  flex-direction: column;
  gap: 43px;
}

.home-intro-container {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.intro-box {
  border-radius: 60px;
  position: relative;
  padding: 42px;
  background-color: #ce1212;
  color: white;
  z-index: 10px;
}
.feedback-text {
  background-image: repeating-linear-gradient(
      0deg,
      #ce1212,
      #ce1212 12px,
      transparent 12px,
      transparent 22px,
      #ce1212 22px
    ),
    repeating-linear-gradient(
      90deg,
      #ce1212,
      #ce1212 12px,
      transparent 12px,
      transparent 22px,
      #ce1212 22px
    ),
    repeating-linear-gradient(
      180deg,
      #ce1212,
      #ce1212 12px,
      transparent 12px,
      transparent 22px,
      #ce1212 22px
    ),
    repeating-linear-gradient(
      270deg,
      #ce1212,
      #ce1212 12px,
      transparent 12px,
      transparent 22px,
      #ce1212 22px
    );
  background-size: 3px calc(100% + 22px), calc(100% + 22px) 3px,
    3px calc(100% + 22px), calc(100% + 22px) 3px;
  background-position: 0 0, 0 0, 100% 0, 0 100%;
  background-repeat: no-repeat;
  animation: borderAnimation 0.9s infinite linear;
  color: black;
  border-radius: 10px;
  padding: 30px;
  position: absolute;
  top: -115px;
  left: -50px;
}

@keyframes borderAnimation {
  from {
    background-position: 0 0, -22px 0, 100% -22px, 0 100%;
  }
  to {
    background-position: 0 -22px, 0 0, 100% 0, -22px 100%;
  }
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
