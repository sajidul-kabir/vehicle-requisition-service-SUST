<template>
  <div style="margin-bottom: 20px">
    <transport-nav>
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
      <v-card class="ml-12 mt-12" max-width="1000" elevation="2" outlined>
        <v-card-text class="ml-2">
          <div class="text-flex">
            <div>3s ago</div>
            <div>Requisition ID #335</div>
          </div>

          <p class="text-h5 text--primary">
            Dr. Ahsan Habib has Submitted a Requisition Form
          </p>
          <p class="text--primary mb-0">
            Date: 25/09/2022 ~ 8.00 AM - 11.00 AM
          </p>
          <p class="text--primary mb-0">Destination: Ambarkhana</p>
          <p class="text--primary mb-0">Official Need</p>
          <p class="text--primary mb-0">unOfficial Need</p>
        </v-card-text>

        <v-card-actions class="mb-2 ml-2">
          <router-link to="/transport-home/335">
            <v-btn outlined color="indigo" class="details">See Details</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>

      <v-card class="ml-12 mt-12" max-width="1000" elevation="2" outlined>
        <v-card-text class="ml-2">
          <div class="text-flex">
            <div>5min ago</div>
            <div>Requisition ID #336</div>
          </div>

          <p class="text-h5 text--primary">
            Dr. Md Forhad Rabbi has Submitted a Requisition Form
          </p>
          <p class="text--primary mb-0">
            Date: 25/09/2022 ~ 10.00 AM - 1.00 PM
          </p>
          <p class="text--primary mb-0">Destination: Airport</p>
          <p class="text--primary mb-0">Official Need</p>
        </v-card-text>

        <v-card-actions class="mb-2 ml-2">
          <v-btn outlined color="indigo" class="details">See Details</v-btn>
        </v-card-actions>
      </v-card>

      <v-card class="ml-12 mt-12" max-width="1000" elevation="2" outlined>
        <v-card-text class="ml-2">
          <div class="text-flex">
            <div>2hrs ago</div>
            <div>Requisition ID #337</div>
          </div>

          <p class="text-h5 text--primary">
            Enamul Hassan has Submitted a Requisition Form
          </p>
          <p class="text--primary mb-0">
            Date: 26/09/2022 ~ 8.00 AM - 11.00 AM
          </p>
          <p class="text--primary mb-0">Destination: Ambarkhana</p>
          <p class="text--primary mb-0">Personal Need</p>
        </v-card-text>

        <v-card-actions class="mb-2 ml-2">
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
import TransportNav from "./TransportNav.vue";
export default {
  data: () => ({
    view: "grid",
    show: false,

    search: "",
    headers: [
      {
        text: "Requisition ID",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Teachers name", value: "teacherName" },
      { text: "Start-time", value: "startTime" },
      { text: "End-time", value: "endTime" },
      { text: "Date", value: "date" },
      { text: "Destination", value: "dest" },
      { text: "Need", value: "need" },
    ],
    requisitions: [
      {
        name: "ID #335",
        teacherName: "Dr. Ahsan Habib",
        startTime: "8.00",
        endTime: "11.00",
        date: "25/09/2022",
        dest: "Ambarkhana",
        need: "Official",
      },
      {
        name: "ID #336",
        teacherName: "Raihan Ullah",
        startTime: "8.00",
        endTime: "11.00",
        date: "25/09/2022",
        dest: "Shubidbazar",
        need: "Personal",
      },
      {
        name: "ID #337",
        teacherName: "Dr. Fazle Rabbi",
        startTime: "13.00",
        endTime: "15.00",
        date: "25/09/2022",
        dest: "Ambarkhana",
        need: "Official",
      },
      {
        name: "ID #338",
        teacherName: "Dr. Ahsan Habib",
        startTime: "10.00",
        endTime: "13.00",
        date: "26/09/2022",
        dest: "Airport",
        need: "Personal",
      },
      {
        name: "ID #339",
        teacherName: "Parthapratim Paul",
        startTime: "10.00",
        endTime: "13.00",
        date: "26/09/2022",
        dest: "Airport",
        need: "Official",
      },
      {
        name: "ID #340",
        teacherName: "Enamul Hasan",
        startTime: "8.00",
        endTime: "11.00",
        date: "26/09/2022",
        dest: "Uposhahar",
        need: "Personal",
      },
      {
        name: "ID #341",
        teacherName: "Raihan Ullah",
        startTime: "8.00",
        endTime: "10.00",
        date: "27/09/2022",
        dest: "Airport",
        need: "Official",
      },
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
