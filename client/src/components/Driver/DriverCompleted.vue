<template>
  <div style="margin-bottom: 20px">
    <v-expand-transition>
      <div v-if="loading">
        <v-progress-linear indeterminate color="teal"></v-progress-linear>
        <br />
      </div>
    </v-expand-transition>
    <DriverNav :username="username" :user_photo="user_photo">
      <template>
        <v-toolbar-title>Completed Requisitons</v-toolbar-title>
      </template>
    </DriverNav>
    <v-card
      v-for="requisition in requisitions"
      :key="requisition.id"
      class="ml-12 mt-6"
      max-width="1000"
      outlined
    >
      <v-card-text class="ml-2">
        <div class="mb-2">{{ requisition.created_at }}</div>
        <p class="text-h5 text--primary">Successfully Completed a Trip</p>
        <p class="text--primary mb-0">
          Date: {{ requisition.selected_date }} ~ {{ requisition.start_time }} -
          {{ requisition.end_time }}
        </p>
        <p class="text--primary mb-0">
          Teacher's name: {{ requisition.teacher_name }}
        </p>
        <p class="text--primary mb-0">
          Destination: {{ requisition.destination }}
        </p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <div class="status-completed">Status: Completed</div>
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
import axios from "axios";
import api from "@/api";
import TimeAgo from "javascript-time-ago";
// English.
import en from "javascript-time-ago/locale/en";
import DriverNav from "./DriverNav.vue";
export default {
  created() {
    this.loading = true;
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
    axios
      .get(`${api}/drivers/completed`, config)
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
          console.log(date);
          requisition.created_at = date;

          var xdate = new Date(requisition.selected_date);
          //console.log(xdate.toLocaleString());

          requisition.selected_date = xdate.toLocaleString().split(",")[0];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data: () => ({
    requisitions: [],
    loading: true,
    username: "",
    user_photo: null,
  }),
  components: { DriverNav },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.status-completed {
  border: 1px solid;
  padding: 5px 15px;
  color: #3f51b5;
  border-radius: 20px;
  background: #1976d212;
}
.details {
  margin-left: auto;
  margin-right: 12px;
}
</style>
