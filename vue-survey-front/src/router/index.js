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
  {
    path: "/survey/add",
    name: "AddSurveyPage",
    component: () => import("@/views/AddSurveyPage.vue"),
  },
  {
    path: "/survey/edit/:surveyId",
    name: "EditSurveyPage",
    component: () => import("@/views/EditSurveyPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
