<template>
  <div class="calendar-container">
    <FullCalendarComponent
      :value="props.value"
      :actionStep1="props.actionStep1"
      @getReserve="emit('getReserve', $event)"
    ></FullCalendarComponent>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import FullCalendarComponent from "@/components/FullCalendarComponent.vue";
import { PropType } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  actionStep1: {
    type: String as PropType<"ADD" | "EDIT" | "VIEW">,
    default: "ADD",
  },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["getReserve"]);

onBeforeMount(() => {});
</script>

<style scoped>
.calendar-container {
  width: 100%;
}
</style>
