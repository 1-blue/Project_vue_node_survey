<template>
  <section id="survey__do__page">
    <ul>
      <survey-form
        v-for="(form, index) in questionList"
        :key="index"
        :form="form"
        :index="index"
        :isAnswer="true"
        @answerSubmit="answerSubmit"
      ></survey-form>
    </ul>
  </section>
</template>

<script>
import { fetchOneSurvey } from "@/api/index.js";
import SurveyForm from "@/components/common/survey/SurveyForm.vue";

export default {
  name: "SurveyDoPage",
  components: {
    SurveyForm,
  },
  data() {
    return {
      questionList: [],
    };
  },
  computed: {
    surveyId() {
      return this.$route.params.surveyId;
    },
  },
  async created() {
    const { data: survey } = await fetchOneSurvey(this.surveyId);

    // 설문지의 제목
    this.questionList.push({
      title: survey.title,
      subTitle: survey.subTitle,
      kinds: this.SURVEY_KINDS.TITLE,
      isRequired: true,
    });

    // 설문지의 질문 form들
    survey.Questions.forEach(v => {
      const { id, title, kinds, required } = v;
      this.questionList.push({ id, title, kinds, required });
    });
  },
  methods: {
    answerSubmit() {
      console.log("설문지 제출요");
    },
  },
};
</script>

<style scoped>
#survey__do__page {
}
</style>
