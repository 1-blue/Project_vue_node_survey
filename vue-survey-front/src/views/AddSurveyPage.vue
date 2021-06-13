<template>
  <section id="add__survey__page">
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
</style>
