<template>
  <div style="margin-bottom: 20px">
    <driver-nav>
      <template>
        <v-toolbar-title>Update Schedule</v-toolbar-title>
      </template>
    </driver-nav>

    <v-row>
      <v-col cols="12" sm="6" md="6" class="ml-6 mt-4">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="unavailableDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="unavailableDate"
              label="Select Unavailable Date"
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="unavailableDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(unavailableDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row class="fill-height">
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
            :events="events"
            :color="events.color"
            type="4day"
            v-model="focus"
            :first-interval="intervals.first"
            :interval-minutes="intervals.minutes"
            :interval-count="intervals.count"
            @click:event="calendarEvent"
          >
            <template v-slot:interval="{ weekday, day, month, year }">
              <div v-if="weekday === 6 || weekday === 5" class="holiday">
                Weekend
              </div>
              <div v-if="unavailableDate">
                <div
                  v-if="
                    day === unavailableDay &&
                    month === unavailableMonth &&
                    year === unavailableYear
                  "
                  class="holiday"
                >
                  Unavailable
                </div>
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
    today: "2022-09-17",
    focus: "",
    unavailableDate: "",
    unavailableDay: "",
    unavailableMonth: "",
    unavailableYear: "",
    submitted: false,
    menu: false,

    intervals: {
      first: 7,
      minutes: 60,
      count: 11,
    },

    events: [
      {
        name: `Dr. Ahsan Habib ~ Destination: Ambarkhana`,
        start: "2022-09-18 08:00",
        end: "2022-09-18 11:00",
        color: "indigo",
        to: "/transport-home/335",
      },
      {
        name: "Dr. Md Forhad Rabbi ~ Destination: Airport",
        start: "2022-09-18 12:00",
        end: "2022-09-18 15:00",
        color: "deep-purple",
      },
      {
        name: "Raihan Ullah ~ Destination: Shubidbazar",
        start: "2022-09-19 10:00",
        end: "2022-09-19 12:00",
        color: "cyan",
      },
      {
        name: "Asif Mohammad Samir ~ Destination: Airport",
        start: "2022-09-20 13:00",
        end: "2022-09-20 15:00",
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
  watch: {
    unavailableDate(value) {
      let date = new Date(value);
      this.unavailableDay = date.getDate();
      this.unavailableMonth = date.getMonth() + 1;
      this.unavailableYear = date.getFullYear();
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
