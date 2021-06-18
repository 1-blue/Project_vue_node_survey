<template>
  <section id="survey__result__page">
    <form-result
      :questionList="questionList"
      :answerList="answerList"
    ></form-result>
  </section>
</template>

<script>
import { surveyShowResult } from "@/api/index.js";
import FormResult from "@/components/common/form/FormResult.vue";

export default {
  name: "SurveyResultPage",
  components: {
    FormResult,
  },
  data() {
    return {
      questionList: [],
      answerList: [],
    };
  },
  computed: {
    surveyId() {
      return this.$route.params.surveyId;
    },
  },
  async created() {
    try {
      const { data } = await surveyShowResult(this.surveyId);
      this.questionList = data[0].Questions;
      data.forEach((v, i) => {
        if (i === 0) return;
        this.answerList.push(v);
      });
    } catch (error) {
      switch (error.response.status) {
        case 400:
          alert(
            "서버측 에러로 결과를 가져오는데 실패했습니다. 잠시후에 다시시도해주세요 by surveyShowResult.vue",
          );
          break;
        default:
          alert(
            "알 수 없는 에러로 결과를 가져오는데 실패했습니다. 잠시후에 다시시도해주세요 by surveyShowResult.vue",
          );
          break;
      }
    }
  },
};
</script>

<style scoped>
#survey__result__page {
}
</style>
