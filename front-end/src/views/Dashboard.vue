<template>
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard, {{ user?.username }}!</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      user() {
        return this.$store.getters.user;
      },
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/login');
      },
    },
  };
  </script>