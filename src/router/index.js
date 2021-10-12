import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Chat from "../views/Chat.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    props: true,
    beforeEnter: (to, from, next) => {
      if (to.params.name) {
        next();
      } else {
        next({ name: "Login" });
      }
    },
  },
  {
    path: "/:catchAll(.*)",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
