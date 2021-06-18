<template>
  <section id="survey__add__button">
    <ul class="survey__add__btn__container">
      <!-- 설문지 종류 리스트 추가 -->
      <li class="survey__add__btn__default shadow" @click="routeAddSurveyPage">
        <i class="fas fa-plus icon__add"></i>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "AddSurveyButton",
  methods: {
    routeAddSurveyPage() {
      this.$router.push("/survey/add");
    },
  },
};
</script>

<style scoped>
#survey__add__button {
  padding-bottom: 10vh;
}

.survey__add__btn__container {
  display: flex;
  justify-content: center;
}

.survey__add__btn__default {
  width: 20vw;
  height: 20vw;
  border-radius: 1em;
  background: white;
  text-align: center;
  position: relative;
  cursor: pointer;
}

.survey__add__btn__default:hover {
  border: 1px solid blue;
}

.survey__add__btn__default:hover > .icon__add {
  color: blue;
}

.icon__add {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5em;
}
</style>
