<template>
  <div class="page-container">
    <TitleComponent></TitleComponent>
    <div class="meeting-room-container">
      <MeetingRoomComponent></MeetingRoomComponent>
    </div>
  </div>
</template>

<script lang="ts">
import MeetingRoomComponent from "@/components/MeetingRoomComponent.vue";
import TitleComponent from "@/components/TitleComponent.vue";
import { onBeforeMount } from "vue";

// @ is an alias to /src

export default {
  name: "BookingView",
  components: { MeetingRoomComponent, TitleComponent },
  setup() {
    onBeforeMount(() => {
      window.scrollTo(0, 0);
    });
    return {};
  },
};
</script>

<style scoped>
.page-container {
  margin: 100px auto;
}
.meeting-room-container {
  border-radius: 4px;
  background: white;
  width: 100%;
  margin: auto;
  padding: 24px 0;
  max-width: 900px;
}
</style>
