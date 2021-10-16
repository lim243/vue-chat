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
          <div
            class="message"
            v-for="message in messages"
            :key="message.id"
          >
            <span class="col-1">
              <div v-if="message.photoURL">
                <img :src="message.photoURL" width="40" height="40" />
              </div>
              <div v-else>
                <Avatar :size="40" :name="message.name" />
              </div>
            </span>
            <span>
              <span class="text-info">[{{ message.name }}]: </span>
              <span>{{ message.message }}</span>
              <span class="text-secondary time">{{ message.timestamp }}</span>
            </span>
          </div>
        </div>
      </div>

      <div class="card-action">
        <CreateMessage :name="user.data.displayName" />
      </div>
    </div>
  </div>

  <div class="container about">
      <p class="text-secondary" id="about-name">Logged in as {{ user.data.displayName }}</p>
      <div v-if="user.data.photoURL">
        <img :src="user.data.photoURL" width="50" height="50" />
      </div>
      <div v-else>
        <Avatar :size="50" :name="user.displayName" />
      </div>
    </div>
</template>

<script>
import CreateMessage from "@/components/CreateMessage";
import { db, collection, query, orderBy, onSnapshot } from "@/firebase/init";
import moment from "moment";
import { mapGetters } from "vuex";
import Avatar from "vue-boring-avatars";

export default {
  name: "Chat",
  props: ["name"],
  components: {
    CreateMessage,
    Avatar,
  },
  data() {
    return {
      messages: [],
    };
  },
  created() {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            photoURL: doc.data().photoURL,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: moment(doc.data().timestamp).format("LTS"),
          });
        }
      });
    });
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
    }),
  },
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

.about {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

#about-name {
  align-self: center;
  margin-bottom: 0px;
}

.message {
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

</style>
