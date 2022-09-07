import { Typography, Button, Avatar } from "antd";
import "antd/dist/antd.css";
import { useAuth } from "../context/ContextProvider";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../api";
import { LogoutOutlined } from '@ant-design/icons'
import './header.scss'
const { Title } = Typography;
const Header = () => {
  const { auth, setAuth, setQuizData } = useAuth();
  const handleLogout = async () => {
    try {
      await logout(auth.tokens.refresh.token);
    } catch (error) {

    }
    setQuizData({})
    setAuth({});
    localStorage.clear();

  };
  if (!auth.user) {
    return (
      <></>
    )
  }
  return (
    <div
      style={{

      }}
      className="Header"
    >
      <Title level={2}>QUIZ APP</Title>
      {auth?.user && (
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Avatar size="large" icon={<UserOutlined />} />

          <h2>Welcom {auth.user.username}</h2>




          <Button danger icon={<LogoutOutlined />} onClick={handleLogout}>Log Out</Button>
        </div>
      )}
    </div>
  );
};
export default Header;
