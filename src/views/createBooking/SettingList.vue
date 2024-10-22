<template>
  <div class="setting-container">
    <div
      v-for="(item, index) in configContainer"
      :key="index"
      class="setting-item"
      :style="{ borderColor: item.color }"
    >
      <div :style="{ background: item.color }" class="setting-title">
        {{ item.name }}
      </div>
      <!-- @input="toggle" -->

      <div v-for="(value, j) in item.configItem" :key="j">
        <label
          v-if="value.name !== 'เครื่องปรับอากาศ'"
          style="gap: 10px"
          class="d-flex"
        >
          <input
            :disabled="actionStep2 === 'VIEW'"
            type="checkbox"
            class="checkbox"
            :style="{ accentColor: item.color, color: 'white' }"
            v-model="value.selected"
            :label="value.name"
          />
          <div>
            {{ value.name }}
          </div>
        </label>
        <v-text-field
          :disabled="actionStep2 === 'VIEW'"
          :label="value.name"
          density="compact"
          hide-details
          class="h-10"
          outlined
          variant="solo"
          v-else
          v-model="value.value"
        >
        </v-text-field>
        <!-- <label class="label" v-if="value.name !== 'เครื่องปรับอากาศ'">{{
          value.name
        }}</label> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted, ref, watch } from "vue";
import { ConfigContainer } from "@/components/Type";
import { useRoute } from "vue-router";
import axios from "axios";

// eslint-disable-next-line no-undef
const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  actionStep2: {
    type: String as PropType<"ADD" | "EDIT" | "VIEW">,
    default: "ADD",
  },
  reserveRes: {
    type: Object,
    default: null,
  },
});

const loading = ref<boolean>(false);
const actionBooking = ref<string>("");
const reserveId = ref<string>("");
const configRes = ref();
const reserveRes = ref();
const token = ref<string>("");

watch(
  () => props.value,
  () => {
    handleSubmit();
  }
);

const handleSubmit = async () => {
  console.log(107, props.reserveRes);
  let body: { [key: string]: boolean | string } = {
    reserve_id:
      actionBooking.value === "create" ? props.reserveRes.id : reserveId.value,
    ac: false,
  };

  configContainer.value.forEach((item) => {
    item.configItem.forEach((value) => {
      if (!value.value) {
        body[value.field] = value.selected as boolean;
      } else {
        body[value.field] = value.value;
      }
    });
  });

  if (props.actionStep2 === "ADD" || !reserveRes.value) {
    loading.value = true;
    try {
      let res = await axios.post("http://127.0.0.1:8000/api/config", body, {
        headers: {
          Authorization: "Bearer" + " " + token.value,
        },
      });
      configRes.value = res.data.data;
      reserveRes.value = configRes.value;

      loading.value = false;
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  } else {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/config/${
          configRes.value?.id ? configRes.value.id : reserveRes.value.id
        }`,
        body,
        {
          headers: {
            Authorization: "Bearer" + " " + token.value,
          },
        }
      );
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  }
};

const getConfigById = async () => {
  if (props.reserveRes.configs) {
    configContainer.value.forEach((item) => {
      item.configItem.forEach((value) => {
        if (props.reserveRes.configs[value.field]) {
          if (!value.value) {
            value.selected = props.reserveRes.configs[value.field];
          } else {
            value.value = props.reserveRes.configs[value.field];
          }
        }
      });
    });
  }
};

let configContainer = ref<ConfigContainer[]>([
  {
    name: "เครื่องดื่ม / ของว่าง",
    color: "#690505",
    configItem: [
      {
        field: "water",
        name: "น้ำเปล่า",
        selected: false,
      },
      {
        field: "coffee",
        name: "กาแฟ",
        selected: false,
      },
      {
        name: "น้ำผลไม้",
        selected: false,
        field: "juice",
      },
      {
        name: "ของว่าง",
        selected: false,
        field: "apitize",
      },
    ],
  },
  {
    name: "อุปกรณ์ไฟฟ้า",
    color: "#A10303",
    configItem: [
      {
        name: "เครื่องปรับอากาศ",
        field: "temp",
        value: "25",
      },
      {
        name: "จอมอนิเตอร์",
        selected: false,
        field: "monitor",
      },
      {
        name: "ไมค์ / เครื่องเสียง",
        selected: false,
        field: "micro",
      },
      {
        name: "โคมไฟเสริม",
        selected: false,
        field: "add_lightblub",
      },
    ],
  },
  {
    name: "อุปกรณ์อื่นๆ",
    color: "#CE1212",
    configItem: [
      {
        name: "ผ้าเช็ดมือ",
        selected: false,
        field: "towel",
      },
      {
        name: "กระดาษจด / ปากกา",
        selected: false,
        field: "paper",
      },
      {
        name: "กระดานไวท์บอร์ด",
        selected: false,
        field: "white_board",
      },
      {
        name: "โต๊ะเสริม",
        selected: false,
        field: "add_table",
      },
    ],
  },
  {
    name: "ความสะอาด",
    color: "#F18787",
    configItem: [
      {
        name: "น้ำยาระงับกลิ่นอับ",
        selected: false,
        field: "perfume",
      },
      {
        name: "ทำความสะอาดก่อนประชุม",
        selected: false,
        field: "clean_before",
      },
      {
        name: "ทำความสะอาดหลังประชุม",
        selected: false,
        field: "clean_after",
      },
    ],
  },
  {
    name: "ความปลอดภัย",
    color: "#EEBFBF",
    configItem: [
      {
        name: "ตรวจบัตรก่อนเข้า",
        selected: false,
        field: "security",
      },
    ],
  },
]);

onMounted(() => {
  const authen = localStorage.getItem("authen");
  token.value = authen ? JSON.parse(authen).token : "";
  const router = useRoute();
  actionBooking.value = router.params.action as string;
  if (router.params.id) {
    reserveId.value = router.params.id as string;
  }
  if (actionBooking.value === "edit" || actionBooking.value === "view") {
    reserveRes.value = props.reserveRes.configs;
    getConfigById();
  }
});
</script>

<style scoped>
.checkbox {
  width: 20px;
  height: 20px;
}
.setting-container {
  width: 100%;
  gap: 22px;
  display: flex;
  padding-top: 50px;
}
.setting-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background: #f9f9f9;
  border: 1.5px dashed;
  position: relative;
  border-radius: 16px;
  padding: 48px 18px 18px; /* Increased top padding */
  z-index: 1;
}

.setting-title {
  padding: 10px;
  position: absolute;
  left: 50%;
  top: -20px; /* Adjusted to sit on the border */
  transform: translateX(-50%);
  border-radius: 20px;
  color: white;
  z-index: 1000; /* Ensures the title is above the border */
  white-space: nowrap; /* Prevent text wrapping */
}
</style>
