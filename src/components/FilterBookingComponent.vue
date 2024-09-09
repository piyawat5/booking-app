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
  padding: 24px;
  background: #f8f7f7;
  border-radius: 8px;
  min-width: 100%;
}
</style>
