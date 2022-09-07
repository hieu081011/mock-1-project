import { Typography, Button, Spin } from "antd"
import 'antd/dist/antd.css';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, deleteUser } from "../../api";
import AddUserForm from "../../Components/AddUserForm";
import './userDetail.scss'
const { Title } = Typography
const UserDetail = () => {
    const [showEditForm, setShowEditForm] = useState(false)
    const { userid } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const handleDelete = async () => {
        try {
            await deleteUser(userid)
            alert('User is deleted')
            navigate('/admin/user')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        async function getUserAdmin() {
            try {
                setIsLoading(true)
                const { data } = await getUser(userid)
                setIsLoading(false)
                setUser(data)

            } catch (error) {
                console.log(error)
            }
        }
        getUserAdmin()
    }, [])
    return (
        <div className="UserDetail">
            <div className="header">
                <Title level={2}>User Detail</Title>
            </div>
            {!isLoading ?
                <div >

                    <div className="form">

                        <Title level={2}>User Name: {user?.username}</Title>
                        <Title level={2}>Email: {user?.email}</Title>
                        <Title level={2}>Role: {user?.role}</Title>

                        <div className="buttons">

                            <Button onClick={() => navigate('/admin/user')}>Back</Button>
                            <Button onClick={() => setShowEditForm(!showEditForm)}>Edit</Button>
                            <Button onClick={handleDelete}>Delete</Button>
                        </div>
                    </div>
                    {showEditForm && <AddUserForm initialValues={user} type='Edit' />}
                </div> :
                <div className="spin-wrapper">

                    <Spin />
                </div>
            }
        </div>
    )
}
export default UserDetail