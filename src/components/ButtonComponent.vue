<template>
  <div>
    <button
      :class="theme === ThemeButtonEnum.PRIMARY ? 'is-primary' : 'is-outline'"
    >
      {{ text }}
    </button>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { ThemeButtonEnum } from "./Type";

export default {
  props: {
    text: {
      type: String,
      default: "Button",
    },
    icon: {
      type: String,
      default: "",
    },
    theme: {
      type: String as PropType<ThemeButtonEnum>,
      default: ThemeButtonEnum.PRIMARY,
    },
  },
  setup() {
    return { ThemeButtonEnum };
  },
};
</script>

<style scoped>
button {
  border-radius: 4px;
  padding: 10px 26px;
}
.is-primary {
  color: white;
  background: #ce1212;
  border: 2px solid #ce1212;
  transition: 0.5s;
}

.is-primary:hover {
  background: rgb(209, 91, 91);
  border: 2px solid rgb(209, 91, 91);
}

.is-outline {
  background: white;
  color: #ce1212;
  border: 2px solid #ce1212;
  border-inline-color: red;
  transition: 0.5s;
}

.is-outline:hover {
  background: rgb(255, 235, 235);
}
</style>
