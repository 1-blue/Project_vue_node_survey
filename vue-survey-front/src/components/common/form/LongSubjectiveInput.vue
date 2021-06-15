<template>
  <div id="long__subjective__input">
    <!-- 제목 영역 -->
    <div class="wrapper">
      <input
        type="text"
        class="survey__title"
        placeholder="질문 제목"
        @change="updateTitle"
        v-model="title"
        :disabled="isAnswer"
      />
      <span />
    </div>

    <!-- 답변 영역 -->
    <textarea
      class="survey__answer__textarea"
      placeholder="장문 텍스트"
      rows="10"
      :disabled="!isAnswer"
    />

    <template v-if="!isAnswer">
      <!-- 설문지 종류 선택 -->
      <select-form v-model="selected"></select-form>

      <div class="option__btn">
        <!-- 필수 체크 토글 버튼 -->
        <form-require-toggle-button
          :required="required"
          @toggle:required="toggleRequired"
        ></form-require-toggle-button>

        <!-- 폼 삭제 버튼 -->
        <form-delete-button @delete:form="deleteForm"></form-delete-button>
      </div>
    </template>

    <template v-else>
      <!-- 설문지 제출버튼 추가 -->
    </template>
  </div>
</template>

<script>
import SelectForm from "@/components/common/form/SelectForm.vue";
import FormDeleteButton from "@/components/common/form/FormDeleteButton.vue";
import FormRequireToggleButton from "@/components/common/form/FormRequireToggleButton.vue";

export default {
  name: "ShortSubjectiveInput",
  components: {
    SelectForm,
    FormDeleteButton,
    FormRequireToggleButton,
  },
  props: {
    index: {
      type: Number,
      require: true,
    },
    defaultTitle: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      required: true,
    },
    isAnswer: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selected: this.SURVEY_KINDS.LONG_SUBJECTIVE,
      title: "",
    };
  },
  watch: {
    selected(newValue) {
      // 폼번호, 바꿀폼순으로 전달
      this.$emit("change:form", this.index, newValue);
    },
    defaultTitle(newValue) {
      this.title = newValue;
    },
  },
  created() {
    this.title = this.defaultTitle;
  },
  methods: {
    deleteForm() {
      this.$emit("delete:form", this.index);
    },
    toggleRequired() {
      this.$emit("toggle:required", this.index);
    },
    updateTitle() {
      this.$emit("update:title", this.index, this.title);
    },
  },
};
</script>

<style scoped>
#long__subjective__input {
  position: relative;
}

.survey__title:focus {
  outline: none;
}

@import "../../../css/surveyForm.css";
</style>
