<template>
  <div style="margin-bottom: 20px">
    <v-expand-transition>
      <div v-if="loading">
        <v-progress-linear indeterminate color="teal"></v-progress-linear>
        <br />
      </div>
    </v-expand-transition>
    <transport-nav :username="username" :user_photo="user_photo">
      <template>
        <v-toolbar-title>See Drivers' Schedule</v-toolbar-title>
      </template>
    </transport-nav>

    <div class="mt-12 mb-12 container">
      <p v-if="selectedDriver" class="text-h5 text--primary">
        Driver {{ selectedDriver }}'s work Schedule is being shown
      </p>
      <p v-else>Please Choose a driver</p>
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
            @click="select(driver.fullname, driver.id)"
          >
            <v-list-item-title>{{ driver.fullname }}</v-list-item-title>
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
        <div>
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
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TransportNav from "./TransportNav.vue";
import api from "@/api";
import axios from "axios";

export default {
  created() {
    const config = {
      headers: { Authorization: `Bearer ${this.$store.getters["auth/token"]}` },
    };
    this.username = this.$store.getters["auth/user"];
    const user = {
      username: this.$store.getters["auth/user"],
      role: this.$store.getters["auth/role"],
    };

    axios
      .post(`${api}/users/me`, user, config)
      .then((res) => {
        if (res.data.data[0].user_photo != null)
          this.user_photo = res.data.data[0].user_photo;

        if (this.user_photo === "user.png") {
          this.user_photo = null;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //console.log(this.$store.getters["auth/token"]);
    axios
      .get(`${api}/drivers`, config)
      .then((res) => {
        console.log(res);
        this.drivers = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${api}/transport/drivers/1`, config)
      .then((res) => {
        this.loading = false;
        this.events = res.data.data;
        this.events.forEach((event) => {
          var xdate = new Date(event.selected_date);
          let num = xdate.getMonth() + 1;
          let str = xdate.getFullYear() + "-" + num + "-" + xdate.getDate();
          event.name =
            event.teacher_name + " ~ " + "Destination: " + event.destination;
          event.start = str + " " + event.start_time;
          event.end = str + " " + event.end_time;
          event.color = this.getRandomColor();
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },
  data: () => ({
    today: "2022-09-16",
    focus: "",
    loading: true,
    username: "",
    user_photo: null,

    intervals: {
      first: 7,
      minutes: 60,
      count: 11,
    },
    events: [],
    drivers: [],
    colors: ["blue", "indigo", "deep-purple", "cyan", "orange", "teal"],
    selectedDriver: "Monir Ahmed",

    select(driver, id) {
      this.loading = true;
      this.selectedDriver = driver;
      const config = {
        headers: {
          Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
        },
      };
      axios
        .get(`${api}/transport/drivers/${id}`, config)
        .then((res) => {
          this.loading = false;
          this.events = res.data.data;
          this.events.forEach((event) => {
            var xdate = new Date(event.selected_date);
            let num = xdate.getMonth() + 1;
            let str = xdate.getFullYear() + "-" + num + "-" + xdate.getDate();
            event.name =
              event.teacher_name + " ~ " + "Destination: " + event.destination;
            event.start = str + " " + event.start_time;
            event.end = str + " " + event.end_time;
            event.color = this.getRandomColor();
          });
        })
        .catch((e) => {
          console.log(e);
        });
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
    calendarEvent(x) {
      //console.log(x);
      this.$router.push("/transport-home/granted/" + x.event.id);
    },
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getRandomColor() {
      let target = this.randomIntFromInterval(0, 5);
      return this.colors[target];
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
