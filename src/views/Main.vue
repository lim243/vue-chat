<template>
  <div>
    <div class="title">
      <h2 class="text-primary text-center">Epik Chat</h2>
      <h5 class="text-secondary text-center">{{ this.roomName }}</h5>
    </div>

    <div class="main flex">
      <sidebar-menu
        :menu="this.rooms"
        @item-click="onItemClick"
        @update:collapsed="onToggleCollapse"
        :collapsed="this.collapsed"
        relative="false"
        width="150px"
        class="sidebar"
      />
      <Chat />
    </div>
    <div class="footer">
      <h5 class="text-secondary text-center">Powered by Vue.js and Firebase</h5>
    </div>
  </div>
</template>

<script>
import Chat from "@/views/Chat.vue";
import { mapGetters } from "vuex";
import store from "../store";
import { collection, db, addDoc, query, onSnapshot, orderBy } from "@/firebase/init";

export default {
  name: "Main",
  components: { Chat },
  data() {
    return {
      menu: [],
      rooms: [
        { header: "Rooms", hiddenOnCollapse: true },
        { title: "Add Room" },
        { href: "/Main", title: "General" },
      ],
      collapsed: false,
      roomName: "general",
    };
  },
  methods: {
    updateMenu() {
      // this.menu = [...this.menu, this.rooms];
      console.log("this.menue, this.rooms", this.menue, this.rooms);
    },
    onItemClick(event, item) {
      console.log("item", item);
      if (item.title === "Add Room") {
        const roomNumber = this.rooms.length - 2;
        this.addRoom(roomNumber);
      }
    },
    onToggleCollapse(collapsed) {
      console.log("collapsed", collapsed);
    },
    addRoom(roomNumber) {
      const roomName = "Room #" + roomNumber.toString();

      const docData = {
        title: roomName,
        messages: [],
      };

      // Add to DB
      addDoc(collection(db, "rooms"), docData);

      // Update rooms state
      console.log("rooms in main", this.rooms);
      this.rooms = store.state.rooms;
    },
  },
  created() {
    const q = query(collection(db, "rooms"), orderBy("title"));
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("incoming room?");
          let doc = change.doc;
          let room = {
            id: doc.id,
            title: doc.data().title,
            messages: doc.data().messages,
          };
          this.rooms.push(room);
        }
      });
      store.dispatch("fetchRooms", this.rooms);
    });
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
      rooms: "rooms",
    }),
  },
};
</script>

<style>
.main {
  display: flex; /* or inline-flex */
  height: 85vh;
}
.sidebar {
  border-right: 2px solid;
}

.vsm--item {
  margin: 5px;
}

.footer {
  height: 5vh;
  margin: 10px;
}
</style>
