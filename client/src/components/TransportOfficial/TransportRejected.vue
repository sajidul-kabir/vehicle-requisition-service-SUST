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
        <v-toolbar-title>See Rejected Requisitons</v-toolbar-title>
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
        :key="requisition.requisition_id"
        class="mt-12 md:ml-12"
        max-width="1000"
        outlined
      >
        <v-card-text class="ml-2">
          <div class="text-flex">
            <div class="mb-2">{{ requisition.created_at }}</div>
            <div style="margin-right: 25px">
              Requisition ID #{{ requisition.requisition_id }}
            </div>
          </div>

          <p class="text-h5 text--primary">You Have Rejected a Requisition</p>
          <p class="text--primary mb-0">
            Date: {{ requisition.selected_date }} ~
            {{ requisition.start_time }} - {{ requisition.end_time }}
          </p>
          <p class="text--primary mb-0">
            Teacher's name: {{ requisition.fullname }}
          </p>
          <p class="text--primary mb-0">
            Destination: {{ requisition.destination }}
          </p>
        </v-card-text>
        <v-card-actions class="mb-2 ml-2">
          <div class="status-rejected">Status: Rejected</div>
          <router-link
            class="details"
            :to="'/transport-home/rejected/' + requisition.requisition_id"
          >
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
import axios from "axios";
import api from "@/api";
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
    axios
      .get(`${api}/transport/pending/reject`, config)
      .then((res) => {
        this.loading = false;
        console.log(res);
        this.requisitions = res.data.data;

        TimeAgo.addDefaultLocale(en);

        this.requisitions.forEach((requisition) => {
          const timeAgo = new TimeAgo("en-US");
          let date = timeAgo.format(Date.parse(requisition.created_at));
          requisition.created_at = date;

          var xdate = new Date(requisition.selected_date);
          console.log(xdate.toLocaleString());

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
    loading: true,
    username: "",
    user_photo: null,
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
    rowClick() {
      this.$router.push("/transport-home/335");
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
.text-flex {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.status-rejected {
  border: 1px solid;
  padding: 5px 15px;
  color: red;
  border-radius: 20px;
  background: #ff525212;
}

.details {
  margin-left: auto;
  margin-right: 12px;
}
a {
  text-decoration: none;
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
.details {
  margin-left: auto;
  margin-right: 12px;
}
</style>
