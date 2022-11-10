<template>
  <div style="margin-bottom: 20px">
    <v-expand-transition>
      <div v-if="loading">
        <v-progress-linear indeterminate color="teal"></v-progress-linear>
        <br />
      </div>
    </v-expand-transition>
    <teacher-nav :username="username">
      <template>
        <v-toolbar-title>My Schedule</v-toolbar-title>
      </template>
    </teacher-nav>

    <v-card
      v-for="requisition in requisitions"
      :key="requisition.id"
      class="ml-12 mt-12"
      max-width="1000"
      elevation="2"
      outlined
    >
      <v-card-text class="ml-2">
        <div class="text-flex">
          <div class="mb-2">Requisition Overview</div>
          <div style="margin-right: 25px">
            Requisition ID #{{ requisition.id }}
          </div>
        </div>

        <p class="text-h5 text--primary">
          <template>
            <vue-countdown-timer
              @start_callback="startCallBack('event started')"
              @end_callback="endCallBack('event ended')"
              :start-time="Date.now()"
              :end-time="requisition.special"
              :interval="1000"
              :start-label="'Until start:'"
              :end-label="'Starts in'"
              label-position="begin"
              :end-text="'Event ended!'"
              :day-txt="'days'"
              :hour-txt="'hours'"
              :minutes-txt="'minutes'"
              :seconds-txt="'seconds'"
            >
            </vue-countdown-timer>
          </template>
        </p>
        <p class="text--primary mb-0">
          Date: {{ requisition.selected_date }} ~ {{ requisition.start_time }} -
          {{ requisition.end_time }}
        </p>
        <p class="text--primary mb-0">
          Destination: {{ requisition.destination }}
        </p>
        <p class="text--primary mb-0">
          Assigned Driver: {{ requisition.driver_name }}
        </p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <v-btn outlined color="red darken-1"> Cancel</v-btn>
        <div class="status">Status: Granted</div>
        <router-link
          class="details"
          :to="'/transport-home/granted/' + requisition.id"
        >
          <v-btn outlined color="indigo" class="details">See Details</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import TeacherNav from "../Teacher/TeacherNav.vue";
//import VueCountdown from "@chenfengyuan/vue-countdown";

//import countdown from "countdown";
import api from "@/api";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
// English.
import en from "javascript-time-ago/locale/en";
export default {
  created() {
    const config = {
      headers: { Authorization: `Bearer ${this.$store.getters["auth/token"]}` },
    };
    //console.log(this.$store.getters["auth/token"]);
    this.username = this.$store.getters["auth/user"];
    axios
      .get(`${api}/teachers/my-schedule`, config)
      .then((res) => {
        this.loading = false;
        console.log(res);
        this.requisitions = res.data.data;

        TimeAgo.addDefaultLocale(en);

        this.requisitions.forEach((requisition) => {
          const timeAgo = new TimeAgo("en-US");
          let date = timeAgo.format(
            Date.parse(requisition.created_at) + 6 * 60 * 60 * 1000
          );
          requisition.created_at = date;
          var xdate = new Date(requisition.selected_date);
          requisition.selected_date = xdate.toLocaleString().split(",")[0];
          let yHour = requisition.start_time.substring(0, 2);
          let yMin = requisition.start_time.substring(3, 5);
          console.log(yHour);
          console.log(yMin);
          requisition.special =
            Date.parse(xdate.toLocaleString()) +
            parseInt(yHour) * 60 * 60 * 1000 +
            parseInt(yMin) * 60 * 1000;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      requisitions: [],
      name: "Timer",
      loading: true,
      username: "",
    };
  },
  methods: {
    startCallBack: function (x) {
      console.log(x);
    },
    endCallBack: function (x) {
      console.log(x);
    },
  },
  components: {
    TeacherNav,
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.text-flex {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.status {
  border: 1px solid;
  padding: 5px 15px;
  color: #66bb6a;
  margin-left: 20px;
  border-radius: 20px;
  background: #4caf500f;
}
.details {
  margin-left: auto;
  margin-right: 12px;
}
</style>
