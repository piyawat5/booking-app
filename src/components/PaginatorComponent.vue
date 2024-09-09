<template>
  <div class="text-center">
    <v-pagination v-model="currentPage" :length="pages"></v-pagination>
    <div class="dropdown-box">
      <!-- <v-select
        v-model="sizePage"
        :items="[2, 25, 50]"
        label="Rows per page"
        @update:modelValue="onChangeRowsPerPage"
        density="compact"
        hide-details
        outlined
      /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";

interface Props {
  page?: number;
  size?: number;
  count: number;
}

export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 0,
    },
  },
  setup(props: Props, { emit }: any) {
    const currentPage = ref<number>(1);
    const amountLists = ref<number>(100);
    const sizePage = ref<number>(15);
    const pages = ref<number>(0);

    const next = (newPage: number) => {
      emit("pageChange", newPage);
    };

    const onChangeRowsPerPage = (newValue: number) => {
      sizePage.value = newValue;
      calPages();
      emit("changeSize", sizePage.value);
    };

    const calPages = () => {
      pages.value = Math.ceil(amountLists.value / sizePage.value);
    };

    watch(
      () => props.count,
      (newCount) => {
        amountLists.value = newCount;
        calPages();
      }
    );

    watch(currentPage, (newPage) => {
      next(newPage); // เรียกฟังก์ชัน next เมื่อ currentPage เปลี่ยน
    });

    watch(
      () => props.page,
      (newValue) => {
        currentPage.value = newValue as number;
      }
    );

    return {
      next,
      onChangeRowsPerPage,
      currentPage,
      amountLists,
      sizePage,
      pages,
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

.dropdown-box {
  max-width: 100px;
}
</style>
