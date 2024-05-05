<template>
  <div class="room-container">
    <div class="room">{{ name }}</div>
    <div class="status">สถานะ: {{ roomStatus }}</div>
    <div class="type">ประเภท: {{ roomType }}</div>
  </div>
</template>

<script lang="ts">
import { PropType, onMounted, ref } from "vue";
import { RoomStatusEnum, RoomTypeEnum } from "./Type";

export default {
  name: "RoomSelectComponent",
  props: {
    name: {
      type: String,
      default: "A1",
    },
    roomStatus: {
      type: String as PropType<RoomStatusEnum>,
      default: RoomStatusEnum.FREE,
    },
    roomType: {
      type: String as PropType<RoomTypeEnum>,
      default: RoomTypeEnum.MEETINGROOM,
    },
  },
  setup() {
    const someValue = ref();
    console.log(someValue.value);

    onMounted(() => {});

    return {};
  },
};
</script>

<style scoped></style>
