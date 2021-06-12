require("dotenv").config();
const router = require("express").Router();
const adminAuth = require("../middlewares/authorization.js");
const { Survey, Question } = require("../models/index.js");
const QUESTION_KINDS = require("../global/questionKinds.js");
const SURVEY_STATE = require("../global/surveyState.js");

// 설문지 및 질문 생성
router.post("/", adminAuth, async (req, res) => {
  const survey = req.body;

  try {
    // 질문지 생성
    const { id: SurveyId } = await Survey.create({
      title: survey[0].title,
      state: SURVEY_STATE.PENDING,
    });

    // 질문들 생성
    for (let question of survey) {
      if (question.kinds === QUESTION_KINDS.TITLE) continue;

      await Question.create({
        title: question.title,
        kinds: question.kinds,
        required: question.isRequired,
        SurveyId,
      });
    }

    res.json({ msg: "Creation completed" });
  } catch (error) {
    res.status(400).json(error);
  }
});

// 설문지 및 설문지제목 가져오기 ( 질문은 안가져감... 설문지 수정 or 설문시 가져갈 예정 )
router.get("/", adminAuth, async (req, res) => {
  try {
    const surveyList = await Survey.findAll();

    // 질문도 가져오는 코드
    // const surveyList = await Survey.findAll({
    //   include: [{ model: Question }],
    // });

    res.json(surveyList);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
