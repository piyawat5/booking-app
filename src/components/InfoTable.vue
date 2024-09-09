<template>
  <div style="display: flex; gap: 7px">
    <v-icon>{{ "mdi-magnify" }}</v-icon>
    <div>ค้นพบทั้งหมด</div>
    <div style="color: #ce1212">{{ count }}</div>
    <div>รายการ</div>
    <div>|</div>
    <div class="mr-1">
      หน้า {{ currentPage }}/{{ allPage == 0 ? 1 : allPage }}
    </div>
    <v-checkbox
      v-model="isShow"
      label="แสดงเฉพาะวันนี้"
      @input="toggle"
      color="#ce1212"
      hide-details
    ></v-checkbox>
  </div>
</template>

<script lang="ts">
interface Props {
  currentPage: number;
  allPage: number;
  count: number;
}
import { ref } from "vue";

export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    allPage: {
      type: Number,
      default: 1,
    },
    count: {
      type: Number,
      default: 0,
    },
    // type: Object as PropType<User>,
    // default: () => ({}),
  },
  setup(props: Props, { emit }: any) {
    const isShow = ref<boolean>(false);

    const toggle = () => {
      emit("show", isShow.value);
    };

    return { isShow, toggle };
  },
  components: {},
};
</script>

<style scoped></style>
