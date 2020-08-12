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
    <nav class="navbar is-warning" role="navigation" aria-label="main navigation">
      <div class="navbar-menu">
        <div class="navbar-item">
          <a @click="showModal = true" id="show-modal" class="button is-white">Create</a>
          <a class="button is-white">Edit</a>
        </div>
      </div>
      <Newpollform v-if="showModal" @close="showModal = false" />
    </nav>
    <div>
      <PollList />
    </div>
  </div>
</template>

<script>
import Header from "./../components/Header.vue";
import PollList from "./../components/PollList.vue";
import Newpollform from "./../components/NewPollForm.vue";
export default {
  name: "Poll",
  components: {
    Header,
    PollList,
    Newpollform,
  },

  data() {
    return {
      showModal: false,
    };
  },
};
</script>

<style>
#cancel {
  margin-left: 10px;
}
</style>