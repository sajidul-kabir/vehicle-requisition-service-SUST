<template>
  <div style="margin-bottom: 20px">
    <transport-nav>
      <template>
        <v-toolbar-title>My Granted Requisitons</v-toolbar-title>
      </template>
    </transport-nav>

    <v-card class="ml-12 mt-12" max-width="1000" outlined>
      <v-card-text class="ml-2">
        <div class="text-flex">
          <div class="mb-2">2min ago</div>
          <div>Requisition ID #335</div>
        </div>

        <p class="text-h5 text--primary">You Have Granted a Requisition</p>
        <p class="text--primary mb-0">Date: 3/09/2022 ~ 8.00 AM - 11.00 AM</p>
        <p class="text--primary mb-0">Teacher's name: Dr. Ahsan Habib</p>
        <p class="text--primary mb-0">Assigned Driver: Monir Hossain</p>
        <p class="text--primary mb-0">Destination: Ambarkhana</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <v-btn outlined color="red darken-1"> Cancel</v-btn>
        <div class="status-granted">Status: Granted</div>
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>

    <v-card class="ml-12 mt-12" max-width="1000" outlined>
      <v-card-text class="ml-2">
        <div class="text-flex">
          <div class="mb-2">10hrs ago</div>
          <div>Requisition ID #329</div>
        </div>

        <p class="text-h5 text--primary">You Have Granted a Requisition</p>
        <p class="text--primary mb-0">Date: 3/09/2022 ~ 9.00 AM - 12.00 PM</p>
        <p class="text--primary mb-0">Teacher's name: Dr. Md Forhad Rabbi</p>
        <p class="text--primary mb-0">Assigned Driver: Siam Ahmed</p>
        <p class="text--primary mb-0">Destination: Airport</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <v-btn outlined color="red darken-1"> Cancel</v-btn>
        <div class="status-granted">Status: Granted</div>
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ml-12 mt-12" max-width="1000" outlined>
      <v-card-text class="ml-2">
        <div class="text-flex">
          <div class="mb-2">2d ago</div>
          <div>Requisition ID #328</div>
        </div>

        <p class="text-h5 text--primary">You Have Granted a Requisition</p>
        <p class="text--primary mb-0">Date: 2/09/2022 ~ 8.00 AM - 11.00 AM</p>
        <p class="text--primary mb-0">Teacher's name: Raihan Ullah</p>
        <p class="text--primary mb-0">Assigned Driver: Monir Hossain</p>
        <p class="text--primary mb-0">Destination: Uposhahar</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <v-btn outlined color="red darken-1"> Cancel</v-btn>
        <div class="status-granted">Status: Granted</div>
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import TransportNav from "./TransportNav.vue";
export default {
  data: () => ({}),
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
</style>
