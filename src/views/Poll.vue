<template>
  <div>
    <Header />
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Poll</h1>
        </div>
      </div>
    </section>
    <Pollingpage />
  </div>
</template>

<script>
import Header from "./../components/Header";
import Pollingpage from "./../components/Pollingpage.vue";
export default {
  name: "Poll",
  components: {
    Header,
    Pollingpage,
  },
};
</script>