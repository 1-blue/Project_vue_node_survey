<template>
  <section id="survey__option__buttons">
    <template v-if="isAdmin">
      <button type="button" @click="$emit('routeEditSurveyPage', survey.id)">
        수정
      </button>
      <button type="button" @click="$emit('removeSurvey', survey.id)">
        삭제
      </button>
      <button type="button" @click="$emit('changeSurveyState', survey)">
        {{ state }}
      </button>
    </template>
    <template v-else>
      <button type="button" @click="$emit('routeDoSurveyPage', survey.id)">
        설문하러가기
      </button>
    </template>
  </section>
</template>

<script>
export default {
  name: "SurveyOptionButtons",
  props: {
    survey: {
      type: Object,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    state() {
      switch (this.survey.state) {
        case this.SURVEY_STATE.PENDING:
          return "게시";
        case this.SURVEY_STATE.POSTING:
          return "종료";
        default:
          return "??";
      }
    },
  },
};
</script>

<style scoped>
#survey__option__buttons {
  display: none;
  margin-bottom: 1em;
}

#survey__option__buttons > button {
  border: none;
  border-radius: 20%;
  width: 20%;
  height: 100%;
  padding: 1vw 0;
  background: rgba(255, 255, 255, 0.4);
  color: black;
  font-size: 0.7vw;
  font-weight: bold;
  cursor: pointer;
}

#survey__option__buttons > button:hover {
  border: 2px solid blue;
}

.survey:hover > #survey__option__buttons {
  display: flex;
  justify-content: space-evenly;
}

@media screen and (max-width: 768px) {
  #survey__option__buttons {
    display: none;
    margin-bottom: 0.75em;
  }

  #survey__option__buttons > button {
    width: 25%;
    font-weight: 600;
  }

  #survey__option__buttons > button:hover {
    border: 1px solid blue;
  }
}
</style>
