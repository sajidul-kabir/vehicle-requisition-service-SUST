<template>
  <div style="margin-bottom: 20px">
    <v-expand-transition>
      <div v-if="loading">
        <v-progress-linear indeterminate color="teal"></v-progress-linear>
        <br />
      </div>
    </v-expand-transition>
    <teacher-nav :username="username" :user_photo="user_photo">
      <template>
        <v-toolbar-title>My Schedule</v-toolbar-title>
      </template>
    </teacher-nav>

    <div v-if="!empty">
      <v-card
        v-for="requisition in requisitions"
        :key="requisition.id"
        class="mt-12 sm:ml-12"
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
                @end_callback="endCallBack(requisition.id)"
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
            Date: {{ requisition.selected_date }} ~
            {{ requisition.start_time }} -
            {{ requisition.end_time }}
          </p>
          <p class="text--primary mb-0">
            Destination: {{ requisition.destination }}
          </p>
          <p class="text--primary mb-0">
            Assigned Driver: {{ requisition.driver_name }}
          </p>
        </v-card-text>
        <v-card-actions class="mb-2 ml-2 flex md:flex-row flex-col-reverse gap-3 justify-start items-start">
          <v-btn
            outlined
            color="red darken-1"
            @click="openDialog(requisition.id)"
          >
            Cancel</v-btn
          >
          <div class="flex md:flex-row gap-3">
            <div class="status">Status: Granted</div>
            <router-link class="details" :to="'/transport-home/granted/' + requisition.id">
              <v-btn outlined color="indigo" class="details">See Details</v-btn>
            </router-link>
          </div>
        </v-card-actions>
      </v-card>
    </div>
    <div v-if="empty">
      <div class="divv">
        <img
          class="image-schedule"
          src="../../../public/assets/Pick up truck-bro.png"
          alt="pickup.png"
        />
        <h2 class="divv-h1">Your Schedule is Empty right now !!!</h2>
      </div>
    </div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="text-h5">
            Are you sure you want to cancel this requisition?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="red darken-1" text @click="dialog = false">
              NO
            </v-btn>
            <v-btn outlined color="green darken-2" text @click="cancel()">
              YES
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
    this.username = this.$store.getters["auth/user"];
    axios
      .get(`${api}/teachers/my-schedule`, config)
      .then((res) => {
        this.loading = false;
        console.log(res);
        this.requisitions = res.data.data;
        if (res.data.total === 0) {
          this.empty = true;
        } else {
          this.empty = false;
        }

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
          // console.log(yHour);
          // console.log(yMin);
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
      empty: "false",
      user_photo: null,
      dialog: false,
      requisition_to_be_deleted: "",
    };
  },
  methods: {
    startCallBack: function (x) {
      console.log(x, "start");
    },
    endCallBack: function (x) {
      const config = {
        headers: {
          Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
        },
      };
      axios
        .patch(`${api}/teachers/complete/${x}`, {}, config)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openDialog(id) {
      this.dialog = true;
      this.requisition_to_be_deleted = id;
      console.log(id);
    },
    cancel() {
      const config = {
        headers: {
          Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
        },
      };
      this.dialog = false;
      this.loading = true;
      console.log(this.requisition_to_be_deleted);
      axios
        .delete(
          `${api}/teachers/cancel/${this.requisition_to_be_deleted}`,
          config
        )
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.requisition_to_be_deleted = null;
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.log(err);
        });
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
  border-radius: 20px;
  background: #4caf500f;
}
.details {
  margin-left: auto;
  margin-right: 12px;
}
.image-schedule {
  max-width: 600px;
}
.divv {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.divv-h1 {
  color: #258685;
  position: relative;
  bottom: 120px;
}
</style>
