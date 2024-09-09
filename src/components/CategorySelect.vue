<template>
  <div style="display: flex; gap: 25px; margin: 12px 0px 0px 0px">
    <div
      :class="!categorySelected && 'active'"
      class="selector-container"
      style="padding-left: 15px"
      @click="select()"
    >
      <div>ทั้งหมด</div>
      <div class="category-selector">
        {{ allRoom }}
      </div>
    </div>
    <div
      :class="categorySelected === 1 && 'active'"
      class="selector-container"
      @click="select(1)"
    >
      <div>ห้องประชุมขนาดเล็ก</div>
      <div class="category-selector">
        {{ smallRoom }}
      </div>
    </div>
    <div
      :class="categorySelected === 2 && 'active'"
      class="selector-container"
      @click="select(2)"
    >
      <div>ห้องประชุมขนาดกลาง</div>
      <div class="category-selector">
        {{ mediumRoom }}
      </div>
    </div>
    <div
      :class="categorySelected === 3 && 'active'"
      class="selector-container"
      @click="select(3)"
    >
      <div>Auditorium</div>
      <div class="category-selector">
        {{ auditorium }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

interface Props {
  allRoom: number;
  smallRoom: number;
  mediumRoom: number;
  auditorium: number;
}

export default {
  props: {
    allRoom: {
      type: Number,
      default: 0,
    },
    smallRoom: {
      type: Number,
      default: 0,
    },
    mediumRoom: {
      type: Number,
      default: 0,
    },
    auditorium: {
      type: Number,
      default: 0,
    },
  },
  setup(props: Props, { emit }: any) {
    const categorySelected = ref<number | undefined>();
    const select = (value?: number) => {
      categorySelected.value = value;
      emit("select", value);
    };

    return {
      select,
      categorySelected,
    };
  },
  components: {},
};
</script>

<style scoped>
.category-selector {
  background-color: #ce1212;
  border-radius: 32px;
  color: white;
  width: 35px;
  height: 19px;
}

.active {
  border-bottom: 2px solid #ce1212;
}

.selector-container {
  cursor: pointer;
  display: flex;
  gap: 5px;
}
</style>
