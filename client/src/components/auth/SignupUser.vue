<template>
  <div class="bg-slate-100 min-h-screen h-fit p-4 flex flex-col gap-3 justify-center items-center w-screen">
    <div class=" inline-flex items-center gap-3">
      <img src="../../assets/Shahjalal_University_of_Science_and_Technology_logo.png" width="45px" height="50px"
        alt="sust_logo.png" />
      <h1 class="text-xl h-50">Vehicle Requisition Service</h1>
    </div>
    <form
      class="bg-white w-fit h-fit p-10 rounded-2xl"
      action="sumbit"
      @submit.prevent="SignUpUser"
    >
      <div class="inline-flex items-center gap-4 pb-12">
        <h2 class="font-bold text-2xl" v-if="role === 'teacher'">
          Signup as a Teacher
        </h2>
        <h2 v-if="role === 'transport'">Signip as a Transport Official</h2>
        <h2 v-if="role === 'driver'">Signup as a Driver</h2>
      </div>

      <!-- <div v-if="role === 'teacher'">
        <p>sd</p>
      </div> -->
      <div>
        <div v-if="wrongUser">
          <img class="invalidImg" src="/assets/invalid.png" alt="" />
          <p class="invalid">Invalid Username</p>
        </div>

        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="fullname"
          >
            Fullname
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-teal-100 focus:outline-1 focus:shadow-outline"
            id="fullname"
            v-model="fullname"
            type="text"
            placeholder="Fullname"
            required="true"
          />
          <div class="mb-4">
            <label :style="{ color: wrongUser ? 'red' : '' }" class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>

            <input :style="[
                        { borderBottom: wrongUser ? '1px solid red' : '' },
                        { color: wrongUser ? 'red' : '' },
                      ]"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-teal-100 focus:outline-1 focus:shadow-outline"
              id="username" v-model="username" type="text" placeholder="Username" required="true" @blur="validateUser" />
          </div>
          <div class="mb-6" v-if="role === 'teacher' || role === 'transport'">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email
            </label>
            <input
              v-if="role === 'teacher'"
              class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-teal-100 focus:outline-1 focus:shadow-outline"
              id="email"
              v-model="teacherUser.email"
              type="email"
              placeholder="Email"
              required="true"
            />
            <input
              v-if="role === 'transport'"
              class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-teal-100 focus:outline-1 focus:shadow-outline"
              id="email"
              v-model="transportUser.email"
              type="email"
              placeholder="Email"
              required="true"
            />
            <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
          </div>
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="phone"
            >
              Phone
            </label>
            <input
              class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-teal-100 focus:outline-1 focus:shadow-outline"
              id="phone"
              v-model="phone"
              type="text"
              placeholder="Phone"
              required="true"
            />
            <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
          </div>
        </div>
        <div class="mb-6" v-if="role === 'teacher'">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="department"
          >
            Department
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-teal-100 focus:outline-1 focus:shadow-outline"
            id="department"
            v-model="teacherUser.department"
            type="text"
            placeholder="Department"
            required="true"
          />
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="mb-6" v-if="role === 'teacher'">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="designation"
          >
            Designation
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-teal-100 focus:outline-1 focus:shadow-outline"
            id="designation"
            v-model="teacherUser.designation"
            type="text"
            placeholder="Designation"
            required="true"
          />
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>
        <div class="mb-6" v-if="role === 'driver'">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="vehicle_no"
          >
            Vehicle Plate Number
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-teal-100 focus:outline-1 focus:shadow-outline"
            id="vehicle_no"
            v-model="driverUser.vehicle_no"
            type="text"
            placeholder="vehicle plate no."
            required="true"
          />
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>

        <div class="mb-6" v-if="role === 'driver'">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="vehicle_model"
          >
            Vehicle Model
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-teal-100 focus:outline-1 focus:shadow-outline"
            id="vehicle_model"
            v-model="driverUser.vehicle_model"
            type="text"
            placeholder="vehicle model"
          />
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>

        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-teal-100 focus:outline-1 focus:shadow-outline"
            id="password"
            v-model="password"
            type="password"
            placeholder="*******"
            required="true"
          />
          <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
        </div>
      </div>

      <div class="pb-5 flex flex-col gap-2">
        <h4>Specify a Role</h4>
        <div class="flex flex-row flex-wrap gap-4">
          <div class="flex flex-row items-center gap-1">
            <input
              class="accent-teal-600"
              id="teacher"
              name="role"
              type="radio"
              value="teacher"
              v-model="role"
            />
            <label for="teacher">Teacher/Official</label><br />
          </div>
          <div class="flex flex-row items-center gap-1">
            <input
              class="accent-teal-600"
              id="transport"
              name="role"
              type="radio"
              value="transport"
              v-model="role"
            />
            <label for="transport">Transport Section</label><br />
          </div>
          <div class="flex flex-row items-center gap-1">
            <input
              class="accent-teal-600"
              id="driver"
              name="role"
              type="radio"
              value="driver"
              v-model="role"
            />
            <label for="transport">Driver</label><br />
          </div>
        </div>
      </div>
      <button
        class="group relative inline-block text-sm font-medium text-green-600 focus:outline-none focus:ring active:text-green-500"
      >
        <span
          class="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-green-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span class="relative block border border-current bg-white px-5 py-2">
          Register
        </span>
      </button>
      <p class="mt-7">
        Already have an account ?
        <router-link to="/login">Login</router-link> Here
      </p>
    </form>
  </div>
</template>

<script>
//mport axios from "axios";
//import api from "../../api";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      fullname: "",
      phone: "",
      password: "",
      teacherUser: {
        department: "",
        designation: "",
        email: "",
      },
      transportUser: {
        email: "",
      },
      driverUser: {
        vehicle_no: "",
        vehicle_model: "",
      },
      wrongPass: false,
      wrongUser: false,
      role: "teacher",
    };
  },
  methods: {
    ...mapActions({
      signUp: "auth/signUp",
    }),
    validatePass() {
      this.wrongPass = false;
    },
    validateUser() {
      this.wrongUser = false;
    },
    SignUpUser() {
      let myObj = {};
      if (this.role === "teacher") {
        this.teacherUser.username = this.username;
        this.teacherUser.fullname = this.fullname;
        this.teacherUser.phone = this.phone;
        this.teacherUser.password = this.password;
        this.teacherUser.role = this.role;
        myObj = this.teacherUser;
      } else if (this.role === "transport") {
        this.transportUser.username = this.username;
        this.transportUser.fullname = this.fullname;
        this.transportUser.phone = this.phone;
        this.transportUser.password = this.password;
        this.transportUser.role = this.role;
        myObj = this.transportUser;
      } else {
        this.driverUser.username = this.username;
        this.driverUser.fullname = this.fullname;
        this.driverUser.phone = this.phone;
        this.driverUser.password = this.password;
        this.driverUser.role = this.role;
        myObj = this.driverUser;
      }

      console.log(myObj);
      this.signUp(myObj)
        .then(() => {
          if (this.role === "teacher") {
            this.$router.push("/teacher-home");
          } else if (this.role === "transport") {
            this.$router.push("/transport-home");
          }
          if (this.role === "driver") {
            this.$router.push("/driver-home");
          }
        })
        .catch((err) => {
          console.log(err);
          this.wrongUser = true;
        });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  font-weight: bold;
  color: #1b9797 !important;
}

.invalid {
  margin: 0;
  color: red;
  position: relative;
  top: -36px;
  font-size: 12px;
  left: 20px;
}
.invalidImg {
  width: 13px;
  position: relative;
  bottom: 15px;
}
.register {
  margin-top: 50px;
  margin-bottom: 0px;
}
</style>
