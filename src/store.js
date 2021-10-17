import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: {
        loggedIn: false,
        data: null,
      },
      rooms: [],
      currentRoom: {},
      messages: [],
    };
  },
  getters: {
    user(state) {
      return state.user;
    },
    rooms(state) {
      return state.rooms;
    },
    currentRoom(state) {
      return state.currentRoom;
    },
    messages(state) {
      return state.messages;
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_ROOMS(state, rooms) {
      state.rooms = rooms;
    },
    ADD_ROOM(state, newRoom) {
      state.rooms = [...state.rooms, newRoom];
    },
    SET_ROOM(state, currentRoom) {
      state.currentRoom = currentRoom;
    },
    LOGOUT_USER(state) {
      (state.user = {
        loggedIn: false,
        data: null,
      }),
        (state.rooms = [
          { header: "Rooms", hiddenOnCollapse: true },
          { title: "Add Room" },
          { href: "/Main", title: "General" },
        ]);
    },
    CLEAR_MESSAGES(state) {
      state.messages = [];
    },
    ADD_MESSAGE(state, newMessage) {
      state.messages.push(newMessage);
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        });
      } else {
        commit("SET_USER", null);
      }
    },
    fetchRooms({ commit }, rooms) {
      if (rooms) {
        commit("SET_ROOMS", rooms);
      } else {
        commit("SET_ROOMS", null);
      }
    },
    addRoom({ commit }, newRoom) {
      if (newRoom) {
        commit("ADD_ROOM", newRoom);
      }
    },
    logout({ commit }) {
      commit("LOGOUT_USER");
    },
    setCurrentRoom({ commit }, room) {
      if (room) {
        commit("SET_ROOM", room);
      }
    },
    clearMessages({ commit }) {
      commit("CLEAR_MESSAGES");
    },
    addMessage({ commit }, message) {
      if (message) {
        commit("ADD_MESSAGE", message);
      }
    },
  },
});

export default store;
