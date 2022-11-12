<template>
  <div class="bg-slate-100 min-h-screen h-fit flex justify-center items-center w-screen">
    <form
      class="bg-white w-fit p-10 rounded-2xl"
      action="sumbit"
      @submit.prevent="loginUser"
    >
      <div class="inline-flex items-center gap-4 pb-12">
        <img
          src="../../assets/Shahjalal_University_of_Science_and_Technology_logo.png"
          width="45px"
          alt="sust_logo.png"
        />
        <h2 class="font-bold text-2xl" v-if="role === 'teacher'">
          Login as a Teacher
        </h2>
        <h2 v-if="role === 'transport'">Login as a Transport Official</h2>
        <h2 v-if="role === 'driver'">Login as a Driver</h2>
      </div>
      <div class="mb-4">
        <label
          :style="{ color: wrongUser ? 'red' : '' }"
          class="block text-gray-700 text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <!-- <input
          :style="[
            { borderBottom: wrongUser ? '1px solid red' : '' },
            { color: wrongUser ? 'red' : '' },
          ]"
          type="text"
          name=""
          required=""
          v-model="user.username"
          @blur="validateUser"
        />
        <label :style="{ color: wrongUser ? 'red' : '' }">Username</label>
        <div v-if="wrongUser">
          <img class="invalidImg" src="/assets/invalid.png" alt="" />
          <p class="invalid">Invalid Username</p>
        </div> -->
        <input
          :style="[
            { borderBottom: wrongUser ? '1px solid red' : '' },
            { color: wrongUser ? 'red' : '' },
          ]"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-teal-100 focus:outline-1 focus:shadow-outline"
          id="username"
          v-model="user.username"
          type="text"
          placeholder="Username"
          required="true"
          @blur="validateUser"
        />
      </div>
      <div v-if="wrongUser">
        <img class="invalidImg" src="/assets/invalid.png" alt="" />
        <p class="invalid">Invalid Username</p>
      </div>
      <div class="mb-6">
        <label
          :style="{ color: wrongPass ? 'red' : '' }"
          class="block text-gray-700 text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          :style="[
            { borderBottom: wrongPass ? '1px solid red' : '' },
            { color: wrongPass ? 'red' : '' },
          ]"
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-teal-100 focus:outline-1 focus:shadow-outline"
          id="password"
          v-model="user.password"
          type="password"
          placeholder="*******"
          required="true"
          @blur="validatePass"
        />
        <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
      </div>
      <div v-if="wrongPass">
        <img class="invalidImg" src="/assets/invalid.png" alt="" />
        <p class="invalid">Wrong Password</p>
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
          Login
        </span>
      </button>
      <p class="register">
        Don't have an account ?
        <router-link to="/signup">Register</router-link> Here
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
      user: {
        username: "",
        password: "",
      },
      wrongPass: false,
      wrongUser: false,
      role: "teacher",
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/signIn",
    }),
    validatePass() {
      this.wrongPass = false;
    },
    validateUser() {
      this.wrongUser = false;
    },
    loginUser() {
      this.user.role = this.role;
      this.signIn(this.user)
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
          console.log(err.response.data.message);
          if (err.response.data.message === "Invalid username") {
            this.wrongUser = true;
          }
          if (err.response.data.message === "Wrong Password") {
            this.wrongPass = true;
          }
        });

      // axios
      //   .post(`${api}/users/login`, this.user, {
      //     withCredentials: true,

      //   })
      //   .then((res) => {
      //     console.log(res);
      //     this.$store.commit("SET_TOKEN", res.data.accessToken);
      //     this.$store.commit("SET_USER", res.data.username);
      //     this.$store.commit("SET_ROLE", res.data.role);
      //     // //   this.$store.commit('change', this.user.username);
      //     // //   //this.$store.commit('changePhoto', this.user.username);
      //     if (this.role === "teacher") {
      //       this.$router.push("/teacher-home");
      //     } else if (this.role === "transport") {
      //       this.$router.push("/transport-home");
      //     } else if (this.role === "driver") {
      //       this.$router.push("/driver-home");
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err.response.data.message);
      //     //   if (err.response.data.message === 'Invalid username') {
      //     //     this.wrongUser = true;
      //     //   }
      //     //   if (err.response.data.message === 'Wrong Password') {
      //     //     this.wrongPass = true;
      //     //   }
      //   });
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
