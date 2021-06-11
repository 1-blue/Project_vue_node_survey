import axios from "axios";
import store from "@/store/index.js";

// axios인스턴스생성
const admin = axios.create({
  baseURL: "http://localhost:3000/admin",
  timeout: 1000,
});

// request인터셉터 설정 ( 토큰값 넘겨주기위함 )
admin.interceptors.request.use(
  config => {
    // 토큰값넣기
    config.headers.Authorization = store.state.token;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

async function loginAdmin(password) {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await admin.post("/", { password });
    return data;
  } catch (error) {
    throw error;
  }
}

export { loginAdmin };
