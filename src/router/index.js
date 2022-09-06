import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Manage from "@/views/Manage.vue";
import useUserStore from "@/stores/user";
import ErrorPage from "@/views/404.vue";
import Song from "@/views/SongPage.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: Home,
  },
  {
    name: "about",
    path: "/about",
    component: About,
  },
  {
    name: "errorPage",
    path: "/not-found",
    component: ErrorPage,
  },
  {
    name: "manage",
    // alias: "/manage",
    path: "/manage-music",
    component: Manage,
    // beforeEnter(to, from, next) {
    //   console.log("Manage Route Guard");
    //   next();
    // },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/manage",
    redirect: { name: "manage" },
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "errorPage" },
  },
  {
    name: "song",
    path: "/song/:id",
    component: Song,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: "text-yellow-500",
  // scrollBehavior(to, from, savedPosition) {
  // always scroll to top
  // return { top: 0 };
  // },
});

router.beforeEach((to, from, next) => {
  // console.log("Global Guard");

  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();

  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
