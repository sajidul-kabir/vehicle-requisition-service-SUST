<template>
  <div>
    <TeacherNav></TeacherNav>

    <!-- <div class="form-header">
      <img
        src="../assets/Shahjalal_University_of_Science_and_Technology_logo.png"
        width="45px"
        alt="sust_logo.png"
      />
      <h1>Vehicle Requisition Form</h1>
    </div> -->
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Teacher's Name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              label="Phone"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="designation"
              label="Designation & Department"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="users_name"
              :rules="nameRules"
              label="User's Name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="users_phone"
              :rules="phoneRules"
              label="User's Phone"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="my-2 px-1" cols="12" sm="6">
            <v-date-picker
              v-if="openCal"
              elevation="15"
              v-model="date"
              @dblclick:date="chooseDate"
            ></v-date-picker>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="date"
              label="Select Date"
              append-icon="mdi-calendar"
              @click:append="openCalendar"
              required
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field label="Select Time" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import TeacherNav from "./TeacherNav.vue";
export default {
  name: "TeacherHome",
  data: () => ({
    valid: false,
    name: "Dr. Ahsan Habib",
    phone: "017xxxxxxxx",
    designation: "Assistant Professor, SWE",
    users_name: "",
    users_phone: "",
    nameRules: [(v) => !!v || "Name is required"],
    date: "",
    openCal: false,
    phoneRules: [
      (v) => !!v || "Phone is required",
      (v) => v.length === 11 || "Phone number must be less than 11 characters",
    ],
  }),
  methods: {
    openCalendar() {
      this.openCal = true;
    },
    chooseDate() {
      console.log(this.date);
      this.openCal = false;
    },
  },
  components: { TeacherNav },
};
</script>

<style scoped>
.form-header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-calendar {
}
</style>
