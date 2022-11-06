<template>
  <div style="margin-bottom: 20px">
    <v-expand-transition>
      <div v-if="loading">
        <v-progress-linear indeterminate color="teal"></v-progress-linear>
        <br />
      </div>
    </v-expand-transition>
    <transport-nav>
      <template>
        <v-toolbar-title>See Granted Requisitons</v-toolbar-title>
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
        class="ml-12 mt-12"
        max-width="1000"
        outlined
      >
        <v-card-text class="ml-2">
          <div class="text-flex">
            <div class="mb-2">{{ requisition.created_at }}</div>
            <div>Requisition ID #{{ requisition.id }}</div>
          </div>

          <p class="text-h5 text--primary">You Have Granted a Requisition</p>
          <p class="text--primary mb-0">
            Date: {{ requisition.selected_date }} ~
            {{ requisition.start_time }} - {{ requisition.end_time }}
          </p>
          <p class="text--primary mb-0">
            Teacher's name: {{ requisition.teacher_name }}
          </p>
          <p class="text--primary mb-0">
            Assigned Driver: {{ requisition.driver_name }}
          </p>
          <p class="text--primary mb-0">
            Destination: {{ requisition.destination }}
          </p>
        </v-card-text>
        <v-card-actions class="mb-2 ml-2">
          <v-btn outlined color="red darken-1"> Cancel</v-btn>
          <div class="status-granted">Status: Granted</div>
          <v-btn outlined color="indigo" class="details">See Details</v-btn>
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
    axios
      .get(`${api}/transport/pending/grant`, config)
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
    search: "",
    loading: true,
    headers: [
      {
        text: "Requisition ID",
        align: "start",
        sortable: true,
        value: "id",
      },
      { text: "Teachers name", value: "teacher_name" },
      { text: "Assigned Driver", value: "driver_name" },
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
.status-granted {
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
</style>
