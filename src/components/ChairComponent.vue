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
