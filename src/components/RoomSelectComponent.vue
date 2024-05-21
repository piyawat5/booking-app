<template>
  <div
    class="room-container"
    :class="
      roomStatus == RoomStatusEnum.FREE
        ? 'free-status'
        : roomStatus == RoomStatusEnum.MODERATE
        ? 'moderate-status'
        : 'full-status'
    "
  >
    <div
      class="room-box d-flex justify-center align-center"
      :class="
        roomStatus == RoomStatusEnum.FREE
          ? 'free-status'
          : roomStatus == RoomStatusEnum.MODERATE
          ? 'moderate-status'
          : 'full-status'
      "
    >
      <div style="margin-top: 3px">
        {{ name }}
      </div>
    </div>
    <div class="status">
      <span> สถานะ: </span>
      <span style="font-weight: bold">
        {{ roomStatus }}
      </span>
    </div>
    <div class="type" style="margin-top: 5px">
      <span> ประเภท: </span>
      <span style="font-weight: bold">
        {{ roomType }}
      </span>
    </div>
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

    return { RoomStatusEnum, RoomTypeEnum };
  },
};
</script>

<style scoped>
.room-container {
  position: relative;
  padding: 35px 15px 25px 15px;
  border: 4px solid red;
  border-radius: 20px;
  background: white;
  width: 100%;
  max-width: 170px;
}
.room-box {
  position: absolute;
  left: 57px;
  top: -25px;
  font-weight: bold;
  width: 100%;
  max-width: 45px;
  height: 45px;
  border-radius: 100px;
  background: white;
}

.free-status {
  border: 4px solid #43e323;
}
.moderate-status {
  border: 4px solid #f7df70;
}
.full-status {
  border: 4px solid #ce1212;
}
</style>
