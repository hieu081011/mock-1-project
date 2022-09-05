import { Typography, Button, Avatar } from "antd";
import "antd/dist/antd.css";
import { useAuth } from "../context/ContextProvider";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../api";
const { Title } = Typography;
const Header = () => {
  const { auth, setAuth } = useAuth();
  const handleLogout = async () => {
    logout(auth.tokens.refresh.token);
    localStorage.clear();

    setAuth({});
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Title level={2}>QUIZ APP</Title>
      {auth?.user && (
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div>
            <Title level={4}>Welcom {auth.user.username}</Title>
            <Title level={4}>Role: {auth.user.role}</Title>
          </div>
          <Avatar size="large" icon={<UserOutlined />} />
          <Button onClick={handleLogout}>Log Out</Button>
        </div>
      )}
    </div>
  );
};
export default Header;
