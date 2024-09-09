<template>
  <div class="page-container">
    <TitleComponent
      :action="TitleActionEnum.MEETINGROOM"
      text="ห้องที่มีการจองทั้งหมด"
    ></TitleComponent>
    <FilterBookingComponent>
      <div style="font-size: 16px" class="mb-4">
        <v-icon>{{ "mdi-magnify" }}</v-icon
        >ค้นหารายการ
      </div>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="filter.title"
            label="หัวข้อการประชุม"
            density="compact"
            outlined
            variant="solo"
            hide-details
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-autocomplete
            v-model="filter.room"
            label="หมายเลขห้อง"
            density="compact"
            outlined
            variant="solo"
            hide-details
            :items="roomOptions"
            clearable
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-autocomplete
            v-model="filter.roomMember"
            label="ชื่อสมาชิกในห้อง"
            density="compact"
            outlined
            variant="solo"
            hide-details
            :items="userOptions"
            clearable
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="filter.ref"
            label="หมายเลขอ้างอิง"
            density="compact"
            variant="solo"
            hide-details
            outlined
            clearable
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-date-input
            v-model="filter.startDate"
            label="วันที่"
            density="compact"
            variant="solo"
            hide-details
            outlined
            clearable
            @click:clear="filter.startDate = null as any"
          ></v-date-input>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-menu
            v-model:show="isStartTime"
            :close-on-content-click="false"
            activator="parent"
            transition="scale-transition"
          >
            <v-time-picker
              v-model="filter.startTime"
              full-width
              format="24hr"
            ></v-time-picker>
          </v-menu>

          <v-text-field
            ref="startTime"
            v-model="filter.startTime"
            :prepend-icon="'mdi-clock-time-four-outline'"
            label="เวลาเริ่ม"
            density="compact"
            variant="solo"
            hide-details
            outlined
            clearable
            @click="toggleMenu('START_TIME')"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-menu
            v-model:show="isEndTime"
            :close-on-content-click="false"
            activator="parent"
            transition="scale-transition"
          >
            <v-time-picker
              v-model="filter.endTime"
              full-width
              format="24hr"
            ></v-time-picker>
          </v-menu>

          <v-text-field
            ref="endTime"
            v-model="filter.endTime"
            :prepend-icon="'mdi-clock-time-four-outline'"
            label="เวลาจบ"
            density="compact"
            variant="solo"
            hide-details
            outlined
            clearable
            @click="toggleMenu('END_TIME')"
          />
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-autocomplete
            v-model="filter.status"
            label="สถานะ"
            density="compact"
            variant="solo"
            hide-details
            outlined
            :items="statusOptions"
            clearable
          ></v-autocomplete>
        </v-col>
      </v-row>
      <div style="display: flex; justify-content: right; gap: 8px" class="mt-5">
        <v-btn
          @click="clear"
          size="small"
          depressed
          color="#ce1212"
          variant="plain"
        >
          Clear
        </v-btn>
        <v-btn
          @click="search"
          size="small"
          depressed
          color="#ce1212"
          variant="tonal"
        >
          Search
        </v-btn>
      </div>
    </FilterBookingComponent>
    <div
      style="
        display: flex;
        justify-content: space-between;
        align-items: end;
        border-bottom: 1px solid #d7d7d7;
        margin-top: 25px;
        text-align: center;
      "
    >
      <div>
        <InfoTable
          :all-page="Math.ceil(count / size)"
          :current-page="page"
          :count="count"
          @show="showDetail"
        ></InfoTable>
        <CategorySelect
          :all-room="allRoom"
          :small-room="smallRoom"
          :medium-room="mediumRoom"
          :auditorium="auditorium"
          @select="selectCateogry"
        ></CategorySelect>
      </div>
      <div>
        <v-btn class="mb-2" depressed color="#ce1212"> จองห้องทันที </v-btn>
      </div>
    </div>
    <div style="margin: 8px 0px">
      <v-data-table
        :headers="headers"
        :items="reserveList"
        :loading="loading"
        hide-default-footer
      >
        <template v-slot:loading>
          <v-skeleton-loader type="table-row@7"></v-skeleton-loader>
        </template>
        <template v-slot:[`item.room_members`]="{ item }">
          <div v-if="room_members(item).length > 0">
            <div v-for="(member, index) in room_members(item)" :key="index">
              {{ member.users.first_name }}
            </div>
          </div>
          <div v-else>-</div>
        </template>
        <template v-slot:[`item.actions`]="{}">
          <v-speed-dial location="right center" transition="fade-transition">
            <template v-slot:activator="{ props: activatorProps }">
              <v-fab
                class="mr-8"
                variant="flat"
                rounded
                v-bind="activatorProps"
                size="small"
              >
                <v-icon size="large" style="color: #ce1212"
                  >mdi-view-grid-outline</v-icon
                >
                <!-- <v-icon style="color: #ce1212">mdi-view-grid </v-icon> -->
              </v-fab>
            </template>
            <v-btn
              size="large"
              style="color: #7a0000"
              key="3"
              icon="mdi-tag-check"
            ></v-btn>
            <v-btn
              size="large"
              style="color: #7a0000"
              key="2"
              icon="mdi-eye-circle"
            ></v-btn>
            <v-btn
              size="large"
              style="color: #7a0000"
              key="1"
              icon="mdi-pencil-box"
            ></v-btn>
            <v-btn
              size="large"
              :disabled="true"
              style="color: #7a0000"
              key="4"
              icon="mdi-delete"
            ></v-btn>
          </v-speed-dial>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            style="font-size: 12px"
            :color="checkStatusColor((item as any)?.status)"
          >
            {{ checkStatus(item) }}
          </v-chip>
        </template>
      </v-data-table>
      <PaginatorCoumponent
        @pageChange="page = $event"
        @changeSize="size = $event"
        :page="page"
        :count="count"
      ></PaginatorCoumponent>
    </div>
  </div>
</template>

<script setup lang="ts">
import TitleComponent from "@/components/TitleComponent.vue";
import FilterBookingComponent from "@/components/FilterBookingComponent.vue";
import InfoTable from "@/components/InfoTable.vue";
import CategorySelect from "@/components/CategorySelect.vue";
import { onBeforeMount, watch } from "vue";
import { ref, nextTick } from "vue";
import axios from "axios";
import { FilterSection, TitleActionEnum } from "@/components/Type";
import { VDateInput } from "vuetify/labs/VDateInput";
import { VTimePicker } from "vuetify/labs/VTimePicker";
import PaginatorCoumponent from "@/components/PaginatorComponent.vue";

// @ is an alias to /src

//listing
const count = ref<number>(0);
const size = ref<number>(15);
const page = ref<number>(1);
const headers = ref([
  {
    key: "order",
    sortable: false,
    title: "#",
  },
  { key: "actions", title: "Actions" },
  { key: "title", title: "หัวข้อการประชุม" },
  { key: "room.room_name", title: "หมายเลขห้อง" },
  { key: "status", title: "สถานะ" },
  { key: "start_date", title: "วันที่" },
  { key: "start_time", title: "เวลาเริ่ม" },
  { key: "end_time", title: "เวลาจบ" },
  { key: "room_members", title: "สมาชิกในห้อง" },
]);
const reserveList = ref([]);

//filter & dropdown
const filter = ref<FilterSection>({});
const startTime = ref<HTMLInputElement | null>(null);
const isStartTime = ref(false);
const endTime = ref<HTMLInputElement | null>(null);
const isEndTime = ref(false);
const roomOptions = ref<{ title: string; value: number }[]>([]);
const statusOptions = ref<{ title: string; value: string }[]>([]);
const userOptions = ref<{ title: string; value: number }[]>([]);
const allRoom = ref(0);
const smallRoom = ref(0);
const mediumRoom = ref(0);
const auditorium = ref(0);

//others
const isShow = ref(false);
const loading = ref(false);

watch([page, size], () => {
  getData();
});

const room_members = (value: any) => {
  return value.room_members;
};

const showDetail = (value: any) => {
  isShow.value = value;
};

const selectCateogry = async (value?: number) => {
  filter.value.category = value;
  page.value === 1 ? await getData() : (page.value = 1);
};

const toggleMenu = async (actions: "START_TIME" | "END_TIME") => {
  if (actions === "START_TIME") {
    isStartTime.value = !isStartTime.value;
    await nextTick(() => {
      if (startTime.value) {
        (startTime.value as HTMLInputElement).focus();
      }
    });
  } else {
    isEndTime.value = !isEndTime.value;
    await nextTick(() => {
      if (endTime.value) {
        (endTime.value as HTMLInputElement).focus();
      }
    });
  }
};

const search = async () => {
  page.value === 1 ? await getData() : (page.value = 1);
};

const clear = async () => {
  filter.value = {};
  page.value === 1 ? await getData() : (page.value = 1);
};

const checkStatusColor = (item: string): string => {
  switch (item) {
    case "0":
      return "#0013c2";
    case "1":
      return "#ffa600";
    case "2":
      return "#00a216";
    case "3":
      return "#ff0000";

    default:
      return "";
  }
};

const getData = async () => {
  loading.value = true;
  const formattedStartDate = filter.value.startDate
    ?.toLocaleDateString("en-CA")
    .split("T")[0];
  let query = [
    filter.value.title && `&title=${filter.value.title}`,
    filter.value.category && `&categoryId=${filter.value.category}`,
    filter.value.startDate && `&startDate=${formattedStartDate}`,
    filter.value.startDate && `&endDate=${formattedStartDate}`,
    filter.value.startTime && `&timeStart=${filter.value.startTime}:00`,
    filter.value.endTime && `&timeEnd=${filter.value.endTime}:00`,
    filter.value.ref && `&reserveId=${filter.value.ref}`,
    filter.value.room && `&room=${filter.value.room}`,
    filter.value.roomMember && `&roomMembersId=${filter.value.roomMember}`,
    filter.value.status && `&status=${filter.value.status}`,
  ];
  let newQuery = query.filter(Boolean).join("");
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/reserve?page=${page.value}&size=${size.value}` +
        "&userId=1" +
        newQuery,
      {
        headers: {
          Authorization:
            "Bearer 7|aYOXrFYD0sIqK3OtcJYWcKLEiJ3qSlcoDk4PBUp8f02f4c68",
        },
      }
    );
    let data = await response.data;
    count.value = data.count;
    allRoom.value = data.allRoom;
    smallRoom.value = data.smallRoom;
    mediumRoom.value = data.mediumRoom;
    auditorium.value = data.auditorium;
    reserveList.value = data.reserve.map((item: any, i: number) => ({
      ...item,
      order: i + 1,
    }));
    loading.value = false;
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};

const getRooms = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/room", {
      headers: {
        Authorization:
          "Bearer 7|aYOXrFYD0sIqK3OtcJYWcKLEiJ3qSlcoDk4PBUp8f02f4c68",
      },
    });
    let json = await response.data;
    roomOptions.value = json.data.map((item: any) => ({
      title: item.room_name,
      value: item.id,
    }));
  } catch (error) {
    console.log(error);
  }
};

const checkStatus = (item: any) => {
  switch (item.status) {
    case "0":
      return "สร้าง";
    case "1":
      return "ส่งขออนุมัติ";
    case "2":
      return "อนุมัติ";
    case "3":
      return "ไม่อนุมัติ";
    default:
      return "สร้าง";
  }
};

const getStatus = async () => {
  const res: { title: string; value: string }[] = await new Promise(
    (resolve) => {
      resolve([
        { title: "สร้าง", value: "0" },
        { title: "ส่งขออนุมัติ", value: "1" },
        { title: "อนุมัติ", value: "2" },
        { title: "ไม่อนุมัติ", value: "3" },
      ]);
    }
  );
  statusOptions.value = res;
};

const getUsers = async () => {
  try {
    let response = await axios.get("http://127.0.0.1:8000/api/user", {
      headers: {
        Authorization:
          "Bearer 7|aYOXrFYD0sIqK3OtcJYWcKLEiJ3qSlcoDk4PBUp8f02f4c68",
      },
    });
    let json = await response.data;
    userOptions.value = json.data.map((item: any) => ({
      title: item.first_name + " " + item.last_name,
      value: item.id,
    }));
  } catch (error) {
    console.log(error);
  }
};

onBeforeMount(() => {
  window.scrollTo(0, 0);
  getData();
  getRooms();
  getStatus();
  getUsers();
});
</script>

<style scoped>
.page-container {
  font-size: 14px;
  width: 95%;
  margin: 100px auto;
  padding: 2px 24px 24px 24px;
  background: white;
  border-radius: 8px;
}
</style>
