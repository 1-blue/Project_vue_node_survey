<template>
  <li id="survey__form">
    <!-- 설문지 제목 -->
    <form class="survey__form shadow" v-if="kinds === SURVEY_KINDS.TITLE">
      <title-input v-model="surveyTitle"></title-input>
    </form>

    <!-- 짧은 주관식 -->
    <form
      class="survey__form shadow"
      v-else-if="kinds === SURVEY_KINDS.SHORT_SUBJECTIVE"
    >
      <short-subjective-input
        :index="index"
        @changeForm="changeForm"
      ></short-subjective-input>
    </form>

    <!-- 긴 주관식 -->
    <form
      class="survey__form shadow"
      v-else-if="kinds === SURVEY_KINDS.LONG_SUBJECTIVE"
    >
      <long-subjective-input
        :index="index"
        @changeForm="changeForm"
      ></long-subjective-input>
    </form>

    <!-- 객관식 -->
    <template v-else-if="kinds === SURVEY_KINDS.MULTIPLE_CHOICE">
      <div class="title">객관식</div>
    </template>
  </li>
</template>

<script>
import TitleInput from "@/components/common/TitleInput.vue";
import ShortSubjectiveInput from "@/components/common/ShortSubjectiveInput.vue";
import LongSubjectiveInput from "@/components/common/LongSubjectiveInput.vue";

export default {
  name: "SurveyForm",
  components: {
    TitleInput,
    ShortSubjectiveInput,
    LongSubjectiveInput,
  },
  props: {
    kinds: {
      type: Number,
      default: 1,
    },
    index: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      surveyTitle: "",
    };
  },
  methods: {
    changeForm(...args) {
      // 바꿀폼의 번호, 바꿀 폼의 종류 전달
      this.$emit("changeForm", ...args);
    },
  },
};
</script>

<style scoped>
#survey__form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.survey__form {
  min-width: 768px;
  padding: 2em;
  margin: 2em 0;
  border: 1px solid black;
  border-radius: 0.25em;
  border-top: 10px solid rgb(103, 58, 183);
  /* 나중에 추가 포커스되면 왼쪽보더 */
  /* border-left: 5px solid #4285f4; */
}
</style>
