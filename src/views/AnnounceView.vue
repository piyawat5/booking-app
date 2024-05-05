<template>
  <div class="">Announcement {{ announceId }}</div>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "AnnounceView",
  setup() {
    const route = useRoute();
    const announceId = ref("");

    onMounted(() => {
      window.scrollTo(0, 0);
      announceId.value = route.params.id;
    });

    return {
      announceId,
    };
  },
  components: {},
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
