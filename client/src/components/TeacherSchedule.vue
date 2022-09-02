<template>
  <div style="margin-bottom: 20px">
    <teacher-nav>
      <template>
        <v-toolbar-title>My Schedule</v-toolbar-title>
      </template>
    </teacher-nav>
    <v-card class="ml-12 mt-12" max-width="1000" elevation="2" outlined>
      <v-card-text class="ml-2">
        <div class="mb-2">Requisition Overview</div>
        <p class="text-h4 text--primary">Starts in: 3 Hours</p>
        <p class="text--primary mb-0">Date: 3/09/2022 ~ 8.00 AM - 11.00 AM</p>
        <p class="text--primary mb-0">Destination: Ambarkhana</p>
        <p class="text--primary mb-0">Assigned Driver: Monir Hossain</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <v-btn outlined color="red darken-1"> Cancel</v-btn>
        <div class="status">Status: Granted</div>
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ml-12 mt-12" max-width="1000" elevation="2" outlined>
      <v-card-text class="ml-2">
        <div class="mb-2">Requisition Overview</div>
        <p class="text-h4 text--primary">Starts in: 12 Hours</p>
        <p class="text--primary mb-0">Date: 4/09/2022 ~ 8.00 AM - 12.00 AM</p>
        <p class="text--primary mb-0">Destination: Airport</p>
        <p class="text--primary mb-0">Assigned Driver: Baker Kabir</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <v-btn outlined color="red darken-1"> Cancel</v-btn>
        <div class="status">Status: Granted</div>
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ml-12 mt-12" max-width="1000" elevation="2" outlined>
      <v-card-text class="ml-2">
        <div class="mb-2">Requisition Overview</div>
        <p class="text-h4 text--primary">Starts in: 1 day 2 Hours</p>
        <p class="text--primary mb-0">Date: 5/09/2022 ~ 9.00 AM - 11.00 AM</p>
        <p class="text--primary mb-0">Destination: Ambarkhana</p>
        <p class="text--primary mb-0">Assigned Driver: Monir Hossain</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <v-btn outlined color="red darken-1"> Cancel</v-btn>
        <div class="status">Status: Granted</div>
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
.status {
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
</style>
