<template>
  <div style="margin-bottom: 20px">
    <transport-nav>
      <template>
        <v-toolbar-title>See Requisition List</v-toolbar-title>
      </template>
    </transport-nav>

    <v-card class="ml-12 mt-12" max-width="1000" elevation="2" outlined>
      <v-card-text class="ml-2">
        <div class="text-flex">
          <div>3s ago</div>
          <div>Requisition ID #335</div>
        </div>

        <p class="text-h5 text--primary">
          Dr. Ahsan Habib has Submitted a Requisition Form
        </p>
        <p class="text--primary mb-0">Date: 3/09/2022 ~ 8.00 AM - 11.00 AM</p>
        <p class="text--primary mb-0">Destination: Ambarkhana</p>
        <p class="text--primary mb-0">Official Need</p>
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
        <p class="text--primary mb-0">Date: 3/09/2022 ~ 10.00 AM - 1.00 PM</p>
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
        <p class="text--primary mb-0">Date: 4/09/2022 ~ 8.00 AM - 11.00 AM</p>
        <p class="text--primary mb-0">Destination: Ambarkhana</p>
        <p class="text--primary mb-0">Personal Need</p>
      </v-card-text>

      <v-card-actions class="mb-2 ml-2">
        <v-btn outlined color="indigo" class="details">See Details</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import TransportNav from "./TransportNav.vue";
export default {
  data: () => ({
    show: false,
  }),
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
</style>
