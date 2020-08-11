<template>
  <div id="home">
    <Header />
    <div class="container has-text-centered">
      <img src="./../assets/logo.png" />
      <h1 class="title">HOME PAGE</h1>
    </div>
    <SignUp />
  </div>
</template>

<script>
import Header from "./../components/Header";
import SignUp from "./../components/SignUp";
export default {
  name: "Home",
  components: {
    Header,
    SignUp,
  },
};
</script>

<style>
</style>