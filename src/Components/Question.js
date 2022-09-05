import "antd/dist/antd.css";
import { useState } from "react";
import { Typography, Button, Modal } from "antd";
import { useAuth } from "../context/ContextProvider";
import { submitQuestions } from "../api";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const Question = ({ currentQues, totalQues, questions, setLoading }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setQuizData, quizData } = useAuth();
  const answers = ["answer1", "answer2", "answer3", "answer4"];
  const handleCancel = () => {
    setIsModalOpen(false)
  }
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
    <div>
      <button onClick={() => setIsModalOpen(!isModalOpen)}>change modal</button>
      <Title level={2}>
        Question {currentQues}/{totalQues}
      </Title>
      <Title level={3}>{questions[currentQues - 1].question}</Title>
      {answers.map((answer) => (
        <Button
          key={answer}
          block
          size="middle"
          type={
            questions[currentQues - 1]?.checkedQuestion === `${answer}`
              ? "primary"
              : "default"
          }
          onClick={() => handleChooseQuestion(answer)}
        >
          {questions[currentQues - 1][answer]}
        </Button>
      ))}

      <Button
        disabled={currentQues === 1}
        onClick={() =>
          setQuizData({ ...quizData, currentQues: currentQues - 1 })
        }
      >
        Prev
      </Button>
      <Button
        onClick={() => {
          if (currentQues !== totalQues) {
            localStorage.setItem(
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
      <Modal title='Basic Modal' visibility={isModalOpen} onCancel={handleCancel} onOk={handleSubmit}>
        <p>Do you want to submit questions?</p>
      </Modal>
    </div>
  );
};
export default Question;
