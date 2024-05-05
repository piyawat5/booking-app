<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <TitleComponent></TitleComponent>
  </div>
</template>

<script lang="ts">
import TitleComponent from "@/components/TitleComponent.vue";

export default {
  name: "AdminView",
  components: {
    TitleComponent,
  },

  setup() {
    // onBeforeMount(() => {
    //   window.scrollTo(0, 0);
    // });
    return {};
  },
};
</script>
