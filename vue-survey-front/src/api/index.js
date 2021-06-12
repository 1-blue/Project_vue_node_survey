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

async function createSurvey(survey) {
  //eslint-disable-next-line no-useless-catch
  try {
    const data = await instance.post("/survey", survey);
    return data;
  } catch (error) {
    throw error;
  }
}

async function fetchSurvey(survey) {
  //eslint-disable-next-line no-useless-catch
  try {
    const data = await instance.get("/survey", survey);
    return data;
  } catch (error) {
    throw error;
  }
}

export { loginAdmin, createSurvey, fetchSurvey };
