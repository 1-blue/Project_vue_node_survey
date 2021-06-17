<template>
  <div id="form__long__subjective">
    <!-- 제목 영역 -->
    <div class="wrapper">
      <input
        type="text"
        placeholder="질문 제목"
        :disabled="isAnswer"
        class="survey__form__long__title"
        :class="{ isAnswer: isAnswer }"
        @change="$emit('update:title', index, title)"
        v-model.trim="title"
      />
      <span />
    </div>

    <!-- 답변 영역 -->

    <div class="wrapper">
      <textarea
        class="survey__form__long__answer"
        placeholder="장문 텍스트"
        :disabled="!isAnswer"
        rows="10"
        @keyup="textareaResize"
        @keydown="textareaResize"
        ref="textarea"
      />
      <span />
    </div>

    <template v-if="!isAnswer">
      <!-- 설문지 종류 선택 -->
      <form-select v-model="selected"></form-select>

      <div class="option__btn">
        <!-- 필수 체크 토글 버튼 -->
        <form-require-toggle-button
          :required="required"
          @toggle:required="$emit('toggle:required', index)"
        ></form-require-toggle-button>

        <!-- 폼 삭제 버튼 -->
        <form-delete-button
          @delete:form="$emit('delete:form', index)"
        ></form-delete-button>
      </div>
    </template>

    <template v-else>
      <!-- 설문지 제출버튼 추가 -->
    </template>
  </div>
</template>

<script>
import FormSelect from "@/components/common/form/FormSelect.vue";
import FormDeleteButton from "@/components/common/form/FormDeleteButton.vue";
import FormRequireToggleButton from "@/components/common/form/FormRequireToggleButton.vue";

export default {
  name: "FormShortSubjective",
  components: {
    FormSelect,
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
  computed: {
    textarea() {
      return this.$refs.textarea;
    },
  },
  created() {
    this.title = this.defaultTitle;
  },
  mounted() {
    this.textareaResize();
  },
  methods: {
    textareaResize() {
      this.textarea.style.height = "1px";
      this.textarea.style.height = 12 + this.textarea.scrollHeight + "px";
    },
  },
};
</script>

<style scoped>
#form__long__subjective {
  position: relative;
}

@import "../../../css/form.css";
</style>
