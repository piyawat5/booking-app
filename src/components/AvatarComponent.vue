<template>
  <div class="avatar-container">
    <div v-for="item in customType" :key="item">
      <img v-if="avatar[item]" :class="item" :src="getImgUrl(avatar[item])" />
    </div>
    <v-icon size="xxx-large" style="color: rgb(255, 215, 166)"
      >mdi-account</v-icon
    >
  </div>
</template>

<script lang="ts">
import { PropType, Ref, onMounted, ref } from "vue";
import { CustomAvatar } from "./Type";

interface Props {
  customAvatar: CustomAvatar;
}

export default {
  props: {
    customAvatar: {
      type: Object as PropType<CustomAvatar>, // Define the type
      required: true, // Make the prop optional
    },
  },
  setup(props: Props) {
    const avatar = ref(props.customAvatar);
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

    const getImgUrl = (value: string) => {
      var images = require.context("../assets/", false, /\.png$/);
      return images("./" + value + ".png");
    };

    onMounted(() => {
      getKeyofCustomAvatar();
    });

    return { avatar, customType, getImgUrl };
  },
};
</script>

<style scoped>
.avatar-container {
  position: relative;
  width: fit-content;
}

.hair {
  height: 30px;
  position: absolute;
  left: 9px;
  top: 1px;
  z-index: 3;
}
.hat {
  height: 22px;
  position: absolute;
  left: 16px;
  top: -9px;
  z-index: 4;
}
.back {
  height: 48px;
  position: absolute;
  left: 0px;
  top: 12px;
  z-index: 0;
}
.body {
  height: 25px;
  width: 40px;
  position: absolute;
  left: 4px;
  top: 27px;
  z-index: 2;
}

.eye {
  height: 22px;
  position: absolute;
  left: 16px;
  top: -9px;
  z-index: 4;
}
</style>
