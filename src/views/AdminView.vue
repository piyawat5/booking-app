<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import { onBeforeMount } from "vue";

export default {
  name: "AdminView",
  // components: {
  //   HelloWorld
  // }

  setup() {
    onBeforeMount(() => {
      window.scrollTo(0, 0);
    });
    return {};
  },
};
</script>
