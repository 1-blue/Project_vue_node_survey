<template>
  <section id="add__survey__page">
    <div class="title">add survey page</div>
    <button type="button" @click.prevent="addForm">항목추가</button>
    <ul>
      <survey-form
        v-for="(form, index) in formList"
        :key="index"
        :kinds="form"
        :index="index"
        @changeForm="changeForm"
      ></survey-form>
    </ul>

    <button type="button">설문지 추가하기</button>
  </section>
</template>

<script>
import SurveyForm from "@/components/SurveyForm.vue";

export default {
  name: "AddSurveyPage",
  components: {
    SurveyForm,
  },
  data() {
    return {
      formList: [this.SURVEY_KINDS.TITLE],
    };
  },
  methods: {
    addForm() {
      this.formList.push(this.SURVEY_KINDS.SHORT_SUBJECTIVE);
    },
    changeForm(...args) {
      // 수정할 폼인덱스, 수정될 폼종류
      this.formList[args[0]] = args[1];
    },
  },
};
</script>

<style scoped>
#add__survey__page {
}
</style>
