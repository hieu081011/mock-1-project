import { Typography, Button, Table } from "antd";
import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import AddUserForm from "../../Components/AddUserForm";
import { getUsers } from "../../api";
import { useNavigate } from "react-router-dom";
import './userManage.scss'
import { useQuery } from "../../hooks/useQuery";
const { Title } = Typography;
const columns = [
    {
        title: "User Name",
        dataIndex: "username",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Role",
        dataIndex: "role",
    },
];

const UserManage = () => {
    const query = useQuery()
    const navigate = useNavigate();
    const [tableLoading, setTableLoading] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [total, setTotal] = useState(1)
    const [limit, setLimit] = useState(10)
    const page = query.get('page') || 1
    useEffect(() => {
        async function getUsersData() {
            try {
                setTableLoading(true);
                const { data } = await getUsers(page, limit);
                setTableLoading(false);
                setTotal(data.totalResults)
                setUsersData(data.results);

            } catch (error) {
                console.log(error);
            }
        }
        getUsersData();
    }, [page, limit]);
    return (
        <div className="UserManage">
            <div className="header">

                <Title level={2}>Users Management</Title>
            </div>
            <Button shape='round' type="dashes" danger onClick={() => setShowAddForm(!showAddForm)}>
                Show Add question form
            </Button>
            {showAddForm && <AddUserForm />}
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
                dataSource={usersData}
                loading={tableLoading}
                onChange={(p) => { navigate(`/admin/user?page=${p.current}`) }}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (e) => navigate(`/admin/user/${record.id}`),
                    };
                }}
            ></Table>
        </div>
    );
};
export default UserManage;
