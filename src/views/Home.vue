<template>
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the public home page of the application.</p>
      <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      isAuthenticated() {
        return this.$store.getters.isAuthenticated;
    },
    },
  };
  </script>