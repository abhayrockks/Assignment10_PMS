<template>
  <div>
    <Header />
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Polls</h1>
        </div>
      </div>
    </section>
    <div>
      <Crudpoll />
    </div>
  </div>
</template>

<script>
import Header from "./../components/Header.vue";
import Crudpoll from "./../components/Crudpoll.vue";
export default {
  name: "Poll",
  components: {
    Header,
    Crudpoll,
  },
};
</script>

<style>

</style>