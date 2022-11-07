<template>
<div class=" bg-slate-100 h-screen flex justify-center items-center w-screen">
    <form class="bg-white w-fit p-10 rounded-2xl" action="sumbit" @submit.prevent="loginUser">
      <h2 class="font-bold text-2xl" v-if="role === 'teacher'">Login as a Teacher</h2>
      <h2 v-if="role === 'transport'">Login as a Transport Official</h2>
      <h2 v-if="role === 'driver'">Login as a Driver</h2>
      <div class=" justify-start  flex flex-col gap-3 py-5">
        <div>
            <label for="username" class="block text-xs font-medium text-gray-700">
              Username
            </label>
            
            <input type="text" v-model="user.username" placeholder="john@rhcp.com"
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
        </div>
        
        <div>
          <label for="password" class="block text-xs font-medium text-gray-700">
            Password
          </label>
        
          <input type="password" v-model="user.password" placeholder="Type your password"
            class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm" />
        </div>
      </div>
      <div class="pb-5 flex flex-col gap-2">
        <h2 >Specify a Role</h2>
        <div class="flex flex-row flex-wrap gap-8">
            <div class="flex items-center mr-4">
              <input id="teacher" name="role" type="radio" value="teacher" v-model="role"
                class="w-4 h-4 text-green-600 bg-gray-100 border-gray-700 ring-gray-800 focus:ring-green-500 focus:ring-2">
              <label for="teacher" class="ml-2 text-sm font-medium dark:text-gray-900">Teacher/Official</label>
            </div>
            <div class="flex items-center mr-4">
              <input id="transport" name="role" type="radio" value="transport" v-model="role" 
                class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2">
              <label  for="transport" class="ml-2 text-sm font-medium text-gray-900 ">Transport Section</label>
            </div>

            <div class="flex items-center mr-4">
              <input id="driver" name="role" type="radio" value="driver" v-model="role" 
                class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2">
              <label for="transport" class="ml-2 text-sm font-medium text-gray-900 ">Driver</label>
            </div>
          
        </div>
      </div>
      <button class="group relative inline-block text-sm font-medium text-green-600 focus:outline-none focus:ring active:text-green-500">
        <span
          class="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-green-600 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>
      
        <span class="relative block border border-current bg-white px-5 py-2">
          Login
        </span>
      </button>
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
      role: "teacher",
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/signIn",
    }),
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
