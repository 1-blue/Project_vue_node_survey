<template>
  <section id="edit__survey__page">
    <!-- 질문폼들 -->
    <ul>
      <survey-form
        v-for="(form, index) in formList"
        :key="index"
        :form="form"
        :index="index"
        @change:form="changeForm"
        @delete:form="deleteForm"
        @toggle:required="toggleRequired"
        @update:title="updateTitle"
      ></survey-form>
    </ul>

    <!-- 버튼들 -->
    <div class="btns shadow">
      <button type="button" @click.prevent="addForm" title="폼추가">
        <i class="fas fa-plus-circle icon"></i>
      </button>
      <button type="button" @click="submitSurvey" title="설문지 제출">
        <i class="fas fa-folder-plus icon"></i>
      </button>
    </div>
  </section>
</template>

<script>
import { fetchOneSurvey, editSurvey } from "@/api/index.js";
import SurveyForm from "@/components/SurveyForm.vue";

export default {
  name: "EditSurveyPage",
  components: {
    SurveyForm,
  },
  data() {
    return {
      survey: {},
      formList: [],
    };
  },
  computed: {
    surveyId() {
      return this.$route.params.surveyId;
    },
  },
  async created() {
    try {
      const { data } = await fetchOneSurvey(this.surveyId);
      this.survey = data;
      this.fetchSurvey();
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
  methods: {
    fetchSurvey() {
      // 설문지 제목추가
      this.formList.push({
        id: this.survey.id,
        kinds: this.SURVEY_KINDS.TITLE,
        state: this.survey.state,
        title: this.survey.title,
      });

      // 설문지와 연관된 질문들 추가
      this.survey.Questions.forEach(v => {
        this.formList.push({
          id: v.id,
          kinds: v.kinds,
          required: v.required,
          title: v.title,
        });
      });
    },

    // ======================= 겹치는 부분 =============================

    addForm() {
      this.formList.push({
        kinds: this.SURVEY_KINDS.SHORT_SUBJECTIVE,
        title: "",
        required: false,
      });
    },
    changeForm(...args) {
      // 수정할 폼인덱스, 수정될 폼종류
      this.formList[args[0]].kinds = args[1];
    },
    deleteForm(formIndex) {
      // css속임수때문에 setTimeout설정
      // 폼을 삭제하는 부분은 추가하는 부분과 달라서 직접적으로 해결함.. 물론 방법이 좋지는 않음
      setTimeout(() => this.formList.splice(formIndex, 1), 1000);
    },
    toggleRequired(formIndex) {
      this.formList[formIndex].required = !this.formList[formIndex].required;
    },
    updateTitle(formIndex, title) {
      this.formList[formIndex].title = title;
    },
    async editSurvey() {
      try {
        await editSurvey(this.surveyId, this.formList);
      } catch (error) {
        console.log(error);
        switch (error.response.status) {
          case 400:
            alert(
              "서버측 에러로 설문지 생성에 실패했습니다. 잠시후에 다시시도해주세요 by EditSurveyPage.vue",
            );
            break;
          default:
            alert(
              "알 수 없는 에러로 설문지 생성에 실패했습니다. 잠시후에 다시시도해주세요 by EditSurveyPage.vue",
            );
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
#edit__survey__page {
  position: relative;
}

.btns {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 20%;
  right: 5%;
  background: white;
  border-radius: 0.5em;
}

.btns > button {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.5em;
  margin: 1em 0.5em;
}

@media screen and (max-width: 768px) {
  .btns {
    right: 3%;
    border-radius: 0.35em;
  }

  .btns > button {
    font-size: 1em;
    margin: 0.75em 0.35em;
  }
}
</style>
