import axios from "axios";

import { ls } from "./encyption";
const baseURL = process.env.REACT_APP_BASEURL;

console.log(process.env)

const API = axios.create({
  baseURL,
});
API.interceptors.request.use(
  (config) => {
    const token = ls.get("access_token");
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
          ls.get("refresh_token")
        );
        ls.set("access_token", data.access.token);
        ls.set("refresh_token", data.refresh.token);
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
export const getQuestions = (page, limit) => API.get(`/questions/edit?page=${page}&limit=${limit}`);
export const createQuestion = ({ question, answer1, answer2, answer3, answer4, correctanswer, }) =>
  API.post("/questions/edit", { question, answer1, answer2, answer3, answer4, correctanswer, });
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

export const getUsers = (page, limit) => API.get(`/users?page=${page}&limit=${limit}`)
export const getUser = (userId) => API.get(`/users/${userId}`)
export const updateUser = ({ username, password, email, role }, userId) => API.patch(`/users/${userId}`, { username, password, email, role })
export const createUser = ({ username, password, email, role }) => API.post(`/users`, { username, password, email, role })
export const deleteUser = (userId) => API.delete(`/users/${userId}`)