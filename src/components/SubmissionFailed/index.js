import React from "react";
import { Card, Typography, Space } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const SubmissionFailedComponent = () => {
  return (
    <div
      style={{
        padding: "170px 20px",
        display: "flex",
        justifyContent: "center",
        border: "none",
      }}
    >
      <Card
        style={{
          border: "none",
          boxShadow: "none",
        }}
        bodyStyle={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          width: "100%",
          border: "none",
          boxShadow: "none",
        }}
      >
        <Space
          direction="vertical"
          size="small"
          align="center"
          style={{ width: "100%", textAlign: "center" }}
        >
          <CloseCircleOutlined
            style={{
              fontSize: "48px",
              color: "#ff4d4f",
            }}
          />
          <Typography.Text
            style={{
              fontSize: "20px",
              fontFamily: "Montserrat-Bold",
              textAlign: "center",
            }}
          >
            Submission Failed
            <p
              style={{
                fontSize: "12px",
                fontFamily: "Montserrat-Medium",
                textAlign: "center",
                marginTop: "-5px",
              }}
            >
              Please try again later.
            </p>
          </Typography.Text>
        </Space>

        <Space
          direction="vertical"
          size="small"
          align="center"
          style={{ width: "100%", marginTop: "-7px" }}
        >
          <Typography.Text
            style={{
              fontFamily: "Montserrat-Bold",
              textAlign: "center",
            }}
          >
            Employee Engagement Survey
          </Typography.Text>
          <Typography.Text
            style={{
              fontSize: "12px",
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            by <span style={{ fontFamily: "Montserrat-Bold" }}>Innovatily</span>
          </Typography.Text>
        </Space>
      </Card>
    </div>
  );
};

export default SubmissionFailedComponent;
