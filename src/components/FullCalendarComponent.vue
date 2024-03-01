<template>
  <div class="full-calendar">
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
          label="Date *"
          :readonly="loading"
          :rules="[(v) => !!v || 'Date is required']"
          v-model.trim="formBody.date"
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
    <button @click="toggleWeekends">weekends</button>
    <FullCalendar ref="fullCalendar" :options="calendarOptions">
      <template v-slot:eventContent="arg">
        <div style="overflow: hidden; font-size: 10px">
          <b>{{ arg.event?.title }}</b>
          <div>{{ arg.event?.start?.toLocaleString() }}</div>
          <div>{{ arg.event?.end?.toLocaleString() }}</div>
        </div>
      </template>
    </FullCalendar>
  </div>
</template>

<script lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { CalendarOptions, DateSpanApi, EventInput } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ref, Ref } from "vue";
import { reactive } from "vue";

export default {
  name: "AboutView",
  components: {
    FullCalendar,
  },
  setup() {
    const calendarOptions: Ref<CalendarOptions> = ref({
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      initialView: "timeGridWeek",
      // timeZone: "LOCALE",
      views: {
        timeGridFourDay: {
          type: "timeGrid",
          duration: { day: 4 },
        },
      },
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
      unselectAuto: true,
      unselectCancel: "form",
      selectMirror: true,
      selectOverlap: () => {
        return false;
      },

      selectAllow: (selectInfo: DateSpanApi) => {
        console.log(selectInfo.start);

        return false;
      },

      hiddenDays: [0, 1],
      weekends: true,
      dateClick: (value) => {
        handleDateClick(value);
      },
      eventOverlap: false,
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      },

      contentHeight: "auto",
      expandRows: true,
      buttonText: {
        week: "สัปดาห์",
        day: "วัน",
        month: "เดือน",
        today: "วันนี้",
      },
      events: [
        {
          title: "โครงการพัฒนา พนักงานครั้งที่22",
          start: "2024-02-27T10:00:00",
          // end: "2024-03-02",
          overlap: false,
          // display: "background",
        },
        {
          title: "asdf",
          start: "2024-02-27T16:00:00",
          // end: "2024-02-29",
          overlap: true,
          // display: "background",
        },
      ] as EventInput[],
    });
    const form = ref(false);
    const loading = ref(false);

    const formBody = reactive({
      title: "",
      date: "" as any,
    });
    const required = (v: any) => {
      return !!v || "Field is required";
    };

    const handleSubmit = () => {
      if (!form.value) return;
      loading.value = true;

      setTimeout(() => {
        calendarOptions.value = {
          ...calendarOptions.value,
          events: [
            ...(calendarOptions.value?.events as EventInput[]),
            { ...formBody },
          ],
        };
        loading.value = false;
      }, 1500);
    };

    const toggleWeekends = () => {
      calendarOptions.value.weekends = !calendarOptions.value.weekends;
    };

    const handleDateClick = (value: DateClickArg) => {
      alert(`date click ${value.dateStr}`);
    };

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
</style>
