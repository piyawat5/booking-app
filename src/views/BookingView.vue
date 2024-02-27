<template>
  <div class="home">
    <ChairComponent></ChairComponent>
    <AvatarComponent :customAvatar="avatar"></AvatarComponent>
  </div>
</template>

<script lang="ts">
import AvatarComponent from "@/components/AvatarComponent.vue";
import ChairComponent from "@/components/ChairComponent.vue";
import { CustomAvatar } from "@/components/Type";
import { ref } from "vue";

// @ is an alias to /src

export default {
  name: "BookingView",
  components: { ChairComponent, AvatarComponent },
  setup() {
    const avatar = ref({
      hair: "hair1",
      body: "body1",
      back: "back1",
      hat: "hat1",
      eye: "eye1",
    } as CustomAvatar);
    return { avatar };
  },
};
</script>
