<template>
  <div style="margin-bottom: 20px">
    <v-expand-transition>
      <div v-if="loading">
        <v-progress-linear indeterminate color="teal"></v-progress-linear>
        <br />
      </div>
    </v-expand-transition>

    <!-- <div v-if="loading">
      <v-progress-linear indeterminate color="teal"></v-progress-linear>
      <br />
    </div> -->
    <transport-nav :username="username" :user_photo="user_photo">
      <template>
        <v-toolbar-title>See Requisition List</v-toolbar-title>
      </template>
    </transport-nav>
    <div class="ml-12 mt-12">
      <v-btn outlined color="indigo" :class="viewCheck" @click="gridBtn"
        >Grid view</v-btn
      ><v-btn
        outlined
        color="indigo"
        :class="viewCheck2"
        @click="tabBtn"
        style="margin-left: -2px"
        >Tabular view</v-btn
      >
    </div>

    <div v-if="view === 'grid'">
      <v-card
        v-for="requisition in requisitions"
        :key="requisition.id"
        class="md:ml-12 mt-12"
        max-width="1000"
        elevation="2"
        outlined
      >
        <v-card-text class="ml-2">
          <div class="text-flex">
            <div>{{ requisition.created_at }}</div>
            <div>Requisition ID #{{ requisition.requisition_id }}</div>
          </div>

          <p class="text-h5 text--primary">
            {{ requisition.fullname }} has Submitted a Requisition Form
          </p>
          <p class="text--primary mb-0">
            Date: {{ requisition.selected_date }} ~
            {{ requisition.start_time }} -
            {{ requisition.end_time }}
          </p>
          <p class="text--primary mb-0">
            Destination: {{ requisition.destination }}
          </p>
          <p class="text--primary mb-0">{{ requisition.need }} Need</p>
        </v-card-text>

        <v-card-actions class="mb-2 ml-2">
          <router-link :to="'/transport-home/' + requisition.requisition_id">
            <v-btn outlined color="indigo" class="details">See Details</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </div>

    <div v-else>
      <v-card class="ml-12 mt-12 mr-6">
        <v-card-title>
          Requisition Overview
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="requisitions"
          :search="search"
          @click:row="rowClick"
          class="d-tab"
        >
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
// English.
import en from "javascript-time-ago/locale/en";
import TransportNav from "./TransportNav.vue";
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
      .get(`${api}/transport/pending`, config)
      .then((res) => {
        console.log(res);
        this.requisitions = res.data.data;
        this.loading = false;

        TimeAgo.addDefaultLocale(en);

        this.requisitions.forEach((requisition) => {
          const timeAgo = new TimeAgo("en-US");
          let date = timeAgo.format(Date.parse(requisition.created_at));
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
    view: "grid",
    show: false,
    requisitions: [],
    search: "",
    loading: true,
    expand: false,
    user_photo: null,
    username: "",
    headers: [
      {
        text: "Requisition ID",
        align: "start",
        sortable: true,
        value: "requisition_id",
      },
      { text: "Teachers name", value: "fullname" },
      { text: "Start-time", value: "start_time" },
      { text: "End-time", value: "end_time" },
      { text: "Date", value: "selected_date" },
      { text: "Destination", value: "destination" },
      { text: "Need", value: "need" },
    ],
  }),

  methods: {
    gridBtn() {
      this.view = "grid";
    },
    tabBtn() {
      this.view = "tab";
    },
    rowClick(e) {
      this.$router.push("/transport-home/" + e.requisition_id);
    },
  },
  computed: {
    viewCheck() {
      if (this.view === "grid") {
        return "tab-btn";
      }
      return "";
    },
    viewCheck2() {
      if (this.view === "tab") {
        return "tab-btn";
      }
      return "";
    },
  },

  components: {
    TransportNav,
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
.tab-btn {
  background-color: teal;
  color: white !important;
  height: 37px !important;
}
.d-tab {
}
.d-tab:hover {
  cursor: pointer;
}
</style>
