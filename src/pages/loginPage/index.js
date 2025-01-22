import React, { useEffect } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";
import {
  setAuthToken,
  setAuthTokenExpiration,
  isTokenExpired,
} from "../../utils/authStorage";

const { Title } = Typography;
const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error, authenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (authenticated) {
      const token = sessionStorage.getItem("authToken");
      const expirationTime = sessionStorage.getItem("authTokenExpiration");

      if (isTokenExpired(expirationTime)) {
        navigate("/employee-engagement/login");
      } else {
        const redirectPath =
          location.state?.from || "/employee-engagement/final-survey";
        navigate(redirectPath);
      }
    }
  }, [authenticated, navigate, location.state]);

  const handleFinish = async (values) => {
    try {
      const action = await dispatch(loginUser(values)).unwrap();
      if(action?.status ==="success"){
        message.success(action?.message);
      }
      const expiresIn = 60 * 60 * 1000;
      const expirationTime = Date.now() + expiresIn;
      setAuthToken(action.token);
      setAuthTokenExpiration(expirationTime);
    
      if (isTokenExpired(expirationTime)) {
        navigate("/employee-engagement/login");
      } else {
        navigate("/employee-engagement/final-survey");
      }
    } catch (err) {
      console.error("Login failed:", err);
      message.error("Login failed. Please try again later!");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        style={{
          width: 400,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Employee Engagement Login
        </Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleFinish}
          initialValues={{ email: "", password: "" }}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              size="large"
              style={{
                width: "100%",
                backgroundColor: "#DFE5FC",
                borderRadius: "30px",
                overflow: "hidden",
                transition: "all 300ms ease-out",
              }}
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          <Link to="/employee-engagement/change-password">Change Password</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
