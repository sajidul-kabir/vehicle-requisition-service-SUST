<template>
  <div style="margin-bottom: 20px">
    <driver-nav>
      <template>
        <v-toolbar-title>My Schedule</v-toolbar-title>
      </template>
    </driver-nav>
  </div>
</template>
<script>
import DriverNav from "./DriverNav.vue";

export default {
  data: () => ({
    show: false,
  }),
  components: {
    DriverNav,
  },
};
</script>
