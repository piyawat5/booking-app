<template>
  <div>
    <div v-if="hasUser">
      <div class="info-container">
        <span>{{ number }}</span>
        <span>{{ user.first_name }} </span>
      </div>
      <div class="avatar">
        <AvatarComponent :custom-avatar="avatar"></AvatarComponent>
      </div>
    </div>
    <div :class="hasUser ? '' : 'non-user'" class="chair-container">
      <img alt="chair" height="50" :src="require('@/assets/Vector.png')" />
      <p class="text-white absolute">{{ number }}</p>
    </div>
  </div>
</template>

<script lang="ts">
interface Props {
  number: string;
  user: any;
}
import { PropType, ref, watch } from "vue";
import { CustomAvatar } from "../components/Type";
import AvatarComponent from "./AvatarComponent.vue";
import { setAvatar } from "./helpers";

export default {
  props: {
    number: {
      type: String,
      default: "1",
    },
    user: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  },
  setup(props: Props) {
    const hasUser = ref<boolean>(false);
    const avatar = ref<CustomAvatar>({});
    watch(
      () => props.user,
      () => checkUser()
    );
    const checkUser = () => {
      if (props.user) {
        hasUser.value = true;
        let userDetail = props.user.user_details;
        avatar.value = setAvatar(userDetail);
      }
    };
    return { hasUser, avatar };
  },
  components: { AvatarComponent },
};
</script>

<style scoped>
.non-user:hover {
  transform: scale(1.2);
}

.avatar:hover {
  transform: scale(1.1);
}
.chair-container {
  transition: 0.3s;
  position: relative;
  width: 50px;
}

.info-container {
  position: absolute;
  top: -50px;
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
  transition: 0.3s;
  z-index: 5;
  top: -22px;
}
</style>
