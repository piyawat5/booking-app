<template>
  <div></div>
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
    theme: {
      type: String as PropType<ThemeButtonEnum>,
      default: ThemeButtonEnum.PRIMARY,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style></style>
