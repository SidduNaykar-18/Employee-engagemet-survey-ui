import React from "react";
import { Typography, Button, Row, Col } from "antd";
import { InfoCircleOutlined, } from "@ant-design/icons";
import "./style.css";
import CustomButton from "../../components/CustomButton";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const navigate = useNavigate();
  const handleNextpage = () => {
    navigate("/employee-engagement/survey");
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Row style={{ height: "100%" }}>
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "#FEFCFE",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "720px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/images/LandingBanner_Animation.gif"
              alt="Illustration"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </Col>
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "640px",
              gap: "20px",
            }}
          >
            <Title
              level={3}
              style={{
                textAlign: "start",
                color: "var(--primary-color)",
                fontFamily:"Montserrat-Bold",
                fontSize: "36px",
                lineHeight: "1.2",
              }}
            >
              Employee <br /> Engagement Survey
              <Paragraph
                style={{
                  fontSize: "18px",
                  fontFamily:"Montserrat-Bold",
                  marginBottom: "20px",
                }}
              >
                <span style={{fontSize:"12px"}}>by</span> Innovatily
              </Paragraph>
            </Title>

            <Paragraph
              style={{
                fontSize: "16px",
                fontFamily:"Montserrat-Medium",
                marginBottom: "20px",
              }}
            >
              Unlocking the true potential of any organization begins with
              understanding its most valuable asset – its people. The Employee
              Engagement Survey is designed to capture your thoughts, feelings,
              and experiences in the workplace.
            </Paragraph>

            <Paragraph
              style={{
                fontSize: "12px",
                fontFamily:"Montserrat-Medium",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "30px",
              }}
            >
              <InfoCircleOutlined
                style={{ fontSize: "28px", marginRight: "2px"

                  
                 }}
              />
              We value your honesty and want to assure you that this survey is
              100% anonymous. Your responses will be collected without any
              personally identifiable information and cannot be traced back to
              you.
            </Paragraph>

            <CustomButton onClick={handleNextpage} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
