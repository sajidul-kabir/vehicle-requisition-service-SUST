<template>
  <div>
    <teacher-nav>
      <template>
        <v-toolbar-title>See History</v-toolbar-title>
      </template>
    </teacher-nav>
    <v-card class="ml-12 mt-12" max-width="1000" outlined>
      <v-card-text class="ml-2">
        <div class="mb-2">2 hrs ago</div>
        <p class="text-h5 text--primary">You Have Submitted a Requisition</p>
        <p class="text--primary mb-0">Date: 3/09/2022 ~ 8.00 AM - 11.00 AM</p>
        <p class="text--primary mb-0">Destination: Ambarkhana</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <v-btn outlined color="red darken-1"> Cancel</v-btn>
        <div class="status-pending">Status: Pending</div>
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ml-12 mt-6" max-width="1000" outlined>
      <v-card-text class="ml-2">
        <div class="mb-2">6 hrs ago</div>
        <p class="text-h5 text--primary">You Have Submitted a Requisition</p>
        <p class="text--primary mb-0">Date: 3/09/2022 ~ 8.00 AM - 11.00 AM</p>
        <p class="text--primary mb-0">Destination: Ambarkhana</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <div class="status-rejected">Status: Rejected</div>
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ml-12 mt-6" max-width="1000" outlined>
      <v-card-text class="ml-2">
        <div class="mb-2">1d ago</div>
        <p class="text-h5 text--primary">You Have Submitted a Requisition</p>
        <p class="text--primary mb-0">Date: 3/09/2022 ~ 8.00 AM - 11.00 AM</p>
        <p class="text--primary mb-0">Destination: Ambarkhana</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <v-btn outlined color="red darken-1"> Cancel</v-btn>
        <div class="status-granted">Status: Granted</div>
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ml-12 mt-6" max-width="1000" outlined>
      <v-card-text class="ml-2">
        <div class="mb-2">3d ago</div>
        <p class="text-h5 text--primary">You Have Submitted a Requisition</p>
        <p class="text--primary mb-0">Date: 3/09/2022 ~ 8.00 AM - 11.00 AM</p>
        <p class="text--primary mb-0">Destination: Ambarkhana</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <div class="status-completed">Status: Completed</div>
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import TeacherNav from "./TeacherNav.vue";
export default {
  components: {
    TeacherNav,
  },
};
</script>
<style scoped>
.status-granted {
  border: 1px solid;
  padding: 5px 15px;
  color: #66bb6a;
  margin-left: 20px;
  border-radius: 20px;
  background: #4caf500f;
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
