<template>
  <div>
    <v-navigation-drawer v-model="drawer" app left>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img
              src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Abul Kalam</v-list-item-title>
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
  data: () => ({
    drawer: false,
    items: [
      {
        title: "Requisition List",
        icon: "mdi-clipboard-list-outline",
        to: "/transport-home",
      },
      {
        title: "Drivers' Schedule",
        icon: "mdi-book-clock-outline",
        to: "/schedule",
      },
      {
        title: "Granted Requisitons",
        icon: "mdi-check-circle-outline",
        to: "/history",
      },
      { title: "Rejected Requistions", icon: "mdi-close-circle-outline" },
      { title: "My Account", icon: "mdi-account" },
    ],
  }),
};
</script>
