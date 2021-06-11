<template>
  <!-- 설문지 종류 선택 -->
  <select
    name="kinds"
    class="survey__kinds__select"
    :value="modelValue"
    @input="$emit('update:modelValue', +$event.target.value)"
  >
    <option :value="SURVEY_KINDS.SHORT_SUBJECTIVE" selected>단답형</option>
    <option :value="SURVEY_KINDS.LONG_SUBJECTIVE">장문형</option>
    <option :value="SURVEY_KINDS.MULTIPLE_CHOICE">객관식</option>
  </select>
</template>

<script>
export default {
  name: "SelectOption",
  props: {
    modelValue: {
      type: Number,
      require: true,
    },
  },
};
</script>

<style scoped>
.survey__kinds__select {
  position: absolute;
  top: 50%;
  right: 0;
}
</style>
