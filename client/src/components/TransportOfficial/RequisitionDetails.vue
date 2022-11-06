<template>
  <div>
    <v-expand-transition>
      <div v-if="loading">
        <v-progress-linear indeterminate color="teal"></v-progress-linear>
        <br />
      </div>
    </v-expand-transition>
    <div class="mx-auto main-form">
      <div class="form-header">
        <img
          src="../../assets/Shahjalal_University_of_Science_and_Technology_logo.png"
          width="45px"
          alt="sust-logo.png"
        />
        <h1 class="mx-auto">Vehicle Requisition Form</h1>
      </div>
      <div class="h-line"></div>

      <div class="form-row">
        <p><strong>Teacher's Name:</strong>{{ name }}</p>
        <p><strong>Phone:</strong> {{ phone }}</p>
      </div>
      <p class="form-newLine">
        <strong>Designation & Department:</strong> {{ designation }}
      </p>
      <div class="form-row">
        <p><strong>User's Name:</strong> {{ users_name }}</p>
        <p><strong>User's Phone:</strong> {{ users_phone }}</p>
      </div>
      <p class="form-newLine"><strong>Date:</strong> {{ date }}</p>
      <div class="form-row">
        <p><strong>Start Time:</strong>{{ start_time }}</p>
        <p><strong>End Time:</strong> {{ end_time }}</p>
      </div>
      <p class="form-newLine">
        <strong>Destination:</strong> {{ destination }}
      </p>
      <p class="form-newLine">
        Vehicle is needed for <strong>{{ need }} purpose</strong>
      </p>
      <p class="form-newLine">
        <strong>Reason for Vehicle:</strong> {{ reason }}
      </p>
      <div class="form-row" v-if="selectedDriver != ''">
        <p><strong>Driver's Name:</strong> {{ selectedDriver }}</p>
        <p><strong>Drivers's Phone:</strong> 017xxxxxxxx</p>
      </div>
      <p class="form-newLine" v-if="selectedDriver != ''">
        <strong>Vehicle No. :</strong> 012s231s
      </p>

      <div style="margin-top: 65px">
        <v-btn outlined color="red darken-1" class="reject"> Reject</v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined
              color="indigo"
              v-bind="attrs"
              v-on="on"
              class="assign"
            >
              Assign Driver
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(driver, index) in drivers"
              :key="index"
              link
              @click="select(driver.title)"
            >
              <v-list-item-title>{{ driver.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          outlined
          color="green darken-1"
          class="ml-auto"
          :disabled="!grant"
        >
          Grant</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import axios from "axios";
export default {
  props: ["requisition_id"],

  created() {
    const config = {
      headers: { Authorization: `Bearer ${this.$store.getters["auth/token"]}` },
    };
    const id = this.$route.params.requisition_id;
    axios
      .get(`${api}/transport/pending/${id}`, config)
      .then((res) => {
        this.loading = false;
        this.name = res.data.data[0].fullname;
        this.phone = res.data.data[0].phone;
        this.users_name = res.data.data[0].fullname;
        this.users_phone = res.data.data[0].phone;
        this.designation =
          res.data.data[0].designation + ", " + res.data.data[0].department;
        this.start_time = res.data.data[0].start_time;
        this.end_time = res.data.data[0].end_time;
        this.destination = res.data.data[0].destination;
        this.reason = res.data.data[0].reason_for_vehicle;
        this.need = res.data.data[0].need;

        var xdate = new Date(res.data.data[0].selected_date);
        //console.log(xdate.toLocaleString());

        this.date = xdate.toLocaleString().split(",")[0];
      })
      .catch((err) => {
        console.log(err);
      });
  },

  data: () => ({
    loading: true,
    selectedDriver: "",
    name: "",
    phone: "",
    designation: "",
    users_name: "",
    users_phone: "",
    date: "",
    start_time: "",
    end_time: "",
    destination: "",
    reason: "",
    need: null,
    grant: false,
    drivers: [
      { title: "Monir Hossain" },
      { title: "Siam Ahmed" },
      { title: "Arian Islam" },
      { title: "Tunan Tahsin" },
      { title: "KabirulSajid" },
    ],
  }),
  methods: {
    select(driver) {
      this.selectedDriver = driver;
      this.grant = true;
    },
  },
};
</script>

<style scoped>
.main-form {
  max-width: 700px;
}
.form-header {
  display: flex;
  padding: 10px;
}
.h-line {
  width: 100%;
  border-bottom: 1px groove;
  margin: 20px 0px;
}
.form-row {
  display: flex;
  justify-content: space-between;
  padding: 0px 25px;
}
.form-newLine {
  padding: 0px 25px;
}
.reject {
  margin-left: 20px;
}
.assign {
  margin-left: 30px;
  margin-right: 265px;
}
p {
  font-size: 18px;
  margin-bottom: 25px;
}
</style>
