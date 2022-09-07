<template>
  <div style="margin-bottom: 20px">
    <transport-nav>
      <template>
        <v-toolbar-title>See Rejected Requisitons</v-toolbar-title>
      </template>
    </transport-nav>
    <v-card class="ml-12 mt-12" max-width="1000" outlined>
      <v-card-text class="ml-2">
        <div class="text-flex">
          <div class="mb-2">2min ago</div>
          <div>Requisition ID #336</div>
        </div>

        <p class="text-h5 text--primary">You Have Rejected a Requisition</p>
        <p class="text--primary mb-0">Date: 3/09/2022 ~ 10.00 AM - 1.00 PM</p>
        <p class="text--primary mb-0">Teacher's name: Dr. Md Forhad Rabbi</p>
        <p class="text--primary mb-0">Destination: Ambarkhana</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <div class="status-rejected">Status: Rejected</div>
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ml-12 mt-12" max-width="1000" outlined>
      <v-card-text class="ml-2">
        <div class="text-flex">
          <div class="mb-2">3min ago</div>
          <div>Requisition ID #329</div>
        </div>

        <p class="text-h5 text--primary">You Have Rejected a Requisition</p>
        <p class="text--primary mb-0">Date: 4/09/2022 ~ 12.00 PM - 2.00 PM</p>
        <p class="text--primary mb-0">Teacher's name: Raihan Ullah</p>
        <p class="text--primary mb-0">Destination: Airport</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <div class="status-rejected">Status: Rejected</div>
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ml-12 mt-12" max-width="1000" outlined>
      <v-card-text class="ml-2">
        <div class="text-flex">
          <div class="mb-2">2hrs ago</div>
          <div>Requisition ID #321</div>
        </div>

        <p class="text-h5 text--primary">You Have Rejected a Requisition</p>
        <p class="text--primary mb-0">Date: 5/09/2022 ~ 8.00 AM - 10.00 AM</p>
        <p class="text--primary mb-0">Teacher's name: Fazle Md. Tawsif</p>
        <p class="text--primary mb-0">Destination: Ambarkhana</p>
      </v-card-text>
      <v-card-actions class="mb-2 ml-2">
        <div class="status-rejected">Status: Rejected</div>
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
</style>
