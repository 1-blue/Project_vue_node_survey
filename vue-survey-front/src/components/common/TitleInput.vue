<template>
  <div class="wrapper">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="survey__title"
      placeholder="설문지 제목"
    />
    <span />
  </div>
</template>

<script>
export default {
  name: "TitleInput",
  props: {
    modelValue: {
      type: String,
      require: true,
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}

.survey__title {
  width: 100%;
  height: 8vh;
  background: transparent;
  border: 0;
  border-bottom: 1px solid grey;
  font-size: 2em;
  font-weight: bold;
}

/* focue시 파란밑줄 */
.wrapper > span {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0px;
  height: 2.5px;
  background: blue;
  transition: all 0.3s;
}

.survey__title:focus + span {
  width: 100%;
}

.survey__title:focus {
  outline: none;
}
</style>
