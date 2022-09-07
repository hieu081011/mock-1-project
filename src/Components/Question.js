import "antd/dist/antd.css";
import { useState } from "react";
import { Typography, Button, Modal } from "antd";
import { useAuth } from "../context/ContextProvider";
import { submitQuestions } from "../api";
import { useNavigate } from "react-router-dom";
import './question.scss'
import { ls } from "../api/encyption";
const { Title } = Typography;
const Question = ({ currentQues, totalQues, questions, setLoading }) => {
  const navigate = useNavigate();

  const { setQuizData, quizData } = useAuth();
  const answers = ["answer1", "answer2", "answer3", "answer4"];

  const handleChooseQuestion = (value) => {
    setQuizData({
      ...quizData,
      questions: questions.map((question, index) => {
        if (index === currentQues - 1) {
          question["checkedQuestion"] = value;
        }
        return question;
      }),
    });
    console.log(quizData);
  };
  const handleSubmit = async () => {
    try {
      const submitdata = questions.map((question) => ({
        id: question.id,
        correctanswer: question.checkedQuestion
          ? question[question.checkedQuestion]
          : "didnt answer",
      }));
      setLoading(true);
      const { data } = await submitQuestions(submitdata);
      setLoading(false);
      navigate("/user/result", { state: data });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Question">
      <Title level={2}>
        Question {currentQues}/{totalQues}
      </Title>
      <div className="question">

        <Title level={3}>{questions[currentQues - 1].question}</Title>
      </div>
      <div className="answers">

        {answers.map((answer) => (
          <Button
            key={answer}
            block
            shape="round"
            size="large"
            type={
              questions[currentQues - 1]?.checkedQuestion === `${answer}`
                ? "danger"
                : "default"
            }
            onClick={() => handleChooseQuestion(answer)}
          >
            {questions[currentQues - 1][answer]}
          </Button>
        ))}
      </div>
      <div className="buttons">

        <Button
          shape="round"
          size="large"
          disabled={currentQues === 1}
          onClick={() =>
            setQuizData({ ...quizData, currentQues: currentQues - 1 })
          }
        >
          Prev
        </Button>
        <Button
          shape="round"
          size="large"
          onClick={() => {
            if (currentQues !== totalQues) {
              ls.set(
                "quizData",
                JSON.stringify({ ...quizData, currentQues: currentQues + 1 })
              );
              setQuizData({ ...quizData, currentQues: currentQues + 1 });
            } else {
              handleSubmit()
            }
          }}
        >
          Next
        </Button>
      </div>

    </div>
  );
};
export default Question;
