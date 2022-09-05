import { Typography, Button, Table } from "antd";
import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import AddQuestionForm from "../../Components/AddQuestionForm";
import { getQuestions } from "../../api";
import { useNavigate } from "react-router-dom";
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
];

const QuestionsManage = () => {
  const navigate = useNavigate();
  const [tableLoading, setTableLoading] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  useEffect(() => {
    async function getQuestionsData() {
      try {
        setTableLoading(true);
        const { data } = await getQuestions();
        setTableLoading(false);
        setQuestionsData(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    getQuestionsData();
  }, []);
  return (
    <div>
      <Title level={2}>Questions Management</Title>
      <Button onClick={() => setShowAddForm(!showAddForm)}>
        Show Add question form
      </Button>
      {showAddForm && <AddQuestionForm />}
      <Table
        rowKey={"question"}
        columns={columns}
        dataSource={questionsData}
        loading={tableLoading}
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => navigate(`/admin/question/${record.id}`),
          };
        }}
      />
    </div>
  );
};
export default QuestionsManage;
