import { Typography, Button, Table, Form, Input, Select } from "antd";
import "antd/dist/antd.css";
import { useForm } from "antd/lib/form/Form";
import { createQuestion, updateQuestion } from "../api";
import { useParams } from "react-router-dom";
import './addQuestionForm.scss'
import { useLayoutEffect, useState } from "react";
const AddQuestionForm = ({ initialValues, type = "Add" }) => {
  const [option, setOptions] = useState({ answer1: '', answer2: '', answer3: '', answer4: '' })
  const { questionId } = useParams();
  console.log(initialValues)

  useLayoutEffect(() => {
    if (initialValues) {
      setOptions({ answer1: initialValues.answer1, answer2: initialValues.answer2, answer3: initialValues.answer3, answer4: initialValues.answer4 })
    }
  }, [])
  const formField = [
    { label: "Question", name: "question" },
    { label: "Answer 1", name: "answer1" },
    { label: "Answer 2", name: "answer2" },
    { label: "Answer 3", name: "answer3" },
    { label: "Answer 4", name: "answer4" },

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
    } catch (error) { }
  };
  const handleFieldChange = (changedField) => {
    const [value] = changedField
    if (value.name[0].includes('answer')) {
      setOptions({ ...option, [value.name[0]]: value.value })
    }
  }

  return (
    <div className="AddQuestionForm">


      <Form
        name="login"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        initialValues={initialValues}
        onFieldsChange={handleFieldChange}
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
          label='Correct Answer'
          name='correctanswer'
          rules={[
            {
              required: true,
              message: "this field is required!",
            },
          ]}
        >
          <Select>
            <Select.Option key='1' value={`${option.answer1}`}>{option.answer1}</Select.Option>
            <Select.Option key='2' value={`${option.answer2}`}>{option.answer2}</Select.Option>
            <Select.Option key='3' value={`${option.answer3}`}>{option.answer3}</Select.Option>
            <Select.Option key='4' value={`${option.answer4}`}>{option.answer4}</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button shape="round" danger type="primary" htmlType="submit">
            {type} question
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddQuestionForm;
