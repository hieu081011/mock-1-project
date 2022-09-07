import './addUserForm.scss'
import { Typography, Button, Table, Form, Input, Select, Radio } from "antd";
import "antd/dist/antd.css";
import { createUser, updateUser } from "../api";
import { useParams } from "react-router-dom";

const AddUserForm = ({ initialValues, type = "Add" }) => {

    const { userid } = useParams();
    const onFinish = async (value) => {
        try {
            let data;
            if (userid) {
                data = await updateUser(value, userid);
            } else {
                data = await createUser(value);
            }

            alert(`${type}ed user!`);
        } catch (error) { }
    };


    return (
        <div className="AddUserForm">

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

            >

                <Form.Item
                    label='User Name'
                    name='username'
                    rules={[
                        {
                            required: true,
                            message: "this field is required!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                        {
                            required: true,
                            message: "this field is required!",
                        },
                        {
                            type: 'email',
                            message: 'Email format is abc@xyz.com'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: "this field is required!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label='Role'
                    name='role'
                    rules={[
                        {
                            required: true,
                            message: "this field is required!",
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value='user'>User</Radio>
                        <Radio value='admin'>Admin</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button shape="round" danger type="primary" htmlType="submit">
                        {type} user
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default AddUserForm;
