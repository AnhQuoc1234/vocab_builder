<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        // Perform actual authentication here (e.g., API call)
        const user = { username: this.username };
        this.$store.dispatch('login', user);
        this.$router.push('/dashboard');
      },
    },
  };
  </script>