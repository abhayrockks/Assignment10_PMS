<template>
  <div>
    <nav class="navbar is-warning" role="navigation" aria-label="main navigation">
      <div class="navbar-item">
        <a>
          <router-link to="/">Home</router-link>
        </a>
        <p v-if="isLoggedIn">{{isLoggedIn}}</p>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <a
              v-if="createpollbutton && isLoggedIn"
              @click="showModal = true"
              class="button is-white"
            >Create</a>
            <a v-if="adminbuttonshow && !isLoggedIn" @click="admin" class="button is-white">Admin</a>
            <a v-if="loginbuttonshow && !isLoggedIn" @click="login" class="button is-white">Login</a>
            <a v-if="isLoggedIn" @click="logout" class="button is-white">Logout</a>
          </div>
        </div>
      </div>
    </nav>
    <NewPollForm v-if="showModal" @close="showModal = false" />
  </div>
</template>

<script>
import NewPollForm from "./NewPollForm.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Header",
  components: {
    NewPollForm,
  },
  data() {
    return {
      adminbuttonshow: true,
      loginbuttonshow: true,
      createpollbutton: false,
      showModal: false,
    };
  },

  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn",
      logginUser: "logginUser",
    }),
  },
  methods: {
    ...mapActions({
      dologout: "logout",
    }),
    login() {
      if (this.$route.name !== "Login") {
        this.$router.push("login");
      }
    },
    logout() {
      this.dologout();
      this.loginbuttonshow = true;
      this.adminbuttonshow = true;
      this.createpollbutton = false;
      this.$router.push("/");
    },
    admin() {
      if (this.$route.name !== "Admin") {
        this.createpollbutton = true;
        this.$router.push("admin");
      }
    },
  },
  mounted() {
    if (this.$route.name === "Admin") {
      this.loginbuttonshow = false;
    } else if (this.$route.name === "Login") {
      this.adminbuttonshow = false;
    }
    if (this.logginUser === "Admin") {
      this.createpollbutton = true;
    }
  },
};
</script>

<style>
a {
  margin-right: 10px;
}
#cancel {
  margin-left: 10px;
}
</style>