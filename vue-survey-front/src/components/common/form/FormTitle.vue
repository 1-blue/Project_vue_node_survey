<template>
  <div id="form__title">
    <!-- 설문지제목 -->
    <div class="wrapper">
      <input
        type="text"
        placeholder="설문지 제목"
        :disabled="isAnswer"
        class="survey__form__title__title"
        :class="{ isAnswer: isAnswer }"
        @change="$emit('update:title', index, title)"
        v-model.trim="title"
        v-focus
      />
      <span />
    </div>

    <!-- 설문지 서브 제목 -->
    <div class="wrapper">
      <textarea
        type="text"
        placeholder="설문지 부가설명"
        :disabled="isAnswer"
        class="survey__form__title__sub__title"
        :class="{ isAnswer: isAnswer }"
        @change="$emit('update:subTitle', index, subTitle)"
        @keydown="subTitleResize"
        @keyup="subTitleResize"
        v-model.trim="subTitle"
        ref="subTitle"
      />
      <span />
    </div>

    <strong style="color: red">* 필수항목</strong>
  </div>
</template>

<script>
export default {
  name: "FormTitle",
  props: {
    index: {
      type: Number,
      required: true,
    },
    defaultTitle: {
      type: String,
      default: "",
    },
    defaultSubTitle: {
      type: String,
      default: "",
    },
    isFocus: {
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
      title: "",
      subTitle: "",
    };
  },
  computed: {
    refSubTitle() {
      return this.$refs.subTitle;
    },
  },
  created() {
    this.title = this.defaultTitle;
    this.subTitle = this.defaultSubTitle;
  },
  mounted() {
    this.subTitleResize();
  },
  methods: {
    subTitleResize() {
      this.refSubTitle.style.height = "1px";
      this.refSubTitle.style.height = 12 + this.refSubTitle.scrollHeight + "px";
    },
  },
};
</script>

<style scoped>
@import "../../../css/form.css";

.wrapper > span {
  height: 2.5px;
}

@media screen and (max-width: 768px) {
  .wrapper > span {
    height: 2px;
  }
}
</style>
