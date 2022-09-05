import axios from "axios";
import LocalStorageService from "./LocalStorageService";

const baseURL = 'https://fwa-ec-quiz-mock1.herokuapp.com/v1';



const API = axios.create({
  baseURL,
});
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
API.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url === `${baseURL}/auth/refresh-token`
    ) {
      localStorage.clear()
      window.location.replace("http://localhost:3000/login");
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest.retry) {
      originalRequest.retry = true;
      try {
        console.log("get api again");
        const { data } = await getNewTokens(
          localStorage.getItem("refresh_token")
        );
        localStorage.setItem("access_token", data.access.token);
        localStorage.setItem("refresh_token", data.refresh.token);
        axios.defaults.headers.common["Authorization"] =
          "Bearer" + localStorage.getItem("access_token");

        return API(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);

export const getNewTokens = (refreshToken) =>
  API.post("/auth/refresh-tokens", { refreshToken });
export const login = ({ username, password }) =>
  API.post("/auth/login", { username, password });
export const register = ({ username, password, email }) =>
  API.post("/auth/register", { username, password, email });
export const logout = (refreshToken) =>
  API.post("/auth/logout", { refreshToken });
export const getQuestion = (id) => API.get(`/questions/edit/${id}`);
export const getQuestions = () => API.get("/questions/edit?page=1&limit=300");
export const createQuestion = ({
  question,
  answer1,
  answer2,
  answer3,
  answer4,
  correctanswer,
}) =>
  API.post("/questions/edit", {
    question,
    answer1,
    answer2,
    answer3,
    answer4,
    correctanswer,
  });
export const deleteQuestion = (questionId) =>
  API.delete(`/questions/edit/${questionId}`);
export const updateQuestion = (
  { question, answer1, answer2, answer3, answer4, correctanswer },
  questionId
) =>
  API.patch(`/questions/edit/${questionId}`, {
    question,
    answer1,
    answer2,
    answer3,
    answer4,
    correctanswer,
  });
export const getUserQuestions = (questionsNumber) =>
  API.get(`/questions?page=1&limit=${questionsNumber}`);

export const submitQuestions = (submit) =>
  API.post("/questions/submit", submit);
