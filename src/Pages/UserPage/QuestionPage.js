import Question from "../../Components/Question";
import { useAuth } from "../../context/ContextProvider";
import { useState } from "react";
import SpinFC from "antd/lib/spin";
import './questionPage.scss'
const QuestionPage = () => {
  const {
    quizData: { currentQues, totalQues, questions },
  } = useAuth();
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading ? (
        <div className="spin-wrapper">
          <SpinFC />
        </div>
      ) : (
        <Question
          setLoading={setLoading}
          currentQues={currentQues}
          totalQues={totalQues}
          questions={questions}
        />
      )}
    </>
  );
};
export default QuestionPage;
