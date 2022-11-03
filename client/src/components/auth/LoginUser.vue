<template>
  <form action="sumbit" @submit.prevent="loginUser">
    <h2 v-if="role === 'teacher'">Login as a teacher</h2>
    <h2 v-if="role === 'transport'">Login as a Transport Official</h2>
    <h2 v-if="role === 'driver'">Login as a Driver</h2>
    <input type="text" placeholder="username" v-model="user.username" />
    <input type="password" placeholder="password" v-model="user.password" />
    <div class="">
      <h2>Specify a Role</h2>
      <div>
        <input
          id="teacher"
          name="role"
          type="radio"
          value="teacher"
          v-model="role"
        />
        <label for="teacher">Teacher/Official</label>
      </div>
      <div>
        <input
          id="transport"
          name="role"
          type="radio"
          value="transport"
          v-model="role"
        />
        <label for="transport">Transport Section</label>
      </div>
      <div>
        <input
          id="driver"
          name="role"
          type="radio"
          value="driver"
          v-model="role"
        />
        <label for="driver">Driver</label>
      </div>
    </div>
    <button>SUBMIT</button>
  </form>
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
