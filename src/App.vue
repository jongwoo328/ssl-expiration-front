<template>
  <div id="app">
    <Navbar />
    <Main />
  </div>
</template>

<script>
import Navbar from "@/components/Nav.vue";
import Main from "@/components/Main.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Main,
  },
};
</script>

<style>
</style>
