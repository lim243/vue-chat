<template>
  <div class="home">
    <h1>Welcome to Epik Chat</h1>

    <p>What are you waiting for?</p>
    <p>Click start chatting now by either</p>
    <router-link to="/login">Login</router-link> or
    <router-link to="/register">Create a new account</router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
