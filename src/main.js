import { createApp } from "vue";
import DiscordPicker from "vue3-discordpicker";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App).use(router).use(DiscordPicker).mount("#app");
