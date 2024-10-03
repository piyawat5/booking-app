<template>
  <div>
    <div v-if="hasUser">
      <div class="info-container">
        <span>{{ number }}</span>
        <span>{{ user.firstName }} {{ user.lastName }}</span>
      </div>
      <div class="avatar">
        <AvatarComponent :custom-avatar="avatar"></AvatarComponent>
      </div>
    </div>
    <div class="chair-container">
      <img alt="chair" height="50" :src="require('@/assets/Vector.png')" />
      <p class="text-white absolute">{{ number }}</p>
    </div>
  </div>
</template>

<script lang="ts">
interface Props {
  number: number;
  user: User;
}
import { PropType, onMounted, ref } from "vue";
import { CustomAvatar, User } from "../components/Type";
import AvatarComponent from "./AvatarComponent.vue";

export default {
  props: {
    number: {
      type: Number,
      default: 1,
    },
    user: {
      type: Object as PropType<User>,
      default: () => ({}),
    },
  },
  setup(props: Props) {
    const hasUser = ref<boolean>(false);
    const avatar = ref({
      hair: "hair1",
      body: "body1",
      back: "back1",
      hat: "hat1",
      eye: "eye1",
    } as CustomAvatar);
    const checkUser = () => {
      if (props.user) {
        hasUser.value = true;
      }
    };
    onMounted(checkUser);
    return { hasUser, avatar };
  },
  components: { AvatarComponent },
};
</script>

<style scoped>
.chair-container {
  position: relative;
  width: 50px;
}

.info-container {
  position: relative;
  top: -20px;
}

.absolute {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.avatar {
  position: absolute;
  top: 2px;
}
</style>
