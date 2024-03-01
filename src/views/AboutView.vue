<template>
  <div class="about-container">
    <TitleComponent
      text="เพิ่มการจอง"
      :action="TitleActionEnum.BOOKING"
    ></TitleComponent>
    <div class="calendar-container">
      <FullCalendarComponent></FullCalendarComponent>
    </div>
  </div>
</template>

<script lang="ts">
import FullCalendarComponent from "@/components/FullCalendarComponent.vue";
import TitleComponent from "@/components/TitleComponent.vue";
import { TitleActionEnum } from "@/components/Type";

export default {
  name: "AboutView",
  components: {
    FullCalendarComponent,
    TitleComponent,
  },
  setup() {
    return { TitleActionEnum };
  },
};
</script>

<style scoped>
.about-container {
  margin: 100px auto;
}
.calendar-container {
  border-radius: 4px;
  background: white;
  margin: auto;
  padding: 24px;
  width: 100%;
  max-width: 900px;
}
</style>
