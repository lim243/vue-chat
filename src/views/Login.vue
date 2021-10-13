<template>
  <div class="container">
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
        <form @submit.prevent="login" class="text-center">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Name"
              name="name"
              v-model="name"
            />
            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>
          <button class="btn btn-primary" type="submit">Enter Epic Chat</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      name: "",
      errorText: null,
    };
  },
  mounted() {
    if (localStorage.name) {
      this.name = localStorage.name;
      this.login();
    }
  },
  methods: {
    login() {
      if (this.name) {
        localStorage.setItem("name", this.name);
        this.$router.push({ name: "Chat", params: { name: this.name } });
      } else {
        this.errorText = "Bruh, no name provided!";
      }
    },
  },
};
</script>

<style>
.login {
  max-width: 450px;
  margin-top: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.btn {
  margin-top: 10px;
}
</style>
