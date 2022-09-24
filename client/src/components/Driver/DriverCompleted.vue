<template>
  <div style="margin-bottom: 20px">
    <DriverNav>
      <template>
        <v-toolbar-title>Completed Requisitons</v-toolbar-title>
      </template>
    </DriverNav>
    <v-card class="ml-12 mt-6" max-width="1000" outlined>
      <v-card-text class="ml-2">
        <div class="mb-2">3d ago</div>
        <p class="text-h5 text--primary">Successfully Completed a Trip</p>
        <p class="text--primary mb-0">Date: 23/09/2022 ~ 8.00 AM - 11.00 AM</p>
        <p class="text--primary mb-0">Teacher's name: Dr. Fazle Rabbi</p>
        <p class="text--primary mb-0">Destination: Ambarkhana</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <div class="status-completed">Status: Completed</div>
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ml-12 mt-6" max-width="1000" outlined>
      <v-card-text class="ml-2">
        <div class="mb-2">4d ago</div>
        <p class="text-h5 text--primary">Successfully Completed a Trip</p>
        <p class="text--primary mb-0">Date: 22/09/2022 ~ 12.00 AM - 3.00 PM</p>
        <p class="text--primary mb-0">Teacher's name: Dr. Ahsan Habib</p>
        <p class="text--primary mb-0">Destination: Ambarkhana</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <div class="status-completed">Status: Completed</div>
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ml-12 mt-6" max-width="1000" outlined>
      <v-card-text class="ml-2">
        <div class="mb-2">4d ago</div>
        <p class="text-h5 text--primary">Successfully Completed a Trip</p>
        <p class="text--primary mb-0">Date: 22/09/2022 ~ 8.00 AM - 10.00 AM</p>
        <p class="text--primary mb-0">Teacher's name: Raihan Ullah</p>
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
import DriverNav from "./DriverNav.vue";
export default {
  components: { DriverNav },
};
</script>

<style scoped>
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
