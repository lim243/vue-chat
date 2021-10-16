import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user: {
        loggedIn: false,
        data: null,
      },
      rooms: [],
    };
  },
  getters: {
    user(state) {
      return state.user;
    },
    rooms(state) {
      return state.rooms;
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
      const defaultRooms = [
        { header: "Rooms", hiddenOnCollapse: true },
        { title: "Add Room" },
        { href: "/Main", title: "General" },
      ];

      console.log("defaultRooms", defaultRooms);
      console.log("state.rooms", state.rooms);
      console.log("newRooms", rooms);
      // Prepend the first 3 buttons to sidebar and append database rooms
      state.rooms = rooms;
    },
    ADD_ROOM(state, newRoom) {
      state.rooms = [...state.rooms, newRoom];
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
  },
});

export default store;
