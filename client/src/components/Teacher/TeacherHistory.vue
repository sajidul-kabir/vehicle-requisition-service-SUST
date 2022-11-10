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
        <v-toolbar-title>See History</v-toolbar-title>
      </template>
    </teacher-nav>
    <v-card
      v-for="requisition in requisitions"
      :key="requisition.requisition_id"
      class="ml-12 mt-12"
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

        <p class="text-h5 text--primary">You Have Submitted a Requisition</p>
        <p class="text--primary mb-0">
          Date: {{ requisition.selected_date }} ~ {{ requisition.start_time }} -
          {{ requisition.end_time }}
        </p>
        <p class="text--primary mb-0">
          Destination: {{ requisition.destination }}
        </p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <v-btn
          :class="requisition.status === 'rejected' ? 'cancel' : ''"
          outlined
          color="red darken-1"
          @click="openDialog(requisition.requisition_id)"
        >
          Cancel</v-btn
        >
        <div v-if="requisition.status === 'granted'">
          <div class="status-granted">Status: {{ requisition.status }}</div>
        </div>

        <div
          v-else-if="requisition.status === 'pending'"
          class="status-pending"
        >
          Status: {{ requisition.status }}
        </div>
        <div
          v-else-if="requisition.status === 'rejected'"
          class="status-rejected"
        >
          Status: {{ requisition.status }}
        </div>
        <div
          v-else-if="requisition.status === 'completed'"
          class="status-completed"
        >
          Status: {{ requisition.status }}
        </div>
        <router-link
          v-if="requisition.status === 'pending'"
          class="details"
          :to="'/transport-home/' + requisition.requisition_id"
        >
          <v-btn outlined color="indigo" class="details">See Details</v-btn>
        </router-link>

        <router-link
          v-if="requisition.status === 'granted'"
          class="details"
          :to="'/transport-home/granted/' + requisition.requisition_id"
        >
          <v-btn outlined color="indigo" class="details">See Details</v-btn>
        </router-link>
        <router-link
          v-if="requisition.status === 'rejected'"
          class="details"
          :to="'/transport-home/rejected/' + requisition.requisition_id"
        >
          <v-btn outlined color="indigo" class="details">See Details</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
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
import api from "@/api";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import TeacherNav from "./TeacherNav.vue";
export default {
  created() {
    const config = {
      headers: { Authorization: `Bearer ${this.$store.getters["auth/token"]}` },
    };
    this.username = this.$store.getters["auth/user"];
    axios
      .get(`${api}/teachers/history`, config)
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
  data() {
    return {
      requisitions: [],
      requisition_to_be_deleted: null,
      loading: true,
      username: "",
      dialog: false,
    };
  },
  methods: {
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
    openDialog(id) {
      this.dialog = true;
      this.requisition_to_be_deleted = id;
      console.log(id);
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
.status-granted {
  border: 1px solid;
  padding: 5px 15px;
  color: #66bb6a;
  margin-left: 20px;
  border-radius: 20px;
  background: #4caf500f;
}
.cancel {
  display: none;
}
.status-pending {
  border: 1px solid;
  padding: 5px 15px;
  color: #706b6b;
  margin-left: 20px;
  border-radius: 20px;
  background: #eeeeeead;
}
.status-rejected {
  border: 1px solid;
  padding: 5px 15px;
  color: red;
  border-radius: 20px;
  background: #ff525212;
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
