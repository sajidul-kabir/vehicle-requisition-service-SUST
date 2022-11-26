<template>
  <div>
    <div>
      <v-expand-transition>
        <div v-if="loading">
          <v-progress-linear indeterminate color="teal"></v-progress-linear>
          <br />
        </div>
      </v-expand-transition>
      <TeacherNav :username="username" :user_photo="user_photo">
        <template>
          <v-toolbar-title
            >Welcome to Vehicle Requisition Service</v-toolbar-title
          >
        </template>
      </TeacherNav>

      <v-form v-model="valid">
        <v-container class="form-container">
          <div>
            <v-row class="form-row--title">
              <div class="form-header">
                <img
                  src="../../assets/Shahjalal_University_of_Science_and_Technology_logo.png"
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
                  <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                    :min="getCurrDate()"
                  >
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

            <v-radio-group row v-model="need">
              <v-radio label="Personal need" value="personal"></v-radio>
              <v-radio
                class="form-radio"
                label="Official need"
                value="official"
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
              <v-btn
                style="margin-bottom: 35px"
                color="teal lighten-1"
                :dark="check"
                :x-large="check"
                @click="openDialog"
                :disabled="!check"
              >
                Submit
              </v-btn>
            </div>
            <v-row justify="center">
              <v-dialog v-model="dialog" persistent max-width="400">
                <v-card>
                  <v-card-title class="text-h5">
                    Are you sure you want to submit this requisition?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      outlined
                      color="red darken-1"
                      text
                      @click="dialog = false"
                    >
                      NO
                    </v-btn>
                    <v-btn outlined color="green darken-2" text @click="submit">
                      YES
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </div>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/api";
import TeacherNav from "./TeacherNav.vue";
export default {
  created() {
    const user = {
      username: this.$store.getters["auth/user"],
      role: this.$store.getters["auth/role"],
    };
    const config = {
      headers: { Authorization: `Bearer ${this.$store.getters["auth/token"]}` },
    };
    //console.log(user);
    axios
      .post(`${api}/users/me`, user, config)
      .then((res) => {
        this.loading = false;

        //console.log(res.data.data);
        this.name = res.data.data[0].fullname;
        this.username = res.data.data[0].username;
        this.phone = res.data.data[0].phone;
        this.users_name = res.data.data[0].fullname;
        this.users_phone = res.data.data[0].phone;
        this.designation =
          res.data.data[0].designation + ", " + res.data.data[0].department;
        if (res.data.data[0].user_photo != null)
          this.user_photo = res.data.data[0].user_photo;

        if (this.user_photo === "user.png") {
          this.user_photo = null;
        }
        console.log(this.user_photo);
        console.log(this.username);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  name: "TeacherHome",
  data: () => ({
    username: "",
    user_photo: null,
    valid: false,
    name: "",
    phone: "",
    designation: "",
    users_name: "",
    users_phone: "",
    nameRules: [(v) => !!v || "Name is required"],
    dateRules: [(v) => !!v || "Date is required"],
    timeRules: [(v) => !!v || "time is required"],
    emptyRules: [(v) => !!v || "this field must not be empty"],
    date: "",
    start_time: "",
    end_time: "",
    destination: "",
    reason: "",
    need: null,

    submitted: false,
    loading: true,
    menu: false,
    modal: false,
    modal2: false,
    menu2: false,
    menu3: false,
    modal3: false,
    dialog: false,
    phoneRules: [
      (v) => !!v || "Phone is required",
      (v) => v.length === 11 || "Phone number must be 11 characters",
    ],
  }),
  methods: {
    allowedHoursStartTime(v) {
      if (v >= 8 && v <= 17) {
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
    openDialog() {
      this.dialog = true;
    },
    getCurrDate() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      today = yyyy + "-" + mm + "-" + dd;
      return today;
    },
    submit() {
      this.loading = true;
      this.submitted = true;
      this.dialog = false;
      // console.log(this.date, this.start_time, this.end_time, this.need);
      this.$toast.open({
        message: "Successfully Submitted",
        type: "success",
        duration: 3000,
        position: "top",
        dismissible: true,
      });
      const config = {
        headers: {
          Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
        },
      };
      const teacherObj = {
        start_time: this.start_time,
        end_time: this.end_time,
        selected_date: this.date,
        destination: this.destination,
        need: this.need,
        reason_for_vehicle: this.reason,
      };

      axios
        .post(`${api}/teachers`, teacherObj, config)
        .then(() => {
          this.loading = false;
          (this.date = ""),
            (this.start_time = ""),
            (this.end_time = ""),
            (this.destination = ""),
            (this.reason = ""),
            (this.need = null),
            window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    check() {
      if (
        this.name &&
        this.phone &&
        this.designation &&
        this.date &&
        this.start_time &&
        this.end_time &&
        this.destination &&
        this.reason &&
        this.need
      )
        return true;
      else return false;
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
