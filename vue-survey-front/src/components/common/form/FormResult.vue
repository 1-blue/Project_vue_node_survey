<template>
  <section id="form__result">
    <div class="form__result__info shadow">총 응답 {{ responseNumber }}개</div>

    <ul
      class="form__result__container shadow"
      v-for="question in questionList"
      :key="question.id"
    >
      <li class="form__result__title">{{ question.title }}</li>
      <ul v-for="answer in answerList" :key="answer.id">
        <li v-for="a in answer" :key="a.id">
          <span v-if="a.QuestionId === question.id">
            {{ a.answer }}
          </span>
        </li>
      </ul>
    </ul>
  </section>
</template>

<script>
export default {
  name: "FormResult",
  props: {
    questionList: {
      type: Array,
      required: true,
    },
    answerList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    responseNumber() {
      if (this.answerList[1]) {
        return this.answerList[1].length;
      }
      return 0;
    },
  },
};
</script>

<style scoped>
#form__result {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form__result__info,
.form__result__container {
  min-width: 70%;
  min-height: 20vh;
  padding: 1rem 2rem;
  border-radius: 1rem;
  background: white;
  margin: 2rem 0;
}

.form__result__title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
