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
      <div class="form-row">
        <p><strong>Driver's Name:</strong> {{ drivers_name }}</p>
        <p><strong>Driver's Phone:</strong> {{ drivers_phone }}</p>
      </div>
      <p class="form-newLine">
        <strong>Vehicle No. :</strong> {{ vehicle_no }}
      </p>

      <!-- <div class="teacher-holder" v-if="role === 'teacher'">
          <v-btn outlined color="red darken-1" class="reject"> Cancel</v-btn>
          <v-btn outlined color="indigo" class="reject"> Edit</v-btn>
        </div> -->
      <!-- <div class="holder" v-if="role === 'transport'">
          <v-btn outlined color="red darken-1" class="reject"> Reject</v-btn>
  
          <v-menu
            top
            :offset-y="offset"
            origin="center center"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                @click="assignDriver"
                outlined
                color="indigo"
                v-bind="attrs"
                v-on="on"
                class="assign"
              >
                Assign Driver
              </v-btn>
            </template>
            <v-list v-if="progress">
              <div class="text-center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
            </v-list>
            <v-list v-else>
              <v-list-item
                v-for="(driver, index) in drivers"
                :key="index"
                link
                @click="select(driver)"
              >
                <v-list-item-title>{{ driver.fullname }}</v-list-item-title>
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
        </div> -->
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
    this.role = this.$store.getters["auth/role"];
    const id = this.$route.params.requisition_id;
    axios
      .get(`${api}/transport/pending/grant/${id}`, config)
      .then((res) => {
        console.log(res.data.data[0]);
        this.loading = false;
        this.name = res.data.data[0].teacher_name;
        this.phone = res.data.data[0].phone;
        this.users_name = res.data.data[0].teacher_name;
        this.users_phone = res.data.data[0].phone;
        this.designation =
          res.data.data[0].designation + ", " + res.data.data[0].department;
        this.start_time = res.data.data[0].start_time;
        this.end_time = res.data.data[0].end_time;
        this.destination = res.data.data[0].destination;
        this.reason = res.data.data[0].reason_for_vehicle;
        this.need = res.data.data[0].need;
        this.drivers_name = res.data.data[0].driver_name;
        this.drivers_phone = res.data.data[0].driver_phone;
        this.vehicle_no = res.data.data[0].vehicle_no;

        var xdate = new Date(res.data.data[0].selected_date);
        //console.log(xdate.toLocaleString());
        this.dateX = res.data.data[0].selected_date;
        this.date = xdate.toLocaleString().split(",")[0];
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data: () => ({
    role: null,
    loading: true,
    progress: false,
    offset: true,
    selectedDriver: "",
    name: "",
    phone: "",
    designation: "",
    users_name: "",
    users_phone: "",
    date: "",
    dateX: "",
    start_time: "",
    end_time: "",
    destination: "",
    reason: "",
    drivers_name: "",
    drivers_phone: "",
    vehicle_no: "",
    need: null,
    grant: false,
  }),
};
</script>
<style scoped>
.teacher-holder {
  margin-top: 65px;
  display: flex;
  justify-content: space-between;
}
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
.holder {
  margin-top: 65px;
  margin-bottom: 125px;
}
p {
  font-size: 18px;
  margin-bottom: 25px;
}
</style>
