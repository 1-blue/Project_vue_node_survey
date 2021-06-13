<template>
  <div class="wrapper">
    <input
      type="text"
      class="survey__title"
      placeholder="설문지 제목"
      @change="$emit('update:title', index, title)"
      ref="formTitle"
      v-model="title"
      v-focus
    />
    <span />
  </div>
</template>

<script>
export default {
  name: "TitleInput",
  props: {
    index: {
      type: Number,
      required: true,
    },
    defaultTitle: {
      type: String,
      default: "",
    },
    isFocus: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: "",
    };
  },
  created() {
    this.title = this.defaultTitle;
  },
  watch: {
    isFocus(value) {
      if (value) {
        this.$refs.formTitle.focus();
      }
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

@media screen and (max-width: 768px) {
  .survey__title {
    height: 6vh;
    border-bottom: 0.75px solid grey;
    font-size: 1.5em;
    font-weight: 700;
  }

  .wrapper > span {
    height: 2px;
  }
}
</style>
