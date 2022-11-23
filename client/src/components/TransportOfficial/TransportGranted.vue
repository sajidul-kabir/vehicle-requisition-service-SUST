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
            <div style="margin-right: 25px">
              Requisition ID #{{ requisition.id }}
            </div>
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
          <v-btn
            outlined
            color="red darken-1"
            @click="openDialog(requisition.id)"
          >
            Cancel</v-btn
          >
          <div class="status-granted">Status: Granted</div>

          <router-link
            class="details"
            :to="'/transport-home/granted/' + requisition.id"
          >
            <v-btn outlined color="indigo" class="details">See Details</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="380">
          <v-card>
            <v-card-title class="text-h5">
              Are you sure you want to reject this requisition?
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
    username: "",
    user_photo: null,
    requisition_to_be_deleted: "",
    dialog: false,
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
    rowClick(x) {
      //console.log(x);
      this.$router.push("/transport-home/granted/" + x.id);
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
