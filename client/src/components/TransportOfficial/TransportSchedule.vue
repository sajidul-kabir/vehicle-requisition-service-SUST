<template>
  <div style="margin-bottom: 20px">
    <transport-nav>
      <template>
        <v-toolbar-title>See Drivers' Schedule</v-toolbar-title>
      </template>
    </transport-nav>

    <div class="mt-12 mb-12 container">
      <p v-if="selectedDriver" class="text-h5 text--primary">
        Driver {{ selectedDriver }}'s work Schedule is being shown
      </p>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            color="indigo"
            v-bind="attrs"
            v-on="on"
            class="assign"
          >
            Choose Driver
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(driver, index) in drivers"
            :key="index"
            link
            @click="select(driver.title)"
          >
            <v-list-item-title>{{ driver.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
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
            v-if="selectedDriver === 'Monir Hossain'"
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
          <v-calendar
            v-else
            ref="calendar"
            :now="today"
            :value="today"
            :events="secondEvents"
            :color="secondEvents.color"
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
    today: "2022-09-16",
    focus: "",

    intervals: {
      first: 7,
      minutes: 60,
      count: 11,
    },
    weekday: [3, 4, 5, 6, 0],

    firstEvents: [
      {
        name: `Dr. Ahsan Habib ~ Destination: Ambarkhana`,
        start: "2022-09-11 08:00",
        end: "2022-09-11 11:00",
        color: "indigo",
        to: "/transport-home/335",
      },
      {
        name: "Dr. Md Forhad Rabbi ~ Destination: Airport",
        start: "2022-09-11 12:00",
        end: "2022-09-11 15:00",
        color: "deep-purple",
      },
      {
        name: "Raihan Ullah ~ Destination: Shubidbazar",
        start: "2022-09-12 10:00",
        end: "2022-09-12 12:00",
        color: "cyan",
      },
      {
        name: "Asif Mohammad Samir ~ Destination: Airport",
        start: "2022-09-13 13:00",
        end: "2022-09-13 15:00",
        color: "indigo",
      },
    ],

    secondEvents: [
      {
        name: `Parthapratim Paul ~ Destination: Ambarkhana`,
        start: "2022-09-11 09:00",
        end: "2022-09-11 11:00",
        color: "orange",
      },

      {
        name: "Raihan Ullah ~ Destination: Shubidbazar",
        start: "2022-09-12 10:00",
        end: "2022-09-12 12:00",
        color: "cyan",
      },
      {
        name: "Asif Mohammad Samir ~ Destination: Airport",
        start: "2022-09-13 8:00",
        end: "2022-09-13 10:00",
        color: "indigo",
      },
    ],
    selectedDriver: "Monir Hossain",
    drivers: [
      { title: "Monir Hossain" },
      { title: "Siam Ahmed" },
      { title: "Arian Islam" },
      { title: "Tunan Tahsin" },
      { title: "KabirulSajid" },
    ],
    select(driver) {
      this.selectedDriver = driver;
    },
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
  computed: {},

  components: {
    TransportNav,
  },
};
</script>

<!-- <style lang="scss" scoped>
.theme--light.v-calendar-daily ::v-deep(.v-calendar-daily__day) {
  background-color: aqua;
}
</style> -->

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
