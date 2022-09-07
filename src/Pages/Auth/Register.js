import { Form, Input, Button, Typography, } from "antd";
import "antd/dist/antd.css";
import { useNavigate, Navigate } from "react-router-dom";
import { register } from "../../api";
import { useAuth } from "../../context/ContextProvider";
import { useState } from "react";
import './register.scss'
import { ArrowLeftOutlined } from '@ant-design/icons'
const { Title } = Typography;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 8,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 14,
    },
  },
};
const Register = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState('')
  const onFinish = async (values) => {
    try {
      const { data } = await register(values);
      setAuth(data);
      localStorage.setItem("access_token", data.tokens.access.token);
    } catch (error) {
      const { response } = error;
      setError(response.data.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  if (auth?.user) {
    return <Navigate to={`/${auth.user.role}`} />;
  }
  return (
    <div className="Register">
      <div>

        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/login")}>Back</Button>
        <Form
          {...formItemLayout}
          name="register"
          initialValues={{
            username: "",
            email: "",
            password: "",
            comfirmPassword: "",
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Title level={2}>Register</Title>
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Email format is abc@xyz.com",
              },
              {
                required: "true",
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your Username",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Re-Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please input your confirm password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("The two passwords that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>


          <div className="error-message">

            {error}
          </div>


          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" danger shape="round" block>
              Register
            </Button>
          </Form.Item>
        </Form>

      </div>
    </div>
  );
};
export default Register;
