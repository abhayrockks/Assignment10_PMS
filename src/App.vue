<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "app",

  computed: {
    ...mapGetters(["logginUser"]),
  },
  mounted() {
    if (this.logginUser == "Guest") {
      this.$router.push("/profile");
    } else if (this.logginUser == "Admin") {
      this.$router.push("/poll");
    }
  },
};
</script>