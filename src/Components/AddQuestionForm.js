import { Typography, Button, Table, Form, Input } from "antd";
import "antd/dist/antd.css";
import { useForm } from "antd/lib/form/Form";
import { createQuestion, updateQuestion } from "../api";
import { useParams } from "react-router-dom";
const AddQuestionForm = ({ initialValues, type = "Add" }) => {
  const { questionId } = useParams();
  const formField = [
    { label: "Question", name: "question" },
    { label: "Answer 1", name: "answer1" },
    { label: "Answer 2", name: "answer2" },
    { label: "Answer 3", name: "answer3" },
    { label: "Answer 4", name: "answer4" },
    { label: "Correct Answer", name: "correctanswer" },
  ];
  const onFinish = async (value) => {
    try {
      let data;
      if (questionId) {
        data = await updateQuestion(value, questionId);
      } else {
        data = await createQuestion(value);
      }

      alert(`${type}ed ${data.data}`);
    } catch (error) {}
  };

  return (
    <Form
      name="login"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 7,
      }}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      {formField.map((field) => (
        <Form.Item
          label={field.label}
          name={field.name}
          rules={[
            {
              required: true,
              message: "this field is required!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      ))}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {type} question
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddQuestionForm;
