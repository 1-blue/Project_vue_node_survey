<template>
  <section id="survey__list">
    <ul class="survey__container">
      <!-- 설문지들 grid로 배치해서 보여줌 -->
      <li class="survey shadow" v-for="survey in surveyList" :key="survey.id">
        <!-- 설문지 제목, 생성시간, 간단한 내용 -->
        <survey-contents :survey="survey"></survey-contents>

        <!-- 설문지 수정, 삭제, 활성화, 설문하기 등의 버튼들 -->
        <survey-option-buttons
          :isAdmin="isAdmin"
          :survey="survey"
          @routeDoSurveyPage="routeDoSurveyPage"
          @routeEditSurveyPage="routeEditSurveyPage"
          @removeSurvey="removeSurvey"
          @changeSurveyState="changeSurveyState"
        ></survey-option-buttons>
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
import SurveyContents from "@/components/common/survey/SurveyContents.vue";
import SurveyOptionButtons from "@/components/common/survey/SurveyOptionButtons.vue";

export default {
  name: "SurveyList",
  components: {
    SurveyContents,
    SurveyOptionButtons,
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      surveyList: [],
    };
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
    routeDoSurveyPage(surveyId) {
      this.$router.push({
        name: "SurveyDoPage",
        params: { surveyId },
      });
    },
    routeEditSurveyPage(surveyId) {
      this.$router.push({
        name: "SurveyEditPage",
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
    async changeSurveyState(surveyId, surveyState) {
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
};
</script>

<style scoped>
.survey__container {
  display: grid;
  grid-template-rows: repeat(auto-fit, auto);
  grid-template-columns: repeat(auto-fit, 25%);
  gap: 1em;
  place-items: center;
  place-content: center;

  background: blue;
  width: 90%;
  padding: 2rem;
  margin: auto;
  margin-bottom: 2rem;
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
}

.survey:hover {
  border: 4px solid green;
  background: rgba(0, 0, 0, 0.8);
}

@media screen and (max-width: 768px) {
  .survey {
    border-radius: 0.75em;
  }

  .survey:hover {
    border: 2.75px solid green;
  }

  .survey__title {
    font-weight: 600;
  }
}
</style>
