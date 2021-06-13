<template>
  <section id="add__survey__page">
    <div class="title">add survey page</div>
    <button type="button" @click.prevent="addForm">항목추가</button>
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

    <button type="button" @click="submitSurvey">설문지 추가</button>
  </section>
</template>

<script>
import SurveyForm from "@/components/SurveyForm.vue";
import { createSurvey } from "@/api/index.js";

export default {
  name: "AddSurveyPage",
  components: {
    SurveyForm,
  },
  data() {
    return {
      formList: [
        { kinds: this.SURVEY_KINDS.TITLE, title: "", isRequired: true },
      ],
    };
  },
  methods: {
    // ======================= 겹치는 부분 =============================

    addForm() {
      this.formList.push({
        kinds: this.SURVEY_KINDS.SHORT_SUBJECTIVE,
        title: "",
        isRequired: false,
      });
    },
    changeForm(...args) {
      // 수정할 폼인덱스, 수정될 폼종류
      this.formList[args[0]].kinds = args[1];
    },
    deleteForm(formIndex) {
      this.formList.splice(formIndex, 1);
    },
    toggleRequired(formIndex) {
      this.formList[formIndex].required = !this.formList[formIndex].required;
    },
    updateTitle(formIndex, title) {
      this.formList[formIndex].title = title;
    },
    async submitSurvey() {
      try {
        await createSurvey(this.formList);
      } catch (error) {
        switch (error.response.status) {
          case 400:
            alert(
              "서버측 에러로 설문지 생성에 실패했습니다. 잠시후에 다시시도해주세요 by AddSurveyPage.vue",
            );
            break;

          default:
            alert(
              "알 수 없는 에러로 설문지 생성에 실패했습니다. 잠시후에 다시시도해주세요 by AddSurveyPage.vue",
            );
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
#add__survey__page {
}
</style>
