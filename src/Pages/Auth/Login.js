import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";
import { useAuth } from "../../context/ContextProvider";
import { Navigate, Link } from "react-router-dom";
import './login.scss'
import { ls } from "../../api/encyption";


const { Text } = Typography
const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState("");
  const onFinish = async (values) => {
    try {
      const { data } = await login(values);
      console.log(data);
      ls.set("access_token", data.tokens.access.token);
      ls.set("auth", JSON.stringify(data));
      ls.set("refresh_token", data.tokens.refresh.token);
      setAuth(data);
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
    <div className="Login-page">
      <div>
        <Form
          name="login"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
            <Typography.Title className='title' level={2}>Login</Typography.Title>
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          {
            error && <div className="error-message">{error}</div>
          }



          <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
            <Button type="primary" htmlType="submit" block danger shape="round">
              Login
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ offset: 6 }} wrapperCol={{ offset: 0, span: 12 }} label="Create an account">

            <Link style={{ color: 'red' }} to='/register'>
              Sign up
            </Link>
          </Form.Item>


          {/* <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </Button>
          </Form.Item> */}


        </Form>

      </div>
    </div>
  );
};
export default Login;
