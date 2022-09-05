import UsersManage from "../Pages/Admin/UsersManage";
import ChooseQuestionPage from "../Pages/UserPage/ChooseQuestionPage";
import Result from "../Pages/UserPage/ResultPage";
import QuestionsManage from "../Pages/Admin/QuestionsManage";
import QuestionDetail from "../Pages/Admin/QuestionDetail";
import UserDetail from "../Pages/Admin/UserDetail";
import QuestionPage from "../Pages/UserPage/QuestionPage";
export const routes = [
  {
    path: "/user",
    element: <ChooseQuestionPage />,
    roles: ["user"],
  },
  {
    path: "/user/question",
    element: <QuestionPage />,
    roles: ["user"],
  },
  {
    path: "/user/result",
    element: <Result />,
    roles: ["user"],
  },
  {
    path: "/admin/",
    element: <QuestionsManage />,
    roles: ["admin"],
  },
  {
    path: "/admin/question/:questionId",
    element: <QuestionDetail />,
    roles: ["admin"],
  },
  {
    path: "/admin/user",
    element: <UsersManage />,
    roles: ["admin"],
  },
  {
    path: "/admin/user/:userid",
    element: <UserDetail />,
    roles: ["admin"],
  },
];
