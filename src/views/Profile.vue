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
  </div>
</template>

<script>
import Header from "./../components/Header";

export default {
  name: "Login",
  components: {
    Header,
  },
};
</script>