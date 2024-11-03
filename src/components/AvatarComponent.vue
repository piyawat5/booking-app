<template>
  <div class="avatar-container">
    <div v-for="item in customType" :key="item">
      <img
        v-if="avatar[item]"
        :class="size === SizeEnum.SM ? item : item + '-' + 'lg'"
        :src="getImgUrl(avatar[item] || '')"
      />
    </div>
    <v-icon
      :size="size === SizeEnum.SM ? 'xxx-large' : '250px'"
      style="color: rgb(255, 215, 166)"
      >mdi-account</v-icon
    >
  </div>
</template>

<script lang="ts">
import { PropType, Ref, onMounted, ref, watch } from "vue";
import { CustomAvatar, SizeEnum } from "./Type";

interface Props {
  customAvatar: CustomAvatar;
  size: SizeEnum;
}

export default {
  props: {
    customAvatar: {
      type: Object as PropType<CustomAvatar>, // Define the type
      required: true, // Make the prop optional
    },
    size: {
      type: String as PropType<SizeEnum>,
      default: SizeEnum.SM,
    },
  },
  setup(props: Props) {
    const avatar = ref<CustomAvatar>({});
    const customType: Ref<(keyof typeof avatar.value)[]> = ref([]);

    const getKeyofCustomAvatar = () => {
      for (const key in avatar.value) {
        customType.value = [...customType.value, key as keyof CustomAvatar];
      }
    };

    //how to check customType that is key of CustomAvatar
    // function isAvatarProperty(prop: string): prop is keyof typeof avatar.value {
    //   return customType.value.includes(prop);
    // }
    const updateAvatar = () => {
      avatar.value = props.customAvatar;
      getKeyofCustomAvatar();
    };

    watch(() => props.customAvatar, updateAvatar);

    const getImgUrl = (value: string) => {
      var images = require.context("../assets/", false, /\.png$/);
      return images("./" + value + ".png");
    };

    onMounted(updateAvatar);

    return { avatar, customType, getImgUrl, SizeEnum };
  },
};
</script>

<style scoped>
.avatar-container {
  position: relative;
  width: fit-content;
  z-index: 2;
}
.hair {
  height: 30px;
  position: absolute;
  left: 9px;
  top: 1px;
  z-index: 4;
}
.hair-lg {
  height: 150px;
  position: absolute;
  left: 50px;
  top: 10px;
  z-index: 4;
}
.head {
  height: 22px;
  position: absolute;
  left: 13px;
  top: -9px;
  z-index: 5;
}
.head-lg {
  height: 100px;
  position: absolute;
  left: 75px;
  top: -40px;
  z-index: 5;
}
.back {
  height: 48px;
  position: absolute;
  left: 0px;
  top: 12px;
  z-index: 1;
}
.back-lg {
  height: 250px;
  position: absolute;
  left: 0px;
  top: 60px;
  z-index: 1;
}
.shirt {
  height: 25px;
  width: 40px;
  position: absolute;
  left: 4px;
  top: 27px;
  z-index: 2;
}
.shirt-lg {
  height: 125px;
  width: 200px;
  position: absolute;
  left: 25px;
  top: 140px;
  z-index: 2;
}

.face {
  height: 14px;
  position: absolute;
  left: 17.2px;
  top: 10px;
  z-index: 4;
}
.face-lg {
  height: 75px;
  position: absolute;
  left: 88px;
  top: 52px;
  z-index: 4;
}
</style>
