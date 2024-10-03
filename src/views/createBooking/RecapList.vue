<template>
  <div class="meeting-room-container">
    <MeetingRoomComponent></MeetingRoomComponent>
  </div>
</template>

<script lang="ts">
import MeetingRoomComponent from "@/components/MeetingRoomComponent.vue";
import { onBeforeMount } from "vue";

// @ is an alias to /src

export default {
  name: "FormBookingView",
  components: { MeetingRoomComponent },
  setup() {
    onBeforeMount(() => {
      window.scrollTo(0, 0);
    });
    return {};
  },
};
</script>

<style scoped>
.meeting-room-container {
  border-radius: 4px;
  background: white;
  width: 100%;
  margin: auto;
  /* max-width: 900px; */
}
</style>
