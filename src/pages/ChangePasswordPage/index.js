import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/slices/authSlice";

const { Title } = Typography;

const ChangePasswordPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, passwordChange } = useSelector((state) => state.auth);
   

  const handleChangePassword = async (values) => {
    try {
      const result = await dispatch(changePassword(values)).unwrap();
      if (result?.success==="success") {
        message.success(result?.message);
        navigate("/employee-engagement/login");
      } else {
        message.error("Failed to change password!");
      }
      
      form.resetFields(); 
    } catch (error) {
      console.error("Error changing password:", error);
      message.error("Failed to change password!");
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
          Change Password
        </Title>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleChangePassword}
          initialValues={{ oldPassword: "", newPassword: "" }}
        >
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[{ required: true, message: "Please enter your old password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your old password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[{ required: true, message: "Please enter your new password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your new password"
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
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChangePasswordPage;
