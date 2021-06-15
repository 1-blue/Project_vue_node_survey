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
    path: "/admin",
    name: "AdminPage",
    component: () => import("@/views/AdminPage.vue"),
  },
  {
    path: "/survey/show",
    name: "SurveyShowPage",
    component: () => import("@/views/SurveyShowPage.vue"),
  },
  {
    path: "/survey/add",
    name: "SurveyAddPage",
    component: () => import("@/views/SurveyAddPage.vue"),
  },
  {
    path: "/survey/edit/:surveyId",
    name: "SurveyEditPage",
    component: () => import("@/views/SurveyEditPage.vue"),
  },
  {
    path: "/survey/do/:surveyId",
    name: "SurveyDoPage",
    component: () => import("@/views/SurveyDoPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
