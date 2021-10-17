<template>
  <div class="container chat">
    <div class="card message-card">
      <div class="card-body">
        <p class="text-secondary nomessages" v-if="messages.length == 0">
          [No messages yet!]
        </p>
        <div class="messages">
          <div class="message" v-for="message in messages" :key="message.id">
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
        <CreateMessage :name="this.user.data.displayName" />
      </div>
    </div>
  </div>

  <!-- <div class="container about">
    <p class="text-secondary" id="about-name">
      Logged in as {{ this.user.data.displayName }}
    </p>
    <div v-if="user.data.photoURL">
      <img :src="user.data.photoURL" width="50" height="50" />
    </div>
    <div v-else>
      <Avatar :size="50" :name="this.user.displayName" />
    </div>
  </div> -->
</template>

<script>
import CreateMessage from "@/components/CreateMessage";
import { db, query, where, onSnapshot, collectionGroup, orderBy } from "@/firebase/init";
import moment from "moment";
import { mapGetters } from "vuex";
import store from "../store";
import Avatar from "vue-boring-avatars";

export default {
  name: "Chat",
  components: {
    CreateMessage,
    Avatar,
  },

  methods: {
    getMessages(roomId) {
      const messagesQ = query(
        collectionGroup(db, "messages"),
        where("roomId", "==", roomId),
        orderBy("timestamp")
      );

      // Listen to live updates from database
      onSnapshot(messagesQ, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            let doc = change.doc;

            if (doc.data().roomId == roomId) {
              let newMsg = {
                id: doc.id,
                photoURL: doc.data().photoURL,
                roomId: doc.data().roomId,
                name: doc.data().name,
                message: doc.data().message,
                timestamp: moment(doc.data().timestamp).format("LTS"),
              };
              store.dispatch("addMessage", newMsg);
            }
          }
        });
      });
    },
  },
  created() {
    this.getMessages(this.currentRoom.id);
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
      currentRoom: "currentRoom",
      rooms: "rooms",
      messages: "messages",
    }),

    getRoom() {
      return store.state.currentRoom;
    },
  },
  watch: {
    getRoom(newRoom) {
      store.dispatch("clearMessages");
      this.getMessages(newRoom.id);
    },
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
  /* max-height: 300px; */
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

.message-card {
  height: 85vh;
}
</style>
