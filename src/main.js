import { createApp } from "vue";
import DiscordPicker from "vue3-discordpicker";
import VueSidebarMenu from "vue-sidebar-menu";
import App from "./App.vue";
import router from "./router";
import { getAuth } from "@/firebase/init";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
// import LogRocket from "logrocket";
// LogRocket.init("btxrpz/vue-chat");

const auth = getAuth();
auth.onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

createApp(App)
  .use(router)
  .use(store)
  .use(DiscordPicker)
  .use(VueSidebarMenu)
  .mount("#app");
