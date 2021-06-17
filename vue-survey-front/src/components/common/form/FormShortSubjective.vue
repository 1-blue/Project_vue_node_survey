<template>
  <div id="form__short__subjective">
    <!-- 제목 영역 -->
    <div class="wrapper">
      <input
        type="text"
        placeholder="질문 제목"
        :disabled="isAnswer"
        class="survey__form__short__title"
        :class="{ isAnswer: isAnswer }"
        @change="$emit('update:title', index, title)"
        v-model.trim="title"
      />
      <span />
    </div>

    <!-- 답변 영역 -->
    <div class="wrapper">
      <input
        class="survey__form__short__answer"
        placeholder="단답형 텍스트"
        :disabled="!isAnswer"
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
      <!-- 설문지 제출버튼 추가 answerSubmit -->
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
      required: true,
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
      selected: this.SURVEY_KINDS.SHORT_SUBJECTIVE,
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
};
</script>

<style scoped>
#form__short__subjective {
  position: relative;
}

@import "../../../css/form.css";
</style>
