import { useState } from "react";
import "antd/dist/antd.css";
import { Typography, InputNumber, Button } from "antd";
import { getUserQuestions } from "../../api";
import { useAuth } from "../../context/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";
import _ from "lodash";
const ChooseQuestionPage = () => {
  const [input, setInput] = useState(1);
  const navigate = useNavigate();

  const { quizData, setQuizData } = useAuth();
  if (!_.isEmpty(quizData)) {
    {
      console.log(quizData);
    }
    return <Navigate to="/user/question" />;
  }
  const handlePlay = async () => {
    try {
      const { data } = await getUserQuestions(input);
      localStorage.setItem(
        "quizData",
        JSON.stringify({
          questions: data.results,
          totalQues: input,
          currentQues: 1,
        })
      );
      setQuizData({
        questions: data.results,
        totalQues: input,
        currentQues: 1,
      });
      navigate(`/user/question`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Typography.Title level={2}>
        Please choose the number of questions
      </Typography.Title>
      <InputNumber
        min={1}
        max={40}
        defaultValue={input}
        onChange={(value) => setInput(value)}
      />
      <Button onClick={handlePlay}>Play</Button>
    </div>
  );
};
export default ChooseQuestionPage;
