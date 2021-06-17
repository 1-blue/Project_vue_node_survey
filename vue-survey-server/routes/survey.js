require("dotenv").config();
const router = require("express").Router();
const adminAuth = require("../middlewares/authorization.js");
const { Survey, Question } = require("../models/index.js");
const QUESTION_KINDS = require("../global/questionKinds.js");
const SURVEY_STATE = require("../global/surveyState.js");

// 설문지 및 질문 생성
router.post("/", adminAuth, async (req, res) => {
  const survey = req.body;

  console.log("createSurvey >> ", survey);

  try {
    // 질문지 생성
    const { id: SurveyId } = await Survey.create({
      title: survey[0].title,
      subTitle: survey[0].subTitle,
      state: SURVEY_STATE.PENDING,
    });

    // 질문들 생성
    for (let question of survey) {
      if (question.kinds === QUESTION_KINDS.TITLE) continue;

      await Question.create({
        title: question.title,
        kinds: question.kinds,
        required: question.required,
        SurveyId,
      });
    }

    res.json({ msg: "Creation completed" });
  } catch (error) {
    console.log("message >> ", error.message);
    // 설문조사 제목이 이미 존재할 경우
    if (error.message === "Validation error") {
      return res.status(409).json(error);
    }

    // 그 이외에 다른 오류
    return res.status(400).json(error);
  }
});

// 설문지 및 설문지제목 가져오기 ( 질문은 안가져감... 설문지 수정 or 설문시 가져갈 예정 )
router.get("/", adminAuth, async (req, res) => {
  try {
    const surveyList = await Survey.findAll();

    res.json(surveyList);
  } catch (error) {
    res.status(400).json(error);
  }
});

// 하나의 설문지 상세내용 가져오기
router.get("/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const survey = await Survey.findOne({
      where: { id },
      include: [{ model: Question }],
    });

    res.json(survey);
  } catch (error) {
    res.status(400).json(error);
  }
});

// 설문지 및 질문 수정
router.put("/:id", adminAuth, async (req, res) => {
  const { id } = req.params;
  const survey = req.body;

  try {
    // 설문지 수정
    const updatedSurvey = await Survey.update(
      { title: survey[0].title, subTitle: survey[0].subTitle },
      { where: { id } },
    );

    // 질문 생성 or 수정
    for (let question of survey) {
      if (question.kinds === QUESTION_KINDS.TITLE) continue;

      // 질문 수정
      if (question.id) {
        await Question.update(
          {
            title: question.title,
            kinds: question.kinds,
            required: question.required,
          },
          {
            where: { id: question.id },
          },
        );
      }
      // 질문 생성
      else {
        await Question.create({
          title: question.title,
          kinds: question.kinds,
          required: question.required,
          SurveyId: id,
        });
      }
    }

    res.json(updatedSurvey);
  } catch (error) {
    // 중복타이틀
    if (error.message === "Validation error") {
      return res.status(409).json(error);
    }
    return res.status(400).json(error);
  }
});

// 설문지 삭제
router.delete("/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSurvey = await Survey.destroy({ where: { id } });

    res.json(deletedSurvey);
  } catch (error) {
    res.status(400).json(error);
  }
});

// 설문 게시
router.put("/posting/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const postedSurvey = await Survey.update(
      { state: SURVEY_STATE.POSTING },
      { where: { id } },
    );

    res.json(postedSurvey);
  } catch (error) {
    res.status(400).json(error);
  }
});

// 설문 종료
router.put("/end/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const postedSurvey = await Survey.update(
      { state: SURVEY_STATE.END },
      { where: { id } },
    );

    res.json(postedSurvey);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
