<template>
  <div style="margin-bottom: 20px">
    <v-expand-transition>
      <div v-if="loading">
        <v-progress-linear indeterminate color="teal"></v-progress-linear>
        <br />
      </div>
    </v-expand-transition>
    <teacher-nav :username="username" :user_photo="user_photo">
      <template>
        <v-toolbar-title>See History</v-toolbar-title>
      </template>
    </teacher-nav>

    <div v-if="!empty">
      <v-card
        v-for="requisition in requisitions"
        :key="requisition.requisition_id"
        class="mt-12 sm:ml-12"
        max-width="1000"
        outlined
      >
        <v-card-text class="ml-2">
          <div class="text-flex">
            <div class="mb-2">{{ requisition.created_at }}</div>
            <div style="margin-right: 25px">
              Requisition ID #{{ requisition.requisition_id }}
            </div>
          </div>

          <p class="text-h5 text--primary">You Have Submitted a Requisition</p>
          <p class="text--primary mb-0">
            Date: {{ requisition.selected_date }} ~
            {{ requisition.start_time }} -
            {{ requisition.end_time }}
          </p>
          <p class="text--primary mb-0">
            Destination: {{ requisition.destination }}
          </p>
        </v-card-text>
        <v-card-actions
          class="mb-2 ml-2 flex md:flex-row flex-col-reverse gap-3 justify-start items-start"
        >
          <v-btn
            :class="cancelClass(requisition.status)"
            outlined
            color="red darken-1"
            @click="openDialog(requisition.requisition_id)"
          >
            Cancel</v-btn
          >
          <div class="flex md:flex-row gap-3">
            <div v-if="requisition.status === 'granted'">
              <div class="status-granted">Status: {{ requisition.status }}</div>
            </div>

            <div
              v-else-if="requisition.status === 'pending'"
              class="status-pending"
            >
              Status: {{ requisition.status }}
            </div>
            <div
              v-else-if="requisition.status === 'rejected'"
              class="status-rejected"
            >
              Status: {{ requisition.status }}
            </div>
            <div
              v-else-if="requisition.status === 'completed'"
              class="status-completed"
            >
              Status: {{ requisition.status }}
            </div>
            <router-link
              v-if="requisition.status === 'pending'"
              class="details"
              :to="'/transport-home/' + requisition.requisition_id"
            >
              <v-btn outlined color="indigo" class="details">See Details</v-btn>
            </router-link>

            <router-link
              v-if="requisition.status === 'granted'"
              class="details"
              :to="'/transport-home/granted/' + requisition.requisition_id"
            >
              <v-btn outlined color="indigo" class="details">See Details</v-btn>
            </router-link>
            <router-link
              v-if="requisition.status === 'rejected'"
              class="details"
              :to="'/transport-home/rejected/' + requisition.requisition_id"
            >
              <v-btn outlined color="indigo" class="details">See Details</v-btn>
            </router-link>
            <router-link
              v-if="requisition.status === 'completed'"
              class="details"
              :to="'/transport-home/granted/' + requisition.requisition_id"
            >
              <v-btn outlined color="indigo" class="details">See Details</v-btn>
            </router-link>
          </div>
        </v-card-actions>
      </v-card>
    </div>

    <div v-if="empty">
      <div class="divv">
        <img
          class="image-schedule"
          src="../../../public/assets/Raining-bro.png"
          alt="pickup.png"
        />
        <h2 class="divv-h1">
          Nothing in your History right now! Start by submitting a Requisition
          Form !!!
        </h2>
      </div>
    </div>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="400">
        <v-card>
          <v-card-title class="text-h5">
            Are you sure you want to cancel this requisition?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="red darken-1" text @click="dialog = false">
              NO
            </v-btn>
            <v-btn outlined color="green darken-2" text @click="cancel()">
              YES
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import api from "@/api";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import TeacherNav from "./TeacherNav.vue";
export default {
  created() {
    const config = {
      headers: { Authorization: `Bearer ${this.$store.getters["auth/token"]}` },
    };
    const user = {
      username: this.$store.getters["auth/user"],
      role: this.$store.getters["auth/role"],
    };

    axios
      .post(`${api}/users/me`, user, config)
      .then((res) => {
        if (res.data.data[0].user_photo != null)
          this.user_photo = res.data.data[0].user_photo;

        if (this.user_photo === "user.png") {
          this.user_photo = null;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    this.username = this.$store.getters["auth/user"];
    axios
      .get(`${api}/teachers/history`, config)
      .then((res) => {
        this.loading = false;
        console.log(res);
        this.requisitions = res.data.data;
        if (res.data.total === 0) {
          this.empty = true;
        } else {
          this.empty = false;
        }

        TimeAgo.addDefaultLocale(en);

        this.requisitions.forEach((requisition) => {
          const timeAgo = new TimeAgo("en-US");
          let date = timeAgo.format(Date.parse(requisition.created_at));
          requisition.created_at = date;

          var xdate = new Date(requisition.selected_date);
          console.log(xdate.toLocaleString());

          requisition.selected_date = xdate.toLocaleString().split(",")[0];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      requisitions: [],
      requisition_to_be_deleted: null,
      loading: true,
      username: "",
      dialog: false,
      empty: false,
      user_photo: null,
    };
  },
  methods: {
    cancel() {
      const config = {
        headers: {
          Authorization: `Bearer ${this.$store.getters["auth/token"]}`,
        },
      };
      this.dialog = false;
      this.loading = true;
      console.log(this.requisition_to_be_deleted);
      axios
        .delete(
          `${api}/teachers/cancel/${this.requisition_to_be_deleted}`,
          config
        )
        .then((res) => {
          console.log(res);
          this.loading = false;
          this.requisition_to_be_deleted = null;
          window.scrollTo(0, 0);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openDialog(id) {
      this.dialog = true;
      this.requisition_to_be_deleted = id;
      console.log(id);
    },
    cancelClass(x) {
      if (x === "rejected" || x === "completed") {
        return "cancel";
      } else {
        return "";
      }
    },
  },
  computed: {},
  components: {
    TeacherNav,
  },
};
</script>
<style scoped>
a {
  text-decoration: none;
}
.text-flex {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.status-granted {
  width: fit-content;
  border: 1px solid;
  padding: 5px 15px;
  color: #66bb6a;
  border-radius: 20px;
  background: #4caf500f;
}
.cancel {
  display: none;
}
.status-pending {
  border: 1px solid;
  padding: 5px 15px;
  color: #706b6b;
  border-radius: 20px;
  background: #eeeeeead;
}
.status-rejected {
  border: 1px solid;
  padding: 5px 15px;
  color: red;
  border-radius: 20px;
  background: #ff525212;
}
.status-completed {
  border: 1px solid;
  padding: 5px 15px;
  color: #3f51b5;
  border-radius: 20px;
  background: #1976d212;
}
.details {
  margin-left: auto;
  margin-right: 12px;
}
.image-schedule {
  max-width: 500px;
}
.divv {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.divv-h1 {
  color: #258685;
}
</style>
