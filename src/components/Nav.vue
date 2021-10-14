<template>
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="user.loggedIn">
            <router-link to="/chat" class="navbar-brand">Chat</router-link>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="logout">Sign out</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="register" class="nav-link">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import { getAuth, signOut } from "@/firebase/init";
export default {
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$router.push({
          name: "Home",
        });
      });
    },
  },
};
</script>
