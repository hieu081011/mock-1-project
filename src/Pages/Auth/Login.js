import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../api";
import { useAuth } from "../../context/ContextProvider";
import { Navigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [error, setError] = useState("");
  const onFinish = async (values) => {
    try {
      const { data } = await login(values);
      console.log(data);
      localStorage.setItem("access_token", data.tokens.access.token);
      localStorage.setItem("auth", JSON.stringify(data));
      localStorage.setItem("refresh_token", data.tokens.refresh.token);
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
    <div>
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 7 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Typography.Title level={2}>Login</Typography.Title>
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Typography.Title level={5}>{error}</Typography.Title>
        </Form.Item>
        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
