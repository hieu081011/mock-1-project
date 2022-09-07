import { Typography, Button, Table } from "antd";
import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import AddQuestionForm from "../../Components/AddQuestionForm";
import { getQuestions } from "../../api";
import { useNavigate } from "react-router-dom";
import './questionManagement.scss'
import { useQuery } from "../../hooks/useQuery";
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
  const query = useQuery()
  const navigate = useNavigate();
  const [tableLoading, setTableLoading] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [total, setTotal] = useState(1)
  const [limit, setLimit] = useState(10)
  const page = query.get('page') || 1
  useEffect(() => {
    async function getQuestionsData() {
      try {
        setTableLoading(true);
        const { data } = await getQuestions(page, limit);
        setTableLoading(false);
        setTotal(data.totalResults)
        setQuestionsData(data.results);

      } catch (error) {
        console.log(error);
      }
    }
    getQuestionsData();
  }, [page, limit]);
  return (
    <div className="QuestionsManagement">
      <div className="header">

        <Title level={2}>Questions Management</Title>
      </div>
      <Button shape='round' type="dashes" danger onClick={() => setShowAddForm(!showAddForm)}>
        Show Add question form
      </Button>
      {showAddForm && <AddQuestionForm />}
      <Table
        pagination={{
          current: page,
          pageSize: limit,
          total: total,
          showSizeChanger: true,
          onShowSizeChange: (current, pageSize) => { setLimit(pageSize); },
          pageSizeOptions: [10, 15, 20],
        }}

        rowKey={"question"}
        columns={columns}
        dataSource={questionsData}
        loading={tableLoading}
        onChange={(p) => { navigate(`/admin?page=${p.current}`) }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (e) => navigate(`/admin/question/${record.id}`),
          };
        }}
      ></Table>
    </div>
  );
};
export default QuestionsManage;
