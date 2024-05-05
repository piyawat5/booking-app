<template>
  <div class="">
    Announcement {{ announceId }}

    <TitleComponent></TitleComponent>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import TitleComponent from "@/components/TitleComponent.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "AnnounceView",
  setup() {
    const route = useRoute();
    const announceId = ref("");

    onMounted(() => {
      window.scrollTo(0, 0);
      announceId.value = route?.params?.id as string;
      console.log(announceId.value);
    });

    return {
      announceId,
    };
  },
  components: { TitleComponent },
};
</script>

<style scoped>
h1,
p {
  color: white;
}

.banner {
  position: relative;
  height: 500px;
  padding: 171px 216px 0 216px;
  background: url("../assets/meeting.png") center/cover no-repeat;
  color: white;
}

.banner::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.banner h1,
.banner p,
.banner div {
  position: relative;
  z-index: 1;
}

.content {
  width: 100%;
  max-width: 615px;
  display: flex;
  flex-direction: column;
  gap: 43px;
}
</style>
