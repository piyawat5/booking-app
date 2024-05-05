<template>
  <div class="announce-container pa-sm-6">
    <div class="d-flex justify-space-between flex-wrap gap-12 mb-2">
      <div>{{ subject }}</div>
      <div class="text-grey">ลงประกาศวันที่ {{ formatDate }}</div>
    </div>
    <div class="text-truncate">{{ text }}</div>
    <div class="text-grey d-flex justify-end cursor-pointer">
      <div :onclick="navigate">อ่านต่อ</div>
    </div>
    <div class="d-flex">
      <v-icon>mdi-account</v-icon>
      <div>{{ user }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { onMounted } from "vue";
import { dateFormatter } from "./helpers";

interface Props {
  subject: string;
  text: string;
  date: Date;
  user: string;
}

export default {
  props: {
    subject: {
      type: String,
      default: "Subject",
    },
    text: {
      type: String,
      default:
        "lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, nulla laborum qui esse iure excepturi temporibus ea labore sed natus ducimus quia error ipsum aliquam ut quo, hic consequatur voluptatem?",
    },
    date: {
      type: Date,
      default: new Date(),
    },
    user: {
      type: String,
      default: "piyawat pintusornsri",
    },
  },
  setup(props: Props) {
    const formatDate = dateFormatter(props.date);
    onMounted(() => {});

    const navigate = () => {
      const route = {
        name: "AnnounceView",
        params: {
          id: 1,
        },
      };
      router.push(route);
    };

    return { navigate, formatDate };
  },
};
</script>

<style scoped>
.announce-container {
  border-radius: 4px;
  width: 100%;
  max-width: 900px;
  margin: 24px auto;
  background: white;
  box-shadow: rgba(228, 228, 228, 0.2) 0px 8px 24px;
}

.icon-container {
  padding: 12px;
  background: #ce1212;
  color: white;
}

.text-container {
  width: 100%;
  border-bottom: 3px solid #ce1212;
}

.message {
  padding: 12px;
}

@media (max-width: 600px) {
  .announce-container {
    padding: 12px;
  }
}
</style>
