import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Chat from "../views/Chat.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/NotFound.vue";
import Main from "../views/Main.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
