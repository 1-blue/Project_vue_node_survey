import axios from "axios";
import store from "@/store/index.js";

// axios인스턴스생성
const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

// request인터셉터 설정 ( 토큰값 넘겨주기위함 )
instance.interceptors.request.use(
  config => {
    // 토큰값넣기
    config.headers.Authorization = store.state.token;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 관리자 로그인 확인
async function loginAdmin(password) {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await instance.post("/admin", { password });
    return data;
  } catch (error) {
    throw error;
  }
}

// 설문지 생성
async function createSurvey(survey) {
  //eslint-disable-next-line no-useless-catch
  try {
    const data = await instance.post("/survey", survey);
    return data;
  } catch (error) {
    throw error;
  }
}

// 설문지 전체 가져오기
async function fetchSurvey() {
  //eslint-disable-next-line no-useless-catch
  try {
    const data = await instance.get("/survey");
    return data;
  } catch (error) {
    throw error;
  }
}

// 특정 설문지 가져오기
async function fetchOneSurvey(surveyId) {
  //eslint-disable-next-line no-useless-catch
  try {
    const data = await instance.get(`/survey/${surveyId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

// 설문지 수정
async function editSurvey(surveyId, survey) {
  //eslint-disable-next-line no-useless-catch
  try {
    const data = await instance.put(`/survey/${surveyId}`, survey);
    return data;
  } catch (error) {
    throw error;
  }
}

// 설문지 삭제
async function deleteSurvey(surveyId) {
  //eslint-disable-next-line no-useless-catch
  try {
    const data = await instance.delete(`/survey/${surveyId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

// 설문시작
async function postingSurvey(surveyId) {
  //eslint-disable-next-line no-useless-catch
  try {
    const data = await instance.put(`/survey/posting/${surveyId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

// 설문종료
async function endSurvey(surveyId) {
  //eslint-disable-next-line no-useless-catch
  try {
    const data = await instance.put(`/survey/end/${surveyId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

// 설문지 제출
async function surveySubmit(answerList) {
  //eslint-disable-next-line no-useless-catch
  try {
    const data = await instance.post(`/survey/submit`, answerList);
    return data;
  } catch (error) {
    throw error;
  }
}

// 설문지 결과보기
async function surveyShowResult(surveyId) {
  //eslint-disable-next-line no-useless-catch
  try {
    const data = await instance.get(`/survey/result/${surveyId}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  loginAdmin,
  createSurvey,
  fetchSurvey,
  fetchOneSurvey,
  editSurvey,
  deleteSurvey,
  postingSurvey,
  endSurvey,
  surveySubmit,
  surveyShowResult,
};
