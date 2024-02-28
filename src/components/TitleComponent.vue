<template>
  <div class="title-container">
    <div class="icon-container">
      <v-icon>{{ icon }}</v-icon>
    </div>
    <div class="text-container">
      <div class="message">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, onMounted, ref } from "vue";
import { TitleActionEnum } from "./Type";

interface Props {
  text: string;
  action: TitleActionEnum;
}

export default {
  props: {
    text: {
      type: String,
      default: "Title",
    },
    action: {
      type: String as PropType<TitleActionEnum>,
      default: TitleActionEnum.ANNOUNCE,
    },
  },
  setup(props: Props) {
    const icon = ref("");
    const checkAction = () => {
      switch (props.action) {
        case TitleActionEnum.ANNOUNCE:
          icon.value = "mdi-bullhorn-outline";
          break;
        case TitleActionEnum.BOOKING:
          icon.value = "mdi-book-edit-outline";
          break;
        case TitleActionEnum.MEETINGROOM:
          icon.value = "mdi-door-open";
          break;
        case TitleActionEnum.PROFILE:
          icon.value = "mdi-account";
          break;
        case TitleActionEnum.SERVICE:
          icon.value = "mdi-account-multiple";
          break;
        default:
          break;
      }
    };

    onMounted(() => {
      checkAction();
    });

    return { icon };
  },
};
</script>

<style scoped>
.title-container {
  display: flex;
  width: 100%;
  max-width: 900px;
  margin: 24px auto;
  background: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.icon-container {
  border-radius: 4px 0 0 4px;
  padding: 12px;
  background: #ce1212;
  color: white;
}

.text-container {
  width: 100%;
  border-radius: 0 4px 4px 0px;

  border-bottom: 4px solid #ce1212;
  font-weight: 500;
}

.message {
  padding: 12px;
}
</style>
