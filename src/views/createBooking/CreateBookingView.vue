<template>
  <div class="page-container">
    <TitleComponent
      :action="TitleActionEnum.BOOKING"
      text="จองห้องประชุม"
    ></TitleComponent>

    <v-stepper
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
            <v-btn @click="nextStep('step1')">Next</v-btn>
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
            <v-btn @click="nextStep('step2')">Next</v-btn>
          </div>
        </v-card>
      </template>

      <!-- step 3 -->
      <template v-slot:[`item.3`]>
        <v-card flat>
          <RecapList></RecapList>
          <div
            style="height: 60px"
            class="d-flex justify-space-between align-center"
          >
            <v-btn @click="previousStep('step3')">ย้อนกลับ</v-btn>
            <v-btn @click="nextStep('step3')">Next</v-btn>
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
const actionStep1 = ref<"ADD" | "EDIT" | "VIEW">("ADD");
const actionStep2 = ref<"ADD" | "EDIT" | "VIEW">("ADD");
const reserveRes = ref();

const nextStep = (step: "step1" | "step2" | "step3") => {
  if (step === "step1") {
    if (actionStep1.value !== "VIEW") {
      triggerSubmitStep1.value = !triggerSubmitStep1.value;
    }
  }

  if (step === "step2") {
    if (actionStep1.value !== "VIEW") {
      triggerSubmitStep2.value = !triggerSubmitStep2.value;
    }
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

onBeforeMount(() => {
  window.scrollTo(0, 0);
  const route = useRoute();
  actionBooking.value = route.params.action as string;
  if (actionBooking.value === "edit" && route.params.id) {
    actionStep1.value = "EDIT";
    actionStep2.value = "EDIT";
  }
  if (actionBooking.value === "view" && route.params.id) {
    actionStep1.value = "VIEW";
    actionStep2.value = "VIEW";
  }
});
</script>

<style scoped>
.page-container {
  font-size: 14px;
  width: 95%;
  margin: 100px auto;
  padding: 2px 24px 24px 24px;
  background: white;
  border-radius: 8px;
}
</style>
