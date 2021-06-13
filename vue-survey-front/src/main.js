import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mitt from "mitt";
import { formatDate } from "./utils/filter.js";

const bus = mitt();
const app = createApp(App);

// 이벤트 버스 등록
app.config.globalProperties.$bus = bus;

// 필터등록
app.config.globalProperties.$filters = {
  formatDate,
};

// focus디렉티브 지정
app.directive("focus", {
  mounted(el) {
    el.focus();
  },
});

// 설문지에서 form종류
app.config.globalProperties.SURVEY_KINDS = {
  TITLE: 0,
  SHORT_SUBJECTIVE: 1,
  LONG_SUBJECTIVE: 2,
  MULTIPLE_CHOICE: 3,
};

// 설문지 상태
app.config.globalProperties.SURVEY_STATE = {
  PENDING: 0,
  POSTING: 1,
  END: 9,
};

app.use(store).use(router).mount("#app");
