import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import {
  getAuth,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import firebaseConfig from "./firebaseConfig";

initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: "http://localhost:8080/chat",
  // This must be true.
  handleCodeInApp: true,
};

const emailAuth = (email) => {
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem("emailForSignIn", email);
      console.log("email sent to:", email);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode, errorMessage", errorCode, errorMessage);
      // ...
    });
};

const checkAuth = () => {
  console.log("in checkAuth", window.location.href);
  // Confirm the link is a sign-in with email link.
  if (isSignInWithEmailLink(auth, window.location.href)) {
    console.log("hi");
    // Additional state parameters can also be passed via URL.
    // This can be used to continue the user's intended action before triggering
    // the sign-in operation.
    // Get the email if available. This should be available if the user completes
    // the flow on the same device where they started it.
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt("Please provide your email for confirmation");
    }

    console.log("email", email);

    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem("emailForSignIn");
        console.log("result", result);
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
        console.log("error", error);
      });
  }
};

export {
  auth,
  getAuth,
  emailAuth,
  checkAuth,
  createUserWithEmailAndPassword,
  db,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  setDoc,
  addDoc,
  signInWithEmailAndPassword,
  updateProfile,
};
