<template>
  <div>
    <v-navigation-drawer v-model="drawer" app left>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar v-if="user_photo">
            <img :src="`${path}${user_photo}`" alt="photo.png" />
          </v-list-item-avatar>
          <v-list-item-avatar v-else
            ><div class="no-photo">{{ initial }}</div>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ username }}</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="teal"
      dark
      shrink-on-scroll
      src="../../assets/sust-photo.png"
      fade-img-on-scroll
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <!-- <v-toolbar-title>Welcome to Vehicle Requisition Service</v-toolbar-title> -->
      <slot></slot>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: ["username", "user_photo"],
  created() {
    this.initial = this.$store.getters["auth/user"][0].toUpperCase();
    if (window.outerWidth < 1200) {
      this.drawer = false
    }
  },
  data: () => ({
    drawer: true,
    path: "http://localhost:5000/",
    initial: "",
    items: [
      {
        title: "Requisition List",
        icon: "mdi-clipboard-list-outline",
        to: "/transport-home",
      },
      {
        title: "Drivers' Schedule",
        icon: "mdi-book-clock-outline",
        to: "/transport-schedule",
      },
      {
        title: "Granted Requisitons",
        icon: "mdi-check-circle-outline",
        to: "/granted-requisitions",
      },
      {
        title: "Rejected Requistions",
        icon: "mdi-close-circle-outline",
        to: "rejected-requisitions",
      },
      {
        title: "Running Requistions",
        icon: "mdi-run-fast",
        to: "running-requisitions",
      },

      { title: "My Account", icon: "mdi-account", to: "transport-account" },
    ],
  }),
};
</script>
<style scoped>
.no-photo {
  background-color: teal;
  color: white;
  width: 100%;
  height: 100%;
  font-size: 25px;
  padding-top: 4px;
}
</style>
