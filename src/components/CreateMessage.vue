<template>
  <div class="container">
    <form @submit.prevent="createMessage">
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          name="message"
          placeholder="Enter something here..."
          v-model="newMessage"
        />
        <p class="text-danger" v-if="errorText">{{ errorText }}</p>
      </div>
      <button class="btn btn-primary" type="submit" name="action">Send</button>
    </form>
  </div>
</template>

<script>
import { db, collection, addDoc } from "@/firebase/init";

export default {
  name: "CreateMessage",
  props: ["name"],
  data() {
    return {
      newMessage: null,
      errorText: null,
    };
  },
  methods: {
    createMessage() {
      if (this.newMessage) {
        const docData = {
          message: this.newMessage,
          name: this.name,
          timestamp: Date.now(),
        };
        
        addDoc(collection(db, "messages"), docData);

        // Reset message form
        this.newMessage = null;
        this.errorText = null;
      } else {
        this.errorText = "Message cannot be empty! Please enter something...";
      }
    },
  },
};
</script>
