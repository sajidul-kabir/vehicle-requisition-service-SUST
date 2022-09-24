<template>
  <div style="margin-bottom: 20px">
    <driver-nav>
      <template>
        <v-toolbar-title>My Schedule</v-toolbar-title>
      </template>
    </driver-nav>
    <v-row class="fill-height mt-6">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-chevron-left </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-chevron-right </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-sheet>
        <v-sheet class="mx-auto">
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            :events="firstEvents"
            :event-color="firstEvents.color"
            type="4day"
            v-model="focus"
            weekdays="weekday"
            :first-interval="intervals.first"
            :interval-minutes="intervals.minutes"
            :interval-count="intervals.count"
            @click:event="calendarEvent"
          >
            <template v-slot:interval="{ weekday }">
              <div v-if="weekday === 6 || weekday === 5" class="holiday">
                Weekend
              </div>
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import DriverNav from "./DriverNav.vue";

export default {
  data: () => ({
    show: false,
    today: "2022-09-16",
    focus: "",

    intervals: {
      first: 7,
      minutes: 60,
      count: 11,
    },

    firstEvents: [
      {
        name: `Dr. Ahsan Habib ~ Destination: Ambarkhana`,
        start: "2022-09-25 08:00",
        end: "2022-09-25 11:00",
        color: "indigo",
        to: "/transport-home/335",
      },
      {
        name: "Dr. Md Forhad Rabbi ~ Destination: Airport",
        start: "2022-09-25 12:00",
        end: "2022-09-25 15:00",
        color: "deep-purple",
      },
      {
        name: "Raihan Ullah ~ Destination: Shubidbazar",
        start: "2022-09-26 10:00",
        end: "2022-09-26 12:00",
        color: "cyan",
      },
      {
        name: "Asif Mohammad Samir ~ Destination: Airport",
        start: "2022-09-27 13:00",
        end: "2022-09-27 15:00",
        color: "indigo",
      },
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    calendarEvent() {
      this.$router.push("/transport-home/335");
    },
  },
  components: {
    DriverNav,
  },
};
</script>
<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
.container {
  display: flex;
  justify-content: space-around;
}

.holiday {
  background: #eeeeee !important;
  min-height: 50px;
  font-size: 12px;
  text-align: center;
  color: #0000008c;
  padding: 15px;
}
</style>
