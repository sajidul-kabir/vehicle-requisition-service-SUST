<template>
  <div>
    <TeacherNav></TeacherNav>

    <v-form v-model="valid">
      <v-container class="form-container">
        <div>
          <v-row class="form-row--title">
            <div class="form-header">
              <img
                src="../assets/Shahjalal_University_of_Science_and_Technology_logo.png"
                width="45px"
                alt="sust_logo.png"
              />
              <h1>Vehicle Requisition Form</h1>
            </div>
          </v-row>
          <div class="divide"></div>
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
            <v-col cols="12" md="6">
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
            <v-col cols="12" sm="6" md="6">
              <v-menu
                ref="menug"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Select Date"
                    append-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menug.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="5" md="4">
              <v-menu
                ref="menu"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="start_time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="start_time"
                    label="Start Time"
                    append-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="start_time"
                  full-width
                  :allowed-hours="allowedHoursStartTime"
                  @click:minute="$refs.menu.save(start_time)"
                ></v-time-picker>
              </v-menu>
            </v-col>

            <v-col cols="12" sm="5" md="4">
              <v-menu
                ref="menux"
                v-model="menu3"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="end_time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :disabled="start_time === ''"
                    v-model="end_time"
                    label="End Time"
                    append-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu3"
                  v-model="end_time"
                  full-width
                  :allowed-hours="allowedHoursEndTime(start_time)"
                  @click:minute="$refs.menux.save(end_time)"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <p class="form-warning">
            [ Vehicle must not be kept for more than 3 hours ]
          </p>
          <v-row class="form-destination">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="destination"
                label="Destination"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-radio-group row>
            <v-radio label="Personal need" value="radio-1"></v-radio>
            <v-radio
              class="form-radio"
              label="Official need"
              value="radio-2"
            ></v-radio>
          </v-radio-group>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="reason"
                label="Purpose of the requisiton"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <div class="my-2 mt-6">
            <v-btn color="teal lighten-1" dark x-large> Submit </v-btn>
          </div>
        </div>
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
    users_name: "Dr. Ahsan Habib",
    users_phone: "017xxxxxxxx",
    nameRules: [(v) => !!v || "Name is required"],
    date: "",
    start_time: "",
    end_time: "",
    destination: "",
    reason: "",

    menu: false,
    modal: false,
    modal2: false,
    menu2: false,
    menu3: false,
    modal3: false,
    phoneRules: [
      (v) => !!v || "Phone is required",
      (v) => v.length === 11 || "Phone number must be less than 11 characters",
    ],
  }),
  methods: {
    allowedHoursStartTime(v) {
      if (v >= 8 && v <= 20) {
        return v;
      }
    },
    allowedHoursEndTime(start_time) {
      let num;
      if (start_time[0] === "0") {
        num = start_time[1];
      } else {
        num = start_time[0] + start_time[1];
      }
      num = parseInt(num);
      return [num + 1, num + 2, num + 3];
    },
  },
  components: { TeacherNav },
};
</script>

<style scoped>
.form-container {
  margin-top: 50px;
  margin-left: 200px;
}
.form-row--title {
  margin-bottom: 35px;
}

.form-row--title h1 {
  margin-left: 75px;
}
.form-header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.divide {
  width: 700px;
  height: 1px;
  border-bottom: 1px groove;
  margin-bottom: 65px;
}
.form-warning {
  margin: 0;
  font-weight: 500;
}
.form-destination {
  margin-top: 10px;
}
.form-radio {
  margin-left: 155px;
}
</style>
