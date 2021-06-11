<template>
  <div id="long__subjective__input">
    <!-- 설문지 종류 선택 -->
    <select-option v-model="selected"></select-option>

    <!-- 제목 영역 -->
    <div class="wrapper">
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="survey__title"
        placeholder="질문 제목"
      />
      <span />
    </div>

    <!-- 답변 영역 -->
    <textarea
      class="survey__answer__textarea"
      placeholder="장문 텍스트"
      rows="10"
    />
  </div>
</template>

<script>
import SelectOption from "@/components/common/SelectOption.vue";

export default {
  name: "ShortSubjectiveInput",
  components: {
    SelectOption,
  },
  props: {
    modelValue: {
      type: String,
      require: true,
    },
    index: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      selected: this.SURVEY_KINDS.LONG_SUBJECTIVE,
    };
  },
  // 잠시 대체 watch공부하고 교체할 생각
  updated() {
    // 폼번호, 바꿀폼순으로 전달
    this.$emit("changeForm", this.index, this.selected);
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

@import "../../css/surveyForm.css";
</style>
