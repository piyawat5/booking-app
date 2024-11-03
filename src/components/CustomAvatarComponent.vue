<template>
  <div>
    <div class="d-flex" style="gap: 36px">
      <div
        class="cursor-pointer"
        @click="
          activeType = item.type;
          checkCustomType();
        "
        v-for="(item, index) in customMenu"
        :key="index"
      >
        {{ item.name }}
      </div>
    </div>
    <template v-for="(item, i) in custom" :key="i">
      <div class="d-flex custom-container" v-if="item.type === activeType">
        <div v-for="(value, j) in item.customItem" :key="j">
          <!-- :class="size === SizeEnum.SM ? item : item + '-' + 'lg'" -->
          <div
            style="width: 80px; font-size: 40px; color: grey"
            v-if="value.id === '0'"
            class="custom-item text-center pt-3"
            @click="
              activePart = '';
              avatarSelected['avatar_' + item.type] = '0';
              emit('selected', avatarSelected);
            "
          >
            🛇
          </div>
          <img
            v-else
            class="custom-item"
            :class="item.type + value.id === activePart ? 'active' : ''"
            :src="getImgUrl(item.type + value.id || '')"
            @click="
              activePart = item.type + value.id;
              avatarSelected['avatar_' + item.type] = value.id;
              emit('selected', avatarSelected);
            "
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import { AllCustoms, CustomMenu, CustomTypeEnum } from "./Type";
export default {
  props: {
    userDetail: {
      type: Object,
      required: false,
    },
  },
  setup(props: any, { emit }: any) {
    const activeType = ref<CustomTypeEnum>(CustomTypeEnum.HAIR);
    const activePart = ref<string>("");
    const avatarSelected = ref<any>({
      avatar_face: null,
      avatar_head: null,
      avatar_hair: null,
      avatar_back: null,
      avatar_shirt: null,
      avatar_skin: null,
    });

    const customMenu = ref<CustomMenu[]>([
      { type: CustomTypeEnum.HAIR, name: "ทรงผม" },
      { type: CustomTypeEnum.SHIRT, name: "เสื้อผ้า" },
      { type: CustomTypeEnum.FACE, name: "หน้า" },
      { type: CustomTypeEnum.HEAD, name: "หมวก" },
      { type: CustomTypeEnum.BACK, name: "หลัง" },
    ]);
    const custom = ref<AllCustoms[]>([
      {
        type: CustomTypeEnum.HEAD,
        customItem: [
          { id: "0", description: "-", name: "-" },
          { id: "1", description: "-", name: "เคราหมี" },
          { id: "2", description: "-", name: "1" },
          { id: "3", description: "-", name: "เคราหมี" },
          { id: "4", description: "-", name: "เคราหมี" },
          { id: "5", description: "-", name: "เคราหมี" },
          { id: "6", description: "-", name: "เคราหมี" },
          { id: "7", description: "-", name: "เคราหมี" },
          { id: "8", description: "-", name: "เคราหมี" },
          { id: "9", description: "-", name: "เคราหมี" },
          { id: "10", description: "-", name: "เคราหมี" },
          { id: "11", description: "-", name: "เคราหมี" },
          { id: "12", description: "-", name: "เคราหมี" },
          { id: "13", description: "-", name: "เคราหมี" },
          { id: "14", description: "-", name: "เคราหมี" },
          { id: "15", description: "-", name: "เคราหมี" },
          { id: "16", description: "-", name: "เคราหมี" },
          { id: "17", description: "-", name: "เคราหมี" },
        ],
      },
      {
        type: CustomTypeEnum.SHIRT,
        customItem: [
          { id: "0", description: "-", name: "-" },
          { id: "1", description: "-", name: "เคราหมี" },
          { id: "2", description: "-", name: "เคราหมี" },
          { id: "3", description: "-", name: "2" },
          { id: "4", description: "-", name: "เคราหมี" },
          { id: "5", description: "-", name: "เคราหมี" },
          { id: "6", description: "-", name: "เคราหมี" },
          { id: "7", description: "-", name: "เคราหมี" },
          { id: "8", description: "-", name: "เคราหมี" },
          { id: "9", description: "-", name: "เคราหมี" },
          { id: "10", description: "-", name: "เคราหมี" },
          { id: "11", description: "-", name: "เคราหมี" },
        ],
      },
      {
        type: CustomTypeEnum.HAIR,
        customItem: [
          { id: "0", description: "-", name: "-" },
          { id: "1", description: "-", name: "เคราหมี" },
          { id: "2", description: "-", name: "เคราหมี" },
          { id: "3", description: "-", name: "3" },
          { id: "4", description: "-", name: "เคราหมี" },
          { id: "5", description: "-", name: "เคราหมี" },
          { id: "6", description: "-", name: "เคราหมี" },
          { id: "7", description: "-", name: "เคราหมี" },
          { id: "8", description: "-", name: "เคราหมี" },
          { id: "9", description: "-", name: "เคราหมี" },
          { id: "10", description: "-", name: "เคราหมี" },
          { id: "11", description: "-", name: "เคราหมี" },
          { id: "12", description: "-", name: "เคราหมี" },
          { id: "13", description: "-", name: "เคราหมี" },
          { id: "14", description: "-", name: "เคราหมี" },
          { id: "15", description: "-", name: "เคราหมี" },
          { id: "16", description: "-", name: "เคราหมี" },
          { id: "17", description: "-", name: "เคราหมี" },
          { id: "18", description: "-", name: "เคราหมี" },
          { id: "19", description: "-", name: "เคราหมี" },
          { id: "20", description: "-", name: "เคราหมี" },
          { id: "21", description: "-", name: "เคราหมี" },
          { id: "22", description: "-", name: "เคราหมี" },
          { id: "23", description: "-", name: "เคราหมี" },
          { id: "24", description: "-", name: "เคราหมี" },
          { id: "25", description: "-", name: "เคราหมี" },
          { id: "26", description: "-", name: "เคราหมี" },
          { id: "27", description: "-", name: "เคราหมี" },
          { id: "28", description: "-", name: "เคราหมี" },
        ],
      },
      {
        type: CustomTypeEnum.BACK,
        customItem: [
          { id: "0", description: "-", name: "-" },
          { id: "1", description: "-", name: "เคราหมี" },
          { id: "2", description: "-", name: "เคราหมี" },
          { id: "3", description: "-", name: "4" },
          { id: "4", description: "-", name: "เคราหมี" },
          { id: "5", description: "-", name: "เคราหมี" },
          { id: "6", description: "-", name: "เคราหมี" },
          { id: "7", description: "-", name: "เคราหมี" },
          { id: "8", description: "-", name: "เคราหมี" },
        ],
      },
      {
        type: CustomTypeEnum.FACE,
        customItem: [
          { id: "0", description: "-", name: "-" },
          { id: "1", description: "-", name: "เคราหมี" },
          // { id: "2", description: "-", name: "เคราหมี" },
          // { id: "3", description: "-", name: "5" },
          // { id: "4", description: "-", name: "เคราหมี" },
          // { id: "5", description: "-", name: "เคราหมี" },
          // { id: "6", description: "-", name: "เคราหมี" },
          // { id: "7", description: "-", name: "เคราหมี" },
          // { id: "8", description: "-", name: "เคราหมี" },
          // { id: "9", description: "-", name: "เคราหมี" },
          // { id: "10", description: "-", name: "เคราหมี" },
          // { id: "11", description: "-", name: "เคราหมี" },
          // { id: "12", description: "-", name: "เคราหมี" },
          // { id: "13", description: "-", name: "เคราหมี" },
          // { id: "14", description: "-", name: "เคราหมี" },
          // { id: "15", description: "-", name: "เคราหมี" },
          // { id: "16", description: "-", name: "เคราหมี" },
          // { id: "17", description: "-", name: "เคราหมี" },
          // { id: "18", description: "-", name: "เคราหมี" },
          // { id: "19", description: "-", name: "เคราหมี" },
          // { id: "20", description: "-", name: "เคราหมี" },
        ],
      },
    ]);
    const userDetail = ref<any>(null);

    watch(
      () => props.userDetail,
      (newValue) => {
        userDetail.value = newValue;
        checkCustomType();
      }
    );

    const checkCustomType = () => {
      if (avatarSelected.value["avatar_" + activeType.value]) {
        activePart.value =
          activeType.value + avatarSelected.value["avatar_" + activeType.value];
      } else {
        for (const key in userDetail.value) {
          const [avatar, part] = key.split("_");
          if (avatar === "avatar") {
            if (activeType.value === part) {
              activePart.value = part + userDetail.value[key];
            }
          }
        }
      }
    };

    const getImgUrl = (value: string) => {
      var images = require.context("../assets/", false, /\.png$/);
      return images("./" + value + ".png");
    };

    return {
      custom,
      activeType,
      customMenu,
      getImgUrl,
      checkCustomType,
      activePart,
      avatarSelected,
      emit,
    };
  },
  components: {},
};
</script>

<style scoped>
.custom-container {
  flex-wrap: wrap;
  gap: 8px;
}

.custom-item {
  cursor: pointer;
  height: 80px;
}

.custom-item.active {
  border: 1px solid #ce1212;
  border-radius: 16px;
  background-color: #fff5f5;
}
</style>
