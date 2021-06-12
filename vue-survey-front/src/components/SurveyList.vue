<template>
  <section id="survey__list">
    <ul class="survey__add__btn__container">
      <li
        class="survey__add__btn__default shadow"
        v-for="survey in surveyList"
        :key="survey.id"
      >
        {{ survey.title }}
      </li>
    </ul>
  </section>
</template>

<script>
import { fetchSurvey } from "@/api/index.js";

export default {
  name: "SurveyList",
  data() {
    return {
      surveyList: [],
    };
  },
  async created() {
    try {
      const { data: surveyList } = await fetchSurvey();
      this.surveyList = surveyList;
    } catch (error) {
      switch (error.response.status) {
        case 400:
          alert(
            "서버측 에러입니다. 잠시후에 다시시도해주세요. by SurveyList.vue",
          );
          break;

        default:
          alert(
            "알 수 없는 에러입니다. 잠시후에 다시시도해주세요 by SurveyList.vue",
          );
          break;
      }
    }
  },
};
</script>

<style scoped>
.survey__add__btn__container {
  display: flex;
  justify-content: center;
}

.survey__add__btn__default {
  width: 20vw;
  height: 20vw;
  border-radius: 1em;
  background: white;
  text-align: center;
  position: relative;
  cursor: pointer;
  margin: auto;
}

.survey__add__btn__default:hover {
  border: 1px solid blue;
}
</style>
