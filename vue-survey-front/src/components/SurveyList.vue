<template>
  <section id="survey__list">
    <ul class="survey__container">
      <li class="survey shadow" v-for="survey in surveyList" :key="survey.id">
        <section class="survey__contents">
          <span class="survey__title">{{ survey.title }}</span>
          <span class="survey__time">
            <i class="far fa-clock"></i>
            {{ $filters.formatDate(survey.createdAt) }}
          </span>
        </section>
        <section class="survey__btn__list">
          <button type="button" @click="routeEdit(survey.id)">수정</button>
          <button type="button" @click="removeSurvey(survey.id)">삭제</button>
          <button
            type="button"
            @click="changeStateSurvey(survey.id, survey.state)"
          >
            {{ state(survey.state) }}
          </button>
        </section>
      </li>
    </ul>
  </section>
</template>

<script>
import {
  fetchSurvey,
  deleteSurvey,
  postingSurvey,
  endSurvey,
} from "@/api/index.js";

export default {
  name: "SurveyList",
  data() {
    return {
      surveyList: [],
    };
  },
  methods: {
    state(state) {
      switch (state) {
        case 0:
          return "게시";
        case 1:
          return "종료";
        default:
          return "??";
      }
    },
    routeEdit(surveyId) {
      this.$router.push({
        name: "EditSurveyPage",
        params: { surveyId },
      });
    },
    async removeSurvey(surveyId) {
      try {
        await deleteSurvey(surveyId);
      } catch (error) {
        switch (error.response.status) {
          case 400:
            alert("나중에 처리하자");
            break;

          default:
            alert(
              "알 수 없는 오류로 설문지 삭제에 실패했습니다. by SurveyList.vue",
            );
            break;
        }
      }
    },
    async changeStateSurvey(surveyId, surveyState) {
      try {
        switch (surveyState) {
          case this.SURVEY_STATE.PENDING:
            await postingSurvey(surveyId);
            break;
          case this.SURVEY_STATE.POSTING:
            await endSurvey(surveyId);
            break;

          default:
            alert("이미 종료된 설문입니다. by SurveyList.vue");
            break;
        }
      } catch (error) {
        switch (error.response.status) {
          case 400:
            alert("나중에 처리하자");
            break;

          default:
            alert(
              "알 수 없는 오류로 설문지 게시에 실패했습니다. by SurveyList.vue",
            );
            break;
        }
      }
    },
  },
  async created() {
    try {
      const { data: surveyList } = await fetchSurvey();
      this.surveyList = surveyList;
    } catch (error) {
      switch (error.response.status) {
        case 400:
          alert(
            "서버측 에러입니다. 잠시후에 다시시도해주세요. by SurveyList.vue",
          );
          break;

        default:
          alert(
            "알 수 없는 에러입니다. 잠시후에 다시시도해주세요 by SurveyList.vue",
          );
          break;
      }
    }
  },
};
</script>

<style scoped>
.survey__container {
  display: flex;
  justify-content: center;
}

.survey {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 20vw;
  height: 20vw;
  border-radius: 1em;
  background: white;
  text-align: center;
  cursor: pointer;
  margin: auto;
}

.survey:hover {
  border: 2 px solid lightskyblue;
  background: rgba(0, 0, 0, 0.8);
}

.survey__contents {
  display: flex;
  flex-direction: column;
}

.survey__title {
  font-size: 1.5em;
  font-weight: bold;
}

.survey__time {
  font-size: 0.5em;
}

.survey__btn__list {
  display: none;
  margin-bottom: 1em;
}

.survey__btn__list > button {
  border: none;
  border-radius: 50%;
  width: 4em;
  height: 4em;
  background: lightblue;
  color: white;
  cursor: pointer;
}

.survey:hover > .survey__btn__list {
  display: flex;
  justify-content: space-evenly;
}
</style>
