<template>
  <li id="survey__form">
    <!-- 설문지 제목 -->
    <form
      class="survey__form shadow"
      :class="{ survey__form__focus: isFocus }"
      v-if="kinds === SURVEY_KINDS.TITLE"
      @click="isFocus = true"
      @focusout="isFocus = false"
    >
      <title-input
        :index="index"
        :defaultTitle="form.title"
        :isFocus="isFocus"
        @update:title="updateTitle"
      ></title-input>
    </form>

    <!-- 짧은 주관식 -->
    <form
      class="survey__form shadow"
      :class="{ survey__form__focus: isFocus }"
      v-else-if="kinds === SURVEY_KINDS.SHORT_SUBJECTIVE"
      @click="isFocus = true"
      @focusout="isFocus = false"
    >
      <short-subjective-input
        :index="index"
        :defaultTitle="form.title"
        :required="form.required"
        :isFocus="isFocus"
        @change:form="changeForm"
        @delete:form="deleteForm"
        @toggle:required="toggleRequired"
        @update:title="updateTitle"
      ></short-subjective-input>
    </form>

    <!-- 긴 주관식 -->
    <form
      class="survey__form shadow"
      :class="{ survey__form__focus: isFocus }"
      v-else-if="kinds === SURVEY_KINDS.LONG_SUBJECTIVE"
      @click="isFocus = true"
      @focusout="isFocus = false"
    >
      <long-subjective-input
        :index="index"
        :defaultTitle="form.title"
        :required="form.required"
        :isFocus="isFocus"
        @change:form="changeForm"
        @delete:form="deleteForm"
        @toggle:required="toggleRequired"
        @update:title="updateTitle"
      ></long-subjective-input>
    </form>

    <!-- 객관식 -->
    <template v-else-if="kinds === SURVEY_KINDS.MULTIPLE_CHOICE">
      <div class="title">객관식</div>
    </template>
  </li>
</template>

<script>
import TitleInput from "@/components/common/form/TitleInput.vue";
import ShortSubjectiveInput from "@/components/common/form/ShortSubjectiveInput.vue";
import LongSubjectiveInput from "@/components/common/form/LongSubjectiveInput.vue";

export default {
  name: "SurveyForm",
  components: {
    TitleInput,
    ShortSubjectiveInput,
    LongSubjectiveInput,
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    kinds() {
      return this.form.kinds;
    },
  },
  data() {
    return {
      surveyTitle: "",
      isFocus: false,
    };
  },
  methods: {
    changeForm(...args) {
      // 바꿀폼의 번호, 바꿀 폼의 종류 전달
      this.$emit("change:form", ...args);
    },
    deleteForm(formIndex) {
      this.$emit("delete:form", formIndex);
    },
    toggleRequired(formIndex) {
      this.$emit("toggle:required", formIndex);
    },
    updateTitle(formIndex, title) {
      this.$emit("update:title", formIndex, title);
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
  background: white;
}

.survey__form__focus {
  border-left: 5px solid #4285f4;
}
</style>
