<template>
  <div class="filter-wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  setup() {},
};
</script>

<style scoped>
.filter-wrapper {
  width: 95%;
  margin: auto;

  padding: 24px;
  background: white;
  border-radius: 8px;
}
</style>
