<template>
  <li id="survey__form">
    <transition name="fade" mode="out-in" appear>
      <form
        class="survey__form shadow"
        :class="dynamicClass"
        @click="isFocus = true"
        @focusout="isFocus = false"
      >
        <component
          :is="formName"
          :isFocus="isFocus"
          :index="index"
          :defaultTitle="form.title"
          :required="form.required"
          @change:form="changeForm"
          @delete:form="deleteForm"
          @toggle:required="toggleRequired"
          @update:title="updateTitle"
        ></component>
      </form>
    </transition>
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
  data() {
    return {
      surveyTitle: "",
      isFocus: false,
      isDelete: false,
    };
  },
  computed: {
    kinds() {
      return this.form.kinds;
    },
    formName() {
      switch (this.kinds) {
        case this.SURVEY_KINDS.TITLE:
          return "TitleInput";
        case this.SURVEY_KINDS.SHORT_SUBJECTIVE:
          return "ShortSubjectiveInput";
        case this.SURVEY_KINDS.LONG_SUBJECTIVE:
          return "LongSubjectiveInput";
        case this.SURVEY_KINDS.MULTIPLE_CHOICE:
          return "나중에추가할거임";
      }

      // 예외추가하기
      return "default";
    },
    dynamicClass() {
      return {
        survey__form__focus: this.isFocus,
        form__delete__effect: this.isDelete,
      };
    },
  },
  methods: {
    changeForm(...args) {
      // 바꿀폼의 번호, 바꿀 폼의 종류 전달
      this.$emit("change:form", ...args);
    },
    deleteForm(formIndex) {
      this.$emit("delete:form", formIndex);

      // 삭제 애니메이션 적용 ( 삭제는 EditSurveyPage에서 하기 때문에 삭제 트랜지션이 적용안되서 직접처리해줌 )
      this.isDelete = true;
      setTimeout(() => {
        this.isDelete = false;
        this.isFocus = false;
      }, 1000);
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
  position: relative;
}

.survey__form {
  min-width: 60vw;
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

@import "../css/transition.css";

@media screen and (max-width: 768px) {
  .survey__form {
    padding: 1.5em;
    margin: 1.5em 0;
    border: 0.75px solid black;
    border-radius: 0.2em;
    border-top: 7.5px solid rgb(103, 58, 183);
  }

  .survey__form__focus {
    border-left: 4px solid #4285f4;
  }
}
</style>
