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
            :events="events"
            :event-color="events.color"
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
import api from "@/api";
import axios from "axios";
export default {
  created() {
    const config = {
      headers: { Authorization: `Bearer ${this.$store.getters["auth/token"]}` },
    };
    //console.log(this.$store.getters["auth/token"]);
    axios
      .get(`${api}/drivers/my-schedule`, config)
      .then((res) => {
        console.log(res);
        this.events = res.data.data;

        this.events.forEach((event) => {
          var xdate = new Date(event.selected_date);
          console.log(xdate);
          console.log(xdate.getDate());
          let num = xdate.getMonth() + 1;
          let str = xdate.getFullYear() + "-" + num + "-" + xdate.getDate();
          //console.log(Date.parse());
          console.log(str);
          event.name =
            event.teacher_name + " ~ " + "Destination: " + event.destination;
          event.start = str + " " + event.start_time;
          event.end = str + " " + event.end_time;

          // event.start =
          //   event.selected_date.split("T")[0] + " " + event.start_time;
          // event.end = event.selected_date.split("T")[0] + " " + event.end_time;
          event.color = this.getRandomColor();
          //event.selected_date = requisition.selected_date.split("T")[0];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data: () => ({
    show: false,
    today: "2022-09-16",
    focus: "",

    intervals: {
      first: 7,
      minutes: 60,
      count: 11,
    },
    colors: ["blue", "indigo", "deep-purple", "cyan", "orange", "teal"],
    events: [],
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
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getRandomColor() {
      let target = this.randomIntFromInterval(0, 5);
      return this.colors[target];
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
