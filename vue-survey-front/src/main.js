import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mitt from "mitt";

const bus = mitt();
const app = createApp(App);

app.config.globalProperties.bus = bus;

// 설문지에서 form종류
app.config.globalProperties.SURVEY_KINDS = {
  TITLE: 0,
  SHORT_SUBJECTIVE: 1,
  LONG_SUBJECTIVE: 2,
  MULTIPLE_CHOICE: 3,
};

app.use(store).use(router).mount("#app");
