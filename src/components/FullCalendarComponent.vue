<template>
  <div class="full-calendar">
    <!-- <button @click="toggleWeekends">weekends</button> -->
    <FullCalendar
      class="calendar"
      ref="fullCalendar"
      :options="calendarOptions"
    >
      <template v-slot:eventContent="arg">
        <div style="overflow: hidden; font-size: 10px">
          <b>{{ arg.event?.title }}</b>
          <div>{{ arg.event?.start?.toLocaleString() }}</div>
          <div>{{ arg.event?.end?.toLocaleString() }}</div>
        </div>
      </template>
    </FullCalendar>
    <v-form
      class="form"
      style="padding: 20px"
      v-model="form"
      @submit.prevent="handleSubmit"
    >
      <div style="flex: 1; display: flex; flex-direction: column; gap: 12px">
        <div class="d-flex" style="gap: 8px">
          <v-text-field
            label="เวลาเริ่ม *"
            :rules="[(v) => !!v || 'Date is required']"
            density="compact"
            variant="solo"
            hide-details
            outlined
            readonly
            v-model.trim="formBody.startDate"
          />
          <v-text-field
            label="เวลาจบ *"
            :rules="[(v) => !!v || 'Date is required']"
            density="compact"
            variant="solo"
            readonly
            hide-details
            outlined
            v-model.trim="formBody.endDate"
          />
        </div>
        <div class="d-flex" style="gap: 8px">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                :loading="loading"
                :disabled="!formBody.startDate && !formBody.endDate"
                color="#ce1212"
                style="flex: 1"
                v-bind="props"
              >
                ค้นหาห้องอัตโนมัติ
              </v-btn>
            </template>
            <v-list v-if="categoryOptions.length > 0">
              <v-list-item
                v-for="(item, index) in categoryOptions"
                :key="index"
                :value="index"
                @click="findRoomAuto((item as any).id)"
              >
                <v-list-item-title v-if="item">{{
                  (item as any)?.description
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- <v-btn @click="autoFindRoom" style="flex: 1" color="#ce1212">ค้นหาห้องอัตโนมัติ</v-btn> -->
          <v-btn :disabled="true" style="flex: 1">เลือกห้องเอง</v-btn>
        </div>
        <div>
          <v-text-field
            label="ห้อง *"
            density="compact"
            hide-details
            outlined
            readonly
            variant="solo"
            v-model="selectedRoom.room_name"
          />
        </div>
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; gap: 10px">
        <div>
          <v-text-field
            label="หัวข้อการประชุม *"
            :readonly="loading"
            density="compact"
            hide-details
            outlined
            variant="solo"
            :counter="35"
            :rules="[
              (v) => !!v || 'Title is required',
              (v) => (v && v.length <= 35) || 'Name must be less than 35 char',
            ]"
            v-model.trim="formBody.title"
          />
        </div>
        <div>
          <v-text-field
            label="รายละเอียดการประชุม "
            :readonly="loading"
            density="compact"
            hide-details
            class="h-10"
            outlined
            variant="solo"
            :counter="35"
            :rules="[
              (v) => v.length <= 255 || 'Name must be less than 35 char',
            ]"
            v-model.trim="formBody.description"
          />
        </div>
        <div>
          <v-text-field
            label="สิ่งที่ต้องเตรียมมา "
            :readonly="loading"
            density="compact"
            hide-details
            outlined
            variant="solo"
            :counter="35"
            :rules="[
              (v) => v.length <= 255 || 'Name must be less than 35 char',
            ]"
            v-model.trim="formBody.required"
          />
        </div>
      </div>

      <!-- <div>
          *หมายเหตุ เมื่อทำการบันทึกแล้ว จะไม่สามารถแก้ไข วันและเวลาในการจองได้
        </div>  -->
    </v-form>
  </div>
</template>

<script lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  CalendarOptions,
  DateSelectArg,
  DateSpanApi,
  // DateUnselectArg,
  EventInput,
} from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import { onMounted, PropType, ref, Ref, watch } from "vue";
import { reactive } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

interface Props {
  value: boolean;
  actionStep1: "ADD" | "EDIT" | "VIEW";
}

export default {
  name: "AboutView",
  components: {
    FullCalendar,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    actionStep1: {
      type: String as PropType<"ADD" | "EDIT" | "VIEW">,
      default: "ADD",
    },
  },
  setup(props: Props, { emit }: any) {
    const reserveRes = ref<any>(null);
    const selectedRoom = ref<any>("");
    const categoryOptions = ref([]);
    const getSelectValue: Ref<Partial<DateSpanApi>> = ref({});
    const token = ref<string>("");
    watch(
      () => props.value,
      () => {
        handleSubmit();
      }
    );
    const calendarOptions: Ref<CalendarOptions> = ref({
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      initialView: "timeGridWeek",
      // timeZone: "LOCALE",
      // views: {
      //   timeGridWeek: {
      //     type: "timeGridWeek",
      //     duration: { day: 5 },
      //   },
      // },
      slotDuration: "00:30",
      slotMinTime: "8:00",
      slotMaxTime: "20:00",
      validRange: () => {
        return {
          // start: nowDate,
          // end: ''
        };
      },
      navLinks: true,
      // navLinkDayClick: function (date, jsEvent) {
      //   console.log("navigate to ...", date.toISOString());
      //   console.log("coords", jsEvent);
      // },
      weekNumbers: true,
      selectable: true,
      unselectAuto: false,
      unselectCancel: "form",
      selectMirror: true,
      selectOverlap: () => {
        return false;
      },
      selectAllow: (selectInfo: DateSpanApi) => {
        getSelectValue.value = {
          start: selectInfo.start,
          end: selectInfo.end,
        };

        if (selectInfo.start < new Date()) {
          return false;
        }
        return props.actionStep1 === "VIEW" ? false : true;
      },
      select: (selectionInfo: DateSelectArg) => {
        // calendarOptions.value = {
        //   ...calendarOptions.value,
        //   events: [
        //     ...(calendarOptions.value?.events as EventInput[]),
        //     {
        //       start: selectionInfo.start?.toISOString(),
        //       end: selectionInfo?.end?.toISOString(),
        //       backgroundColor: "#CE1212",
        //       borderColor: "#CE1212",
        //     },
        //   ],
        // };
        // console.log(calendarOptions.value);
        calendarOptions.value.events = (
          calendarOptions.value.events as EventInput[]
        ).filter((item) => item.backgroundColor !== "#ce1212");
        formBody.startDate = selectionInfo.startStr;
        formBody.endDate = selectionInfo.endStr;
      },
      // unselect: (jsEvent?: DateUnselectArg) => {
      //   // doesn’t happen when unselectAuto is false
      //   console.log("unselect", `${jsEvent} `);
      // },
      nowIndicator: true,
      // now: () => {
      //   return "2024-02-27T13:00:00";
      // },
      editable: true,
      // hiddenDays: [0, 1],
      weekends: false,
      // dateClick: (value) => {
      //   //click space (not event exist)
      //   // handleDateClick(value);
      // },
      eventOverlap: false,
      headerToolbar: {
        left: "prev,next today",
        right: "title",
      },
      footerToolbar: {
        right: "timeGridWeek,timeGridDay",
      },
      // ใช้สำหรับ hover
      // eventMouseEnter: (info) => {
      //   console.log("hover", info.event);
      // },
      contentHeight: 450,
      expandRows: true,
      buttonText: {
        // timeGridWeek: "สัปดาห์",
        week: "สัปดาห์",
        day: "วัน",
        month: "เดือน",
        today: "วันนี้",
      },
      //use for admin level
      // eventClick: (clickInfo) => {
      //   //click event exist
      //   if (
      //     confirm(
      //       `Are you sure you want to delete the event '${clickInfo.event.title}'`
      //     )
      //   ) {
      //     clickInfo.event.remove();
      //   }
      // },
      // สำหรับเมื่อมีการ drag and drop
      eventChange: (changeInfo) => {
        // console.log("changeEvent", changeInfo.event);

        formBody.startDate = changeInfo.event?.startStr;
        formBody.endDate = changeInfo.event?.endStr;
      },
      // สำหรับเมื่อมีการ เปลี่ยนขนาด
      eventResize: function (info) {
        if (!confirm("confirm your change")) {
          info.revert();
        } else {
          formBody.startDate = info.event?.startStr;
          formBody.endDate = info.event?.endStr;
        }
      },
      events: [] as EventInput[],
    });
    const form = ref(false);
    const loading = ref(false);
    const formBody = reactive({
      title: "",
      description: "",
      required: "",
      startDate: "" as any,
      endDate: "" as any,
    });
    const actionBooking = ref<string>("");
    const reserveId = ref<string>("");

    const required = (v: any) => {
      return !!v || "Field is required";
    };

    const handleSubmit = async () => {
      if (!form.value) return;

      let startPeriod = formBody.startDate;
      let endPeriod = formBody.endDate;
      let startDate = startPeriod?.split("T")[0];
      let endDate = endPeriod?.split("T")[0];
      let startTime = startPeriod
        ?.split("T")[1]
        ?.split("+")[0]
        ?.split(":")
        .slice(0, 2)
        .join(":");
      let endTime = endPeriod
        ?.split("T")[1]
        ?.split("+")[0]
        ?.split(":")
        .slice(0, 2)
        .join(":");

      let body = {
        room_id: selectedRoom.value?.id,
        reserver: 1,
        title: formBody.title,
        description: formBody.description,
        start_date: startDate,
        end_date: endDate,
        start_time: startTime,
        end_time: endTime,
        prepare: formBody.required,
      };

      if (props.actionStep1 === "ADD") {
        loading.value = true;
        try {
          let res = await axios.post(
            "http://127.0.0.1:8000/api/reserve",
            body,
            {
              headers: {
                Authorization: "Bearer" + " " + token.value,
              },
            }
          );
          reserveRes.value = res.data.reserve;
          emit("getReserve", reserveRes.value);
          loading.value = false;
        } catch (error) {
          console.log(error);
          loading.value = false;
        }
      } else {
        try {
          await axios.put(
            `http://127.0.0.1:8000/api/reserve/${reserveRes.value.id}`,
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

    const toggleWeekends = () => {
      calendarOptions.value.weekends = !calendarOptions.value.weekends;
    };

    const getCategory = async () => {
      //TODO: get category
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/category", {
          headers: {
            Authorization: "Bearer" + " " + token.value,
          },
        });

        let json = await response.data;
        categoryOptions.value = json.data;
      } catch (error) {
        console.log(error);
      }
    };

    const findRoomAuto = async (id: number) => {
      loading.value = true;
      const category = id;
      let startPeriod = formBody.startDate;
      let endPeriod = formBody.endDate;
      let startDate = startPeriod?.split("T")[0];
      let endDate = endPeriod?.split("T")[0];
      let startTime = startPeriod?.split("T")[1]?.split("+")[0];
      let endTime = endPeriod?.split("T")[1]?.split("+")[0];
      let query = [
        id ? `categoryId=${category}` : "",
        startPeriod ? `startDate=${startDate}` : "",
        startPeriod ? `startTime=${startTime}` : "",
        endPeriod ? `endDate=${endDate}` : "",
        endPeriod ? `endTime=${endTime}` : "",
      ]
        .filter((item) => item)
        .join("&");
      try {
        calendarOptions.value.events = [];

        let response = await axios.get(
          "http://127.0.0.1:8000/api/findRoomAuto?" + query,
          {
            headers: {
              Authorization: "Bearer" + " " + token.value,
            },
          }
        );

        let json = await response.data;
        selectedRoom.value = json.data;

        // let events = [
        //   {
        //     title: "",
        //     start: "2024-09-16T10:00:00",
        //     interactive: true,
        //     backgroundColor: "red",
        //     borderColor: "red",
        //     // end: "2024-03-02",
        //     // editable: false,

        //     overlap: false,
        //     // display: "background",
        //   },
        //   {
        //     title: "โครงการพัฒนา พนักงานครั้งที่22",
        //     start: "2024-09-16T12:00:00",
        //     interactive: true,
        //     backgroundColor: "#818181",
        //     borderColor: "#818181",
        //     // end: "2024-03-02",
        //     editable: false,

        //     overlap: false,
        //     // display: "background",
        //   },
        //   {
        //     title: "asdf",
        //     start: "2024-09-16T16:00:00",
        //     backgroundColor: "#818181",
        //     borderColor: "#818181",
        //     editable: false,
        //     // end: "2024-02-29",
        //     overlap: false,
        //     // display: "background",
        //   },
        // ] as EventInput[];

        let addEvents = selectedRoom.value.reserves.map((item: any) => ({
          title: item.title,
          start: `${item.start_date}T${item.start_time}`,
          end: `${item.end_date}T${item.end_time}`,
          backgroundColor: "#818181",
          borderColor: "#818181",
          editable: false,
          overlap: false,
        }));

        (calendarOptions.value.events as EventInput[])?.push(...addEvents);

        loading.value = false;
      } catch (error) {
        console.log(error);
        loading.value = false;
      }
    };

    const getReserveById = async () => {
      try {
        let reserveIdRes = await axios.get(
          `http://127.0.0.1:8000/api/reserve/${reserveId.value}`,
          {
            headers: {
              Authorization: "Bearer" + " " + token.value,
            },
          }
        );
        let data = await reserveIdRes.data.data;
        reserveRes.value = data;
        formBody.startDate = `${data.start_date}T${data.start_time}`;
        formBody.endDate = `${data.end_date}T${data.end_time}`;
        formBody.title = data.title;
        formBody.description = data.description ? data.description : "";
        formBody.required = data.prepare ? data.prepare : "";
        let roomId = data.room_id;

        let roomRes = await axios.get(
          `http://127.0.0.1:8000/api/room/${roomId}`,
          {
            headers: {
              Authorization: "Bearer" + " " + token.value,
            },
          }
        );
        let dataRoom = await roomRes.data;
        selectedRoom.value = dataRoom.data;

        emit("getReserve", reserveRes.value);

        let addEvents = selectedRoom.value.reserves.map((item: any) => {
          if (item.id === data.id) {
            return {
              // title: '',
              start: `${item.start_date}T${item.start_time}`,
              end: `${item.end_date}T${item.end_time}`,
              interactive: true,
              editable: props.actionStep1 === "VIEW" ? false : true,
              backgroundColor: "#ce1212",
              borderColor: "#ce1212",
              overlap: false,
            };
          } else {
            return {
              title: item.title,
              start: `${item.start_date}T${item.start_time}`,
              end: `${item.end_date}T${item.end_time}`,
              backgroundColor: "#818181",
              borderColor: "#818181",
              editable: false,
              overlap: false,
            };
          }
        });

        (calendarOptions.value.events as EventInput[])?.push(...addEvents);
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      const authen = localStorage.getItem("authen");
      token.value = authen ? JSON.parse(authen).token : "";
      setTimeout(() => {
        const weekButton = document.querySelector(
          ".fc-timeGridWeek-button"
        ) as HTMLElement;
        if (weekButton) {
          weekButton.click();
        }
      }, 1);
      const router = useRoute();
      actionBooking.value = router.params.action as string;
      if (router.params.id) {
        reserveId.value = router.params.id as string;
      }
      if (actionBooking.value === "edit" || actionBooking.value === "view") {
        getReserveById();
      }
      getCategory();
    });

    // const handleDateClick = (value: DateClickArg) => {
    //   console.log(value);
    //   // alert(`date click ${value.dateStr} ${JSON.stringify(value.view)}`);
    //   // value.dayEl.style.backgroundColor = "red";
    // };

    return {
      findRoomAuto,
      categoryOptions,
      calendarOptions,
      toggleWeekends,
      formBody,
      handleSubmit,
      required,
      form,
      loading,
      selectedRoom,
    };
  },
};
</script>

<style scoped>
/* .full-calendar {
  display: flex;
  flex-direction: row;
  gap: 20px;
} */
/* .calendar {
  flex: 1;
} */
.form {
  display: flex;
  gap: 12px;
  flex-direction: row;
  margin-top: 24px;
  background-color: #f8f7f7;
  border-radius: 12px;
}
@media screen and (max-width: 767px) {
  .fc-toolbar.fc-header-toolbar {
    font-size: 60%;
  }
}
</style>
