<template>
  <div class="container">
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
        <form @submit.prevent="login" class="text-center">
          <div class="form-group">
            <input
              id="email"
              type="email"
              class="form-control"
              name="email"
              value
              required
              autofocus
              placeholder="Email"
              v-model="email"
            />
            <input
              id="password"
              type="password"
              class="form-control"
              name="password"
              required
              placeholder="Password"
              v-model="password"
            />
            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>
          <button class="btn btn-primary" type="submit">Enter Epic Chat</button>
        </form>
      </div>
    </div>

    <button class="btn btn-danger" @click="googleSignIn">Google Sign In</button>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "@/firebase/init";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      errorText: null,
    };
  },
  methods: {
    login() {
      console.log("called login");
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("user signned in", user);
          this.$router.push({
            name: "Chat",
          });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(
            "error in sign in with password ",
            errorCode,
            errorMessage
          );
        });
    },
    googleSignIn() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log('user, token', user, token);
          this.$router.push({
            name: "Chat",
          });
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...

          console.log('error in Google', errorCode, errorMessage, email, credential);
        });
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
