<template>
  <div class="page-container">
    <TitleComponent
      :action="TitleActionEnum.BOOKING"
      text="จองห้องประชุม"
    ></TitleComponent>

    <v-stepper
      :class="actionBooking === 'view' ? 'view' : ''"
      v-model="activeStep"
      hide-actions
      :items="['สร้างรายการจอง', 'ตั้งค่าห้องประชุม', 'สรุปข้อมูลการจอง']"
    >
      <!-- step 1 -->
      <template v-slot:[`item.1`]>
        <v-card flat>
          <CreateList
            :value="triggerSubmitStep1"
            :actionStep1="actionStep1"
            @get-reserve="reserveRes = $event"
          ></CreateList>
          <div
            style="height: 60px"
            class="d-flex justify-space-between align-center"
          >
            <v-btn @click="previousStep('step1')">ย้อนกลับ</v-btn>
            <v-btn @click="nextStep('step1')">{{ buttonText1 }}</v-btn>
          </div>
        </v-card>
      </template>

      <!-- step 2 -->
      <template v-slot:[`item.2`]>
        <v-card flat>
          <SettingList
            :value="triggerSubmitStep2"
            :action-step2="actionStep2"
            :reserve-res="reserveRes"
          ></SettingList>
          <div
            style="height: 60px"
            class="d-flex justify-space-between align-center"
          >
            <v-btn @click="previousStep('step2')">ย้อนกลับ</v-btn>
            <v-btn @click="nextStep('step2')">{{ buttonText2 }}</v-btn>
          </div>
        </v-card>
      </template>

      <!-- step 3 -->
      <template v-slot:[`item.3`]>
        <v-card flat>
          <RecapList
            :value="triggerSubmitStep3"
            :reserve-res="reserveRes"
          ></RecapList>
          <div
            style="height: 60px"
            class="d-flex justify-space-between align-center"
          >
            <v-btn
              v-if="actionBooking !== 'view'"
              @click="previousStep('step3')"
              >ย้อนกลับ</v-btn
            >
            <v-btn @click="nextStep('step3')">{{ buttonText3 }}</v-btn>
          </div>
        </v-card>
      </template>
    </v-stepper>
  </div>
</template>

<script setup lang="ts">
import TitleComponent from "@/components/TitleComponent.vue";
import CreateList from "./CreateList.vue";
import { onBeforeMount, ref } from "vue";
import { TitleActionEnum } from "@/components/Type";
import { useRoute } from "vue-router";
import router from "@/router";
import SettingList from "./SettingList.vue";
import RecapList from "./RecapList.vue";

// @ is an alias to /src
const activeStep = ref(1);
const actionBooking = ref<string>("create");
const triggerSubmitStep1 = ref<boolean>(false);
const triggerSubmitStep2 = ref<boolean>(false);
const triggerSubmitStep3 = ref<boolean>(false);
const actionStep1 = ref<"ADD" | "EDIT" | "VIEW">("ADD");
const actionStep2 = ref<"ADD" | "EDIT" | "VIEW">("ADD");
const reserveRes = ref<any>(null);
const buttonText1 = ref("");
const buttonText2 = ref("");
const buttonText3 = ref("");
const role = ref<number>(0);

const nextStep = (step: "step1" | "step2" | "step3") => {
  if (actionStep1.value !== "VIEW") {
    if (step === "step1") {
      triggerSubmitStep1.value = !triggerSubmitStep1.value;
    }

    if (step === "step2") {
      console.log(step);
      triggerSubmitStep2.value = !triggerSubmitStep2.value;
    }
  }

  if (step === "step3") {
    console.log(step);
    triggerSubmitStep3.value = !triggerSubmitStep3.value;
  }

  if (activeStep.value < 3) activeStep.value += 1;
};

const previousStep = (step: "step1" | "step2" | "step3") => {
  if (step === "step1") {
    const route = {
      name: "AllBookingView",
    };
    router.push(route);
    return;
  }

  if (step === "step2") {
    if (actionStep1.value !== "VIEW") {
      actionStep1.value = "EDIT";
    }
  }

  if (step === "step3") {
    if (actionStep2.value !== "VIEW") {
      actionStep2.value = "EDIT";
    }
  }

  if (activeStep.value > 1) activeStep.value -= 1;
};

//TODO: เปลี่ยนจาก view เป็น action อื่นในภายหลัง
const checkButtonText = () => {
  if (actionBooking.value === "view") {
    //สำหรับ user จองห้อง
    buttonText1.value = "ถัดไป";
    buttonText2.value = "ถัดไป";
    buttonText3.value = "ย้อนกลับ";
  } else if (actionBooking.value === "create") {
    //สำหรับ reserver จองห้อง
    buttonText1.value = "สร้างรายการจอง";
    buttonText2.value = "ถัดไป";
    buttonText3.value = "ส่งขออนุมัติ";
  } else if (actionBooking.value === "edit") {
    //สำหรับ reserver แก้ไข
    buttonText1.value = "บันทึก";
    buttonText2.value = "บันทึก";
    if (role.value === 1) {
      buttonText3.value = "อนุมัติการจอง";
    } else {
      buttonText3.value = "ส่งขออนุมัติ";
    }
  } else if (actionBooking.value === "approve") {
    //สำหรับ checker อนุมัติการจอง
    buttonText1.value = "ถัดไป";
    buttonText2.value = "ถัดไป";
    buttonText3.value = "ยืนยันการอนุมัติ";
  }
};

onBeforeMount(() => {
  window.scrollTo(0, 0);
  const route = useRoute();

  //get action params
  actionBooking.value = route.params.action as string;

  //get user info
  const authen = localStorage.getItem("authen");
  role.value = authen ? JSON.parse(authen).user.role : "";

  if (actionBooking.value === "edit" && route.params.id) {
    actionStep1.value = "EDIT";
    actionStep2.value = "EDIT";
  }
  if (actionBooking.value === "view" && route.params.id) {
    activeStep.value = 3;
    actionStep1.value = "VIEW";
    actionStep2.value = "VIEW";
  }
  checkButtonText();
});
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
