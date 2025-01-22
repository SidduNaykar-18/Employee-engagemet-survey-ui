import React, { useEffect, useState } from "react";
import { Layout, Dropdown, Menu, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import LandingPage from "../../pages/LandingPage";
import DevelopmentGrowth from "../DevelopmentGrowth";
import WorkEnvironmentRelationships from "../WorkEnvironmentRelationships";
import Resources from "../Resources";
import RecognitionSupport from "../RecognitionSupport";
import OverallSatisfactionEngagement from "../OverallSatisfactionEngagement";
import CustomNextButton from "../CustomNextButton";
import CustomSubmitButton from "../CustomSubmitButton";
import "../Layout/layout.css";
import { getAllQuestions } from "../../redux/slices/surveySlice";
import { useDispatch, useSelector } from "react-redux";

const { Header, Content } = Layout;

const LayoutPage = () => {
  const [currentComponent, setCurrentComponent] = useState(1);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const handleMenuClick = ({ key }) => {
    setCurrentComponent(Number(key));
  };
  const surveyId = "6118c541-110f-4bd1-8bcf-72de4c8759bf";

  useEffect(() => {
    if (surveyId) {
      dispatch(getAllQuestions(surveyId));
    }
  }, [dispatch, surveyId]);

  const questions = useSelector((state) => state?.surveyData?.questions?.data);

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Resources</Menu.Item>
      <Menu.Item key="2">Recognition & Support</Menu.Item>
      <Menu.Item key="3">Development & Growth</Menu.Item>
      <Menu.Item key="4">Work Environment & Relationships</Menu.Item>
      <Menu.Item key="5">Overall Satisfaction & Engagement</Menu.Item>
    </Menu>
  );

  const handleNext = () => {
    if (isValid) {
      setCurrentComponent((prevComponent) =>
        prevComponent === 5 ? 1 : prevComponent + 1
      );
    } else {
      message.error("Please complete all fields before proceeding.");
    }
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 1:
        return <Resources onValidate={setIsValid} questionData={questions} />;
      case 2:
        return (
          <RecognitionSupport
            onValidate={setIsValid}
            questionData={questions}
          />
        );
      case 3:
        return (
          <DevelopmentGrowth onValidate={setIsValid} questionData={questions} />
        );
      case 4:
        return (
          <WorkEnvironmentRelationships
            onValidate={setIsValid}
            questionData={questions}
          />
        );
      case 5:
        return (
          <OverallSatisfactionEngagement
            onValidate={setIsValid}
            questionData={questions}
          />
        );
      default:
        return <LandingPage />;
    }
  };

  return (
    <Layout
      style={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        flexDirection: "column",
        background: "white",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: "10px",
          width: "100%",
          padding: "40px",
        }}
      >
        <Header
          style={{
            width: "100%",
            height: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 30px",
            backgroundColor: "white",
            borderRadius: "25px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/images/logo.svg"
              alt="Logo"
              style={{ height: "40px", maxWidth: "100%" }}
            />
          </div>
          <Dropdown overlay={menu} trigger={["click"]}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontFamily: "Montserrat-medium",
                color: "#114468",
              }}
            >
              {
                [
                  "Resources",
                  "Recognition & Support",
                  "Development & Growth",
                  "Work Environment & Relationships",
                  "Overall Satisfaction & Engagement",
                ][currentComponent - 1]
              }{" "}
              <DownOutlined
                style={{
                  marginLeft: "5px",
                  backgroundColor: "#001982",
                  color: "white",
                  borderRadius: "15px ",
                  width: "30px",
                  height: "30px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </span>
          </Dropdown>
        </Header>
      </div>

      <Layout style={{ marginTop: "110px", flex: 1 }}>
        <Content
          style={{
            padding: "24px",
            overflow: "auto",
            flexGrow: 1,
            backgroundColor: "white",
            height: "calc(100vh - 170px)",
          }}
        >
          {renderComponent()}
        </Content>
        <div
          style={{
            padding: "20px",
            textAlign: "end",
            background: "white",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {currentComponent === 5 ? (
            <CustomSubmitButton
              onValidate={setIsValid}
              onClick={() => console.log("Submit clicked")}
            >
              Submit
            </CustomSubmitButton>
          ) : (
            <CustomNextButton onClick={handleNext}>Next</CustomNextButton>
          )}
        </div>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
