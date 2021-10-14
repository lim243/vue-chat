<template>
  <div class="container chat">
    <h2 class="text-primary text-center">Epik Chat</h2>
    <h5 class="text-secondary text-center">Powered by Vue.js and Firebase</h5>

    <div class="card">
      <div class="card-body">
        <p class="text-secondary nomessages" v-if="messages.length == 0">
          [No messages yet!]
        </p>
        <div class="messages">
          <div class="message" v-for="message in messages" :key="message.id">
            <span class="text-info">[{{ message.name }}]: </span>
            <span>{{ message.message }}</span>
            <span class="text-secondary time">{{ message.timestamp }}</span>
          </div>
        </div>
      </div>

      <div class="card-action">
        <CreateMessage :name="name" />
      </div>
    </div>

    <h6 class="text-secondary">Logged in as {{ name }}</h6>
    <button class="btn btn-secondary" @click="logout">Logout</button>

    <div class="player">
      <Spotify />
    </div>
  </div>
</template>

<script>
import CreateMessage from "@/components/CreateMessage";
import Spotify from "@/components/Spotify";
import { db, collection, query, orderBy, onSnapshot } from "@/firebase/init";
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "Chat",
  props: ["name"],
  components: {
    CreateMessage,
    Spotify,
  },
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("name");
      this.$router.push({ name: "Login", params: { name: this.name } });
    },
  },
  created() {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New message: ", change.doc.data());
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: moment(doc.data().timestamp).format("LTS"),
          });
        }

        // For future use
        if (change.type === "modified") {
          console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data());
        }
      });
    });
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  }
};
</script>

<style>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 0px;
}
.chat h5 {
  margin-top: 0px;
  margin-bottom: 40px;
}
.chat span {
  font-size: 1.2em;
}
.chat .time {
  display: block;
  font-size: 0.7em;
}
.messages {
  max-height: 300px;
  overflow: auto;
}

.message {
  text-align: left;
}

.player {
  padding-top: 200px;
  background-color: black;
}
</style>
