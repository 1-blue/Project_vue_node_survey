<template>
  <div id="long__subjective__input">
    <!-- 설문지 종류 선택 -->
    <select-option v-model="selected"></select-option>

    <!-- 제목 영역 -->
    <div class="wrapper">
      <input
        type="text"
        class="survey__title"
        placeholder="질문 제목"
        @change="updateTitle"
        v-model="title"
      />
      <span />
    </div>

    <!-- 답변 영역 -->
    <textarea
      class="survey__answer__textarea"
      placeholder="장문 텍스트"
      rows="10"
      disabled
    />

    <div class="option__btn">
      <!-- 필수 체크 토글 버튼 -->
      <form-require-toggle-btn
        :required="required"
        @toggle:required="toggleRequired"
      ></form-require-toggle-btn>

      <!-- 폼 삭제 버튼 -->
      <form-delete-btn @delete:form="deleteForm"></form-delete-btn>
    </div>
  </div>
</template>

<script>
import SelectOption from "@/components/common/form/SelectOption.vue";
import FormDeleteBtn from "@/components/common/form/FormDeleteBtn.vue";
import FormRequireToggleBtn from "@/components/common/form/FormRequireToggleBtn.vue";

export default {
  name: "ShortSubjectiveInput",
  components: {
    SelectOption,
    FormDeleteBtn,
    FormRequireToggleBtn,
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
  },
  data() {
    return {
      selected: this.SURVEY_KINDS.LONG_SUBJECTIVE,
      title: "",
    };
  },
  created() {
    this.title = this.defaultTitle;
  },
  watch: {
    selected(newValue) {
      // 폼번호, 바꿀폼순으로 전달
      this.$emit("change:form", this.index, newValue);
    },
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
