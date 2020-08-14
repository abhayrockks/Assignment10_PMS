<template>
  <div id="profile">
    <Header />
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Profile Page</h1>
        </div>
      </div>
    </section>
    <GuestPolling />
  </div>
</template>

<script>
import Header from "./../components/Header";
import GuestPolling from "./../components/GuestPolling";

export default {
  name: "Login",
  components: {
    Header,
    GuestPolling,
  },
};
</script>