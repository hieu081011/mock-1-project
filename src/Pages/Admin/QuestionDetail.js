import { Typography, Button, Spin } from "antd"
import 'antd/dist/antd.css';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestion, deleteQuestion } from "../../api";
import AddQuestionForm from "../../Components/AddQuestionForm";
import './questionDetail.scss'
const { Title } = Typography
const QuestionDetail = () => {
    const [showEditForm, setShowEditForm] = useState(false)
    const { questionId } = useParams()
    const navigate = useNavigate()
    const [question, setQuestion] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const handleDelete = async () => {
        try {
            await deleteQuestion(questionId)
            alert('question is deleted')
            navigate('/admin/')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        async function getQuestionAdmin() {
            try {
                setIsLoading(true)
                const { data } = await getQuestion(questionId)
                setIsLoading(false)
                setQuestion(data)

            } catch (error) {
                console.log(error)
            }
        }
        getQuestionAdmin()
    }, [])
    return (
        <div className="QuestionDetail">
            <div className="header">
                <Title level={2}>Question Detail</Title>
            </div>
            {!isLoading ?
                <div >

                    <div className="form">

                        <Title level={2}>Question: {question?.question}</Title>
                        <Title level={2}>Answer 1: {question?.answer1}</Title>
                        <Title level={2}>Answer 2: {question?.answer2}</Title>
                        <Title level={2}>Answer 3: {question?.answer3}</Title>
                        <Title level={2}>Answer 4: {question?.answer4}</Title>
                        <Title level={2}>Correct Answer: {question?.correctanswer}</Title>
                        <div className="buttons">

                            <Button onClick={() => navigate('/admin')}>Back</Button>
                            <Button onClick={() => setShowEditForm(!showEditForm)}>Edit</Button>
                            <Button onClick={handleDelete}>Delete</Button>
                        </div>
                    </div>
                    {showEditForm && <AddQuestionForm initialValues={question} type='Edit' />}
                </div> :
                <div className="spin-wrapper">

                    <Spin />
                </div>
            }
        </div>
    )
}
export default QuestionDetail