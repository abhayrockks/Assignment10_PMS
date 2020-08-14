<template>
  <div>
    <form id="registration">
      <div class="form-group">
        <label>Username:</label>
        <input size="30" type="text" v-model="username" required />
      </div>
      <br />

      <div class="form-group">
        <label>Password:</label>
        <input size="30" type="password" v-model="password" required />
      </div>
      <br />

      <div class="form-group">
        <label>Confirm Password:</label>
        <input id="confirm_password" size="30" type="password" v-model="confirm_password" required />
      </div>
      <br />
      <div class="form-group">
        <b-dropdown id="dropdown" v-model="isPublic" aria-role="list">
          <p class="button is-primary" slot="trigger">
            <template v-if="!isPublic">
              <span>Select user</span>
            </template>
            <template v-if="isPublic == 'Guest'">
              <span>Guest</span>
            </template>
            <template v-if="isPublic == 'Admin'">
              <span>Admin</span>
            </template>
          </p>

          <b-dropdown-item value="Guest" aria-role="listitem">
            <h3>Guest</h3>
          </b-dropdown-item>

          <b-dropdown-item value="Admin" aria-role="listitem">
            <h3>Admin</h3>
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <br />
      <div class="form-group">
        <button @click="adduser" :class="{ 'button': true, 'is-full' : true,}">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      confirm_password: "",
      isPublic: "",
    };
  },

  methods: {
    ...mapActions(["register"]),
    async adduser() {
      if (this.password !== this.confirm_password) {
        return alert("Both Password should match");
      }
      if (this.isPublic == "") {
        return alert("Select a user");
      }
      await this.register({
        username: this.username,
        password: this.password,
        role: this.isPublic,
      });
      if (this.user_exist === 0) {
        this.refreshdetails();
        return alert("Successfully Registered");
      } else if (this.user_exist === 1) {
        this.refreshdetails();
        return alert("User already Exist");
      } else {
        return alert(this.api_error);
      }
    },

    refreshdetails() {
      this.username = "";
      this.password = "";
      this.confirm_password = "";
      this.isPublic = "";
    },
  },

  computed: {
    ...mapGetters({
      api_error: "api_error",
      user_exist: "user_exist",
    }),
  },
};
</script>

<style>
#registration {
  margin-top: 30px;
}
.form-group {
  display: flex;
  justify-content: center;
}

label {
  margin-right: 10px;
}

#confirm_password {
  margin-right: 60px;
}

#dropdown {
  padding-right: 60px;
}
</style>