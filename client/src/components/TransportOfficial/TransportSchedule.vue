<template>
  <div style="margin-bottom: 20px">
    <transport-nav>
      <template>
        <v-toolbar-title>See Drivers' Schedule</v-toolbar-title>
      </template>
    </transport-nav>

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
        <v-sheet width="1000" class="mx-auto">
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
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TransportNav from "./TransportNav.vue";
export default {
  data: () => ({
    today: "2022-09-10",
    focus: "",

    intervals: {
      first: 7,
      minutes: 60,
      count: 14,
    },

    events: [
      {
        name: `Dr. Ahsan Habib ~ Destination: Ambarkhana`,
        start: "2022-09-10 09:00",
        end: "2022-09-10 10:00",
        color: "red",
      },
      {
        name: "Weekly Meeting",
        start: "2022-09-11 09:00",
        end: "2022-09-11 12:00",
      },
      {
        name: "Meetingxx",
        start: "2022-09-15 09:00",
        end: "2022-09-15 12:00",
      },
      {
        name: "Mash Potatoes",
        start: "2019-01-09 12:30",
        end: "2019-01-09 15:30",
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
  },

  components: {
    TransportNav,
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
</style>

<!-- ref="calendar"
v-model="focus"
color="primary"
type="category"
category-show-all
:categories="categories"
:events="events"
:event-color="getEventColor"
@change="fetchEvents" -->
