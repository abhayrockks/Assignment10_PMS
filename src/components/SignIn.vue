<template>
  <div id="submitForm">
    <section>
      <b-field label="Username">
        <b-input required v-model="username" maxlength="30"></b-input>
      </b-field>

      <b-field label="Password">
        <b-input type="password" v-model="password" password-reveal></b-input>
      </b-field>
      <button @click="loginClick" :class="{ 'button': true, 'is-full' : true,}">Login</button>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SignIn",

  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    async loginClick() {
      if (this.username == "" || this.password == "") {
        return alert("Field can't be empty");
      }
      await this.login({
        user: this.$route.name,
        username: this.username,
        password: this.password,
      });

      if (this.user_exist !== "" && this.logginUser === "Admin") {
        this.$router.push("poll");
      } else if (this.user_exist !== "" && this.logginUser === "Guest") {
        this.$router.push("profile");
      } else if (this.user_exist === 1) {
        alert("User not Exist");
      } else {
        alert(this.api_error);
      }
    },
  },

  computed: {
    ...mapGetters({
      api_error: "api_error",
      logginUser: "logginUser",
      user_exist: "user_exist",
    }),

    login_progress() {
      return this.$store.state.login.login_progress;
    },
  },
};
</script>

<style>
</style>