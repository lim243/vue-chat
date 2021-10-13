<template>
  <div class="container">
    <form class="inline" @submit.prevent="createMessage">
      <div class="form-group row">
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            name="message"
            placeholder="Enter something here..."
            v-model="newMessage"
          />
        </div>
        <div class="col-sm-1">
          <DiscordPicker
            :showEmoji="showEmoji"
            :apiKey="apiKey"
            @emoji="setEmoji"
          />
        </div>

        <div class="col-sm-1">
          <button class="btn btn-primary" type="submit" name="action">
            Send
          </button>
        </div>
      </div>
      <p class="text-danger" v-if="errorText">{{ errorText }}</p>
    </form>
  </div>
</template>

<script>
import { db, collection, addDoc } from "@/firebase/init";
import DiscordPicker from "vue3-discordpicker";

export default {
  name: "CreateMessage",
  props: ["name"],
  components: {
    DiscordPicker,
  },
  data() {
    return {
      newMessage: "",
      errorText: null,
      showEmoji: true,
      emojiValue: null,
      apiKey: process.env.VUE_APP_EMOJI_API_KEY,
    };
  },
  methods: {
    createMessage() {
      if (this.newMessage.length > 0) {
        const docData = {
          message: this.newMessage,
          name: this.name,
          timestamp: Date.now(),
        };

        addDoc(collection(db, "messages"), docData);

        // Reset message form
        this.newMessage = "";
        this.errorText = null;
      } else {
        this.errorText = "Message cannot be empty! Please enter something...";
      }
    },
    setEmoji(emoji) {
      console.log(emoji);
      this.newMessage += emoji;
    },
    setGif(gif) {
      console.log(gif);
      this.newMessage += " " + gif;
    },
  },
};
</script>
