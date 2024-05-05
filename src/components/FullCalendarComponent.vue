<template>
  <div class="full-calendar">
    <!-- <button @click="toggleWeekends">weekends</button> -->
    <FullCalendar ref="fullCalendar" :options="calendarOptions">
      <template v-slot:eventContent="arg">
        <div style="overflow: hidden; font-size: 10px">
          <b>{{ arg.event?.title }}</b>
          <div>{{ arg.event?.start?.toLocaleString() }}</div>
          <div>{{ arg.event?.end?.toLocaleString() }}</div>
        </div>
      </template>
    </FullCalendar>
    <v-form class="form" v-model="form" @submit.prevent="handleSubmit">
      <v-col cols="6" style="margin: auto">
        <v-text-field
          label="Title *"
          :readonly="loading"
          :counter="35"
          :rules="[
            (v) => !!v || 'Title is required',
            (v) => (v && v.length <= 35) || 'Name must be less than 35 char',
          ]"
          v-model.trim="formBody.title"
        />
        <v-text-field
          label="Start date *"
          :readonly="loading"
          :rules="[(v) => !!v || 'Date is required']"
          :disabled="true"
          v-model.trim="formBody.startDate"
        />
        <v-text-field
          label="End date *"
          :readonly="loading"
          :rules="[(v) => !!v || 'Date is required']"
          :disabled="true"
          v-model.trim="formBody.endDate"
        />
      </v-col>
      <!-- @input="(e: Event)=> {
        const inputEle = e.target as HTMLInputElement
        formBody.date = inputEle.value
       }" -->
      <div class="d-flex justify-center">
        <v-btn :disabled="!form" :loading="loading" type="submit">SENT</v-btn>
      </div>
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
import { onMounted, ref, Ref } from "vue";
import { reactive } from "vue";

export default {
  name: "AboutView",
  components: {
    FullCalendar,
  },
  setup() {
    const getSelectValue: Ref<Partial<DateSpanApi>> = ref({});
    const calendarOptions: Ref<CalendarOptions> = ref({
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      initialView: "timeGridWeek",
      // timeZone: "LOCALE",
      // views: {
      //   timeGridWeek: {
      //     type: "timeGridWeek",
      //     duration: { day: 3 },
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
        // console.log(
        //   getSelectValue.value.start?.toLocaleString() +
        //     "-" +
        //     getSelectValue.value?.end?.toLocaleString()
        // );

        return true;
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
        // const test = prompt("title");
        // if (test) {
        //   alert("post api!!!");
        // } else {
        //   alert("get api");
        // }

        calendarOptions.value.events = (
          calendarOptions.value.events as EventInput[]
        ).filter((item) => item.backgroundColor != "red");

        console.log("select", selectionInfo);
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
      weekends: true,
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
      eventMouseEnter: (info) => {
        console.log("hover", info.event);
      },

      contentHeight: 400,
      expandRows: true,
      buttonText: {
        // timeGridWeek: "สัปดาห์",
        week: "สัปดาห์",
        day: "วัน",
        month: "เดือน",
        today: "วันนี้",
      },
      eventChange: (changeInfo) => {
        console.log("changeEvent", changeInfo.event);
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
      eventResize: function (info) {
        alert(
          info.event.title + " end is now " + info.event?.end?.toISOString()
        );

        if (!confirm("confirm your change")) {
          info.revert();
        }
      },

      events: [
        {
          title: "",
          start: "2024-05-08T10:00:00",
          interactive: true,
          backgroundColor: "red",
          borderColor: "red",
          // end: "2024-03-02",
          // editable: false,

          overlap: false,
          // display: "background",
        },
        {
          title: "โครงการพัฒนา พนักงานครั้งที่22",
          start: "2024-05-02T10:00:00",
          interactive: true,
          backgroundColor: "#818181",
          borderColor: "#818181",
          // end: "2024-03-02",
          editable: false,

          overlap: false,
          // display: "background",
        },
        {
          title: "asdf",
          start: "2024-05-02T16:00:00",
          backgroundColor: "#818181",
          borderColor: "#818181",
          editable: false,
          // end: "2024-02-29",
          overlap: false,
          // display: "background",
        },
      ] as EventInput[],
    });
    const form = ref(false);
    const loading = ref(false);

    const formBody = reactive({
      title: "",
      startDate: "" as any,
      endDate: "" as any,
    });
    const required = (v: any) => {
      return !!v || "Field is required";
    };

    const handleSubmit = () => {
      if (!form.value) return;
      loading.value = true;

      setTimeout(() => {
        alert(
          `จองห้องสำเร็จ ช่วงเวลาการจอง เริ่ม ${formBody.startDate}  จนถึง ${formBody.endDate}`
        );
        loading.value = false;
      }, 1500);
    };

    const toggleWeekends = () => {
      calendarOptions.value.weekends = !calendarOptions.value.weekends;
    };

    onMounted(() => {
      let autoField = (calendarOptions.value.events as EventInput[]).find(
        (item) => item.backgroundColor == "red"
      );

      if (autoField) {
        formBody.startDate = autoField?.start;
        formBody.endDate = autoField?.end;
      }
    });

    // const handleDateClick = (value: DateClickArg) => {
    //   console.log(value);

    //   // alert(`date click ${value.dateStr} ${JSON.stringify(value.view)}`);
    //   // value.dayEl.style.backgroundColor = "red";
    // };

    return {
      calendarOptions,
      toggleWeekends,
      formBody,
      handleSubmit,
      required,
      form,
      loading,
    };
  },
};
</script>

<style scoped>
/* .fc ::before {
  position: absolute;
  left: 11px;
} */
@media screen and (max-width: 767px) {
  .fc-toolbar.fc-header-toolbar {
    font-size: 60%;
  }
}
</style>
