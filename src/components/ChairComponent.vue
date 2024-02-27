<template>
  <div>
    <div v-if="hasUser">
      <span>{{ number }}</span>
      <span>{{ user.firstName }} {{ user.lastName }}</span>
      <!-- <div>{{  }}</div> -->
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
import { User } from "../components/Type";

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
    const hasUser = ref<boolean>(true);

    const checkUser = () => {
      if (props.user) {
        hasUser.value = true;
      }
    };

    onMounted(checkUser);

    return { hasUser };
  },
};
</script>

<style scoped>
.chair-container {
  position: relative;
  width: 50px;
}

.absolute {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
