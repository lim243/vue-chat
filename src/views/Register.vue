<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="submit">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right"
                  >Name</label
                >

                <div class="col-md-6">
                  <input
                    id="name"
                    type="name"
                    class="form-control"
                    name="name"
                    value
                    required
                    autofocus
                    v-model="name"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >Email</label
                >

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    value
                    required
                    autofocus
                    v-model="email"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right"
                  >Password</label
                >

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="password"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="third-party-login">
      <button class="btn btn-danger" @click="googleSignIn">Sign Up With Google</button>
      <button class="btn btn-dark" @click="githubSignIn">Sign Up With Github</button>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "@/firebase/init";
import store from "../store";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
    submit() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: this.name,
          })
            .then(() => {
              console.log("Profile updateed!");
              store.dispatch("fetchUser", user);
              this.$router.push({
                name: "Main",
              });
            })
            .catch((err) => {
              console.log("err in update name!", err);
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("errorCode, errorMessage", errorCode, errorMessage);

          this.error = errorCode;
          // ..
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
          console.log("user, token", user, token);
          store.dispatch("fetchUser", user);
          this.$router.push({
            name: "Main",
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

          console.log("error in Google", errorCode, errorMessage, email, credential);
        });
    },
    githubSignIn() {
      const auth = getAuth();
      const provider = new GithubAuthProvider();

      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          // The signed-in user info.
          const user = result.user;

          console.log("github token", token, user);
          store.dispatch("fetchUser", user);
          this.$router.push({
            name: "Main",
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
          const credential = GithubAuthProvider.credentialFromError(error);
          console.log("errorCode in github", errorCode, errorMessage, email, credential);
          // ...
        });
    },
  },
};
</script>
