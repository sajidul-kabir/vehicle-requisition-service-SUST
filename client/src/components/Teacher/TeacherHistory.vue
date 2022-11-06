<template>
  <div style="margin-bottom: 20px">
    <v-expand-transition>
      <div v-if="loading">
        <v-progress-linear indeterminate color="teal"></v-progress-linear>
        <br />
      </div>
    </v-expand-transition>
    <teacher-nav>
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
          <div>Requisition ID #{{ requisition.requisition_id }}</div>
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
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
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
    //console.log(this.$store.getters["auth/token"]);
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
      loading: true,
    };
  },
  components: {
    TeacherNav,
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
