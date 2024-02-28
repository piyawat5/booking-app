<template>
  <div>
    <div class="button-container">
      <ButtonComponent text="ข้อมูลห้อง"></ButtonComponent>
      <ButtonComponent
        text="ข้อมูลการจองของฉัน"
        :theme="ThemeButtonEnum.OUTLINE"
      ></ButtonComponent>
    </div>
    <div class="text-grey refresh-button mt-10">
      <v-icon>mdi-refresh</v-icon>
      <span style="cursor: pointer" :onclick="handleRefresh">รีเฟรช</span>
    </div>
  </div>
</template>

<script lang="ts">
import ButtonComponent from "./ButtonComponent.vue";
import { ThemeButtonEnum } from "./Type";

export default {
  setup() {
    const handleRefresh = () => {
      return;
    };
    return { ThemeButtonEnum, handleRefresh };
  },
  components: { ButtonComponent },
};
</script>

<style scoped>
.refresh-button {
  display: flex;
  justify-content: center;
}
.button-container {
  display: flex;
  gap: 24px;
  justify-content: center;
}
</style>
