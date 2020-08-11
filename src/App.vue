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
    ...mapGetters(["logginpage"]),
  },
  mounted() {
    if (this.logginuser == "Login") {
      this.$router.push("/profile");
    } else if (this.logginuser == "Admin") {
      this.$router.push("/poll");
    }
  },
};
</script>