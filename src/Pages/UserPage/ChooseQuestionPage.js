import { useState } from "react";
import "antd/dist/antd.css";
import { Typography, InputNumber, Button } from "antd";
import { getUserQuestions } from "../../api";
import { useAuth } from "../../context/ContextProvider";
import { useNavigate, Navigate } from "react-router-dom";
import _ from "lodash";
import { PlayCircleOutlined } from '@ant-design/icons'
import './chooseQuestion.scss'
import { ls } from "../../api/encyption";
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
      ls.set(
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
    <div className="ChooseQuestion">
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
        <Button type="danger" icon={<PlayCircleOutlined />} onClick={handlePlay}>Play</Button>
      </div>
    </div>
  );
};
export default ChooseQuestionPage;
