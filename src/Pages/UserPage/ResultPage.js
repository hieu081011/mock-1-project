import { Table, Typography, Button } from "antd";
import "antd/dist/antd.css";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/ContextProvider";
import './result.scss'
const { Title } = Typography;
const columns = [
  {
    title: "Index",
    dataIndex: "index",
  },
  {
    title: "Question",
    dataIndex: "question",
  },
  {
    title: "Your Answer",
    dataIndex: "answer",
  },
  {
    title: "Result",
    dataIndex: "result",
  },
];
const ResultPage = () => {
  const { quizData, setQuizData } = useAuth();
  const location = useLocation();
  const [showReview, setShowReview] = useState(false);
  const navigate = useNavigate();
  if (!location.state) return <Navigate to="/login" />;
  const correct = location.state.reduce((prev, current) => {
    if (current.result) prev++;
    return prev;
  }, 0);
  const total = location.state.length;
  const reviewData = location.state.map((question, index) => {
    return {
      key: quizData.questions[index].question,
      index: index + 1,
      question: quizData.questions[index].question,
      answer: question.correctanswer,
      result: question.result ? "True" : "False",
    };
  });
  const handleReplay = () => {
    localStorage.removeItem("quizData");
    setQuizData({});
    navigate("/user");
  };
  return (
    <div className="Result">
      <div className="final-score">
        <Title level={2}>Here is your result</Title>
        <Title level={2}>
          {correct}/{total}
        </Title>
        <div className="buttons">

          <Button shape='round' onClick={() => setShowReview(!showReview)}>
            Review your questions
          </Button>
          <Button shape='round' onClick={handleReplay}>Replay</Button>
        </div>

      </div>
      {showReview && <Table pagination={{ defaultPageSize: 4 }} columns={columns} dataSource={reviewData} />}
    </div>
  );
};
export default ResultPage;
