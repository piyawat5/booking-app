<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <RoomSelectComponent></RoomSelectComponent>
  </div>
</template>

<script lang="ts">
import RoomSelectComponent from "@/components/RoomSelectComponent.vue";

export default {
  name: "AdminView",
  components: {
    RoomSelectComponent,
  },

  setup() {
    // onBeforeMount(() => {
    //   window.scrollTo(0, 0);
    // });
    return {};
  },
};
</script>
