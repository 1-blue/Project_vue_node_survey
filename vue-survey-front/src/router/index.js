import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "HomePage",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/survey",
    name: "SurveyPage",
    component: () => import("@/views/SurveyPage.vue"),
  },
  {
    path: "/admin",
    name: "AdminPage",
    component: () => import("@/views/AdminPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
