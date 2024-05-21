<template>
  <div class="page-container">
    <FilterBookingComponent>
      <TitleComponent></TitleComponent>
      <div class="all-booking">test</div>
    </FilterBookingComponent>
  </div>
</template>

<script lang="ts">
import TitleComponent from "@/components/TitleComponent.vue";
import { onBeforeMount } from "vue";
import FilterBookingComponent from "@/components/FilterBookingComponent.vue";

// @ is an alias to /src

export default {
  name: "AllBookingView",
  components: { TitleComponent, FilterBookingComponent },
  setup() {
    onBeforeMount(() => {
      window.scrollTo(0, 0);
    });
    return {};
  },
};
</script>

<style scoped>
.all-booking {
  width: 100%;
  max-width: 900px;
  margin: auto;
}
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
