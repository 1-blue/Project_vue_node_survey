<template>
  <section id="survey__do__page">
    <ul>
      <survey-form
        v-for="(form, index) in questionList"
        :key="index"
        :form="form"
        :index="index"
        :isAnswer="true"
        @change:answer="changeAnswer"
      ></survey-form>
    </ul>

    <submit-button :isEnough="isEnough" @submit1:survey="submitSurvey">
      제출
    </submit-button>
  </section>
</template>

<script>
import { fetchOneSurvey, surveySubmit } from "@/api/index.js";
import SurveyForm from "@/components/common/survey/SurveyForm.vue";
import SubmitButton from "@/components/common/SubmitButton.vue";

export default {
  name: "SurveyDoPage",
  components: {
    SurveyForm,
    SubmitButton,
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
    // 필수입력란 모두 입력했는가?
    isEnough() {
      return this.answerList.every(v => {
        // 필수아니면 무시
        if (!v.required) return true;

        if (v.answer.length === 0) {
          return false;
        }

        return true;
      });
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

    // 대답정보들 넣어놓은 객체배열만들기
    this.questionList.forEach((v, i) => {
      // formTitle제외
      if (i === 0) return;

      const { id, required } = v;
      this.answerList.push({ id, required, answer: "" });
    });
  },
  methods: {
    changeAnswer(formId, answer) {
      // 사용자가 입력하면 대답정보들 업데이트
      this.answerList.forEach(v => {
        if (v.id !== formId) return;
        v.answer = answer;
      });
    },
    async submitSurvey() {
      try {
        this.noAnswerChange();
        await surveySubmit(this.answerList);
        alert("설문지 제출이 완료되었습니다. HOME화면으로 이동합니다.");
        this.$router.push("/home");
      } catch (error) {
        switch (error.response.status) {
          // 여기에 설문지 못찾는 예외처리도 추가하기
          case 400:
            alert(
              "서버측 에러입니다. 잠시후에 다시시도해주세요. by EditSurveyPage.vue",
            );
            break;

          default:
            alert(
              "알 수 없는 에러입니다. 잠시후에 다시시도해주세요 by EditSurveyPage.vue",
            );
            break;
        }
      }
    },
    noAnswerChange() {
      // 대답없는거 미응답으로 고쳐서 제출
      this.answerList.forEach(v => {
        if (v.answer.length === 0) {
          v.answer = "미응답";
        }
      });
    },
  },
};
</script>

<style scoped>
#survey__do__page {
}
</style>
