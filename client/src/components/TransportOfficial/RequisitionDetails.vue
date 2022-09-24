<template>
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
      <p><strong>Teacher's Name:</strong> Dr. Ahsan Habib</p>
      <p><strong>Phone:</strong> 017xxxxxxxx</p>
    </div>
    <p class="form-newLine">
      <strong>Designation & Department:</strong> Assistant Professor, SWE
    </p>
    <div class="form-row">
      <p><strong>User's Name:</strong> Dr. Ahsan Habib</p>
      <p><strong>User's Phone:</strong> 017xxxxxxxx</p>
    </div>
    <p class="form-newLine"><strong>Date:</strong> 25/09/2022</p>
    <div class="form-row">
      <p><strong>Start Time:</strong> 8:00</p>
      <p><strong>End Time:</strong> 11:00</p>
    </div>
    <p class="form-newLine"><strong>Destination:</strong> Ambarkhana</p>
    <p class="form-newLine">
      Vehicle is needed for <strong>Official purpose</strong>
    </p>
    <p class="form-newLine">
      <strong>Reason for Vehicle:</strong> Official Meeting
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
      <v-btn outlined color="green darken-1" class="ml-auto" :disabled="!grant">
        Grant</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedDriver: "",
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
