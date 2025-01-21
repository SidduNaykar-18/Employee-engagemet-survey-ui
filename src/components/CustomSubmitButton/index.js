import React, { useEffect, useState } from "react";
import { StepForwardFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetSurveyData, addSurvey } from "../../redux/slices/surveySlice";
import { message } from "antd";
import CustomLoading from "../CustomLoading";

const CustomSubmitButton = ({ onClick, onValidate }) => {
  const dispatch = useDispatch();
  const surveyData = useSelector((state) => state.surveyData);
  const { surveys, loading, error } = useSelector((state) => state.surveyData);
  console.log("check status=============", error);

  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const overallSatsData = useSelector(
    (state) => state?.surveyData?.overallSatisfactionEngagement
  );

  const finalPayload = {
    surveyId: "e74af703-e6f1-48d2-8965-73c723b5e40e",
    employeeId: generateDeviceId(),
    questionDetails: [
      surveyData?.resources?.radioResponse1,
      surveyData?.resources?.sliderResponse1,
      surveyData?.resources?.sliderResponse2,
      surveyData?.recognitionSupport?.radioResponse1,
      surveyData?.recognitionSupport?.sliderResponse1,
      surveyData?.recognitionSupport?.radioResponse2,
      surveyData?.developmentGrowth?.radioResponse1,
      surveyData?.developmentGrowth?.radioResponse2,
      surveyData?.developmentGrowth?.sliderResponse1,
      surveyData?.developmentGrowth?.sliderResponse2,
      surveyData?.workEnvironmentRelationships?.sliderResponse1,
      surveyData?.workEnvironmentRelationships?.inputResponse1,
      surveyData?.workEnvironmentRelationships?.inputResponse2,
      surveyData?.overallSatisfactionEngagement?.sliderResponse1,
      surveyData?.overallSatisfactionEngagement?.sliderResponse2,
    ],
  };

  useEffect(() => {
    if (!overallSatsData || Object.keys(overallSatsData)?.length === 0) return;
    const isValid =
      overallSatsData?.sliderResponse1 && overallSatsData?.sliderResponse2;
    setIsValid(isValid);
    onValidate(isValid);
  }, [overallSatsData, onValidate]);

  useEffect(() => {
    if (loading) {
      return (
        <>
          <CustomLoading />
        </>
      );
    }
    if (error?.status === "failure") {
      if (error?.message === "Sorry, You have already Submitted") {
        navigate("/employee-engagement/already-submitted");
      } else {
        navigate("/employee-engagement/failed-submission");
      }
    } else if (!error === null) {
      navigate("/employee-engagement/thank-you");
    }
  }, [error, navigate]);

  const handleSubmit = async () => {
    try {
      if (loading) {
        message.info("Loading, please wait...");
        return;
      }

      if (!isValid) {
        message.error("Please complete all fields before proceeding.");
        return;
      }
      if (finalPayload) {
        await dispatch(addSurvey(finalPayload));
      }
      dispatch(resetSurveyData());
    } catch (err) {
      console.error("Unexpected error during submission:", err);
      message.error("An unexpected error occurred. Please try again.");
    }
  };

  function generateDeviceId() {
    if (localStorage.getItem("deviceId")) {
      return localStorage.getItem("deviceId");
    } else {
      const uniqueId = `device-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("deviceId", uniqueId);
      return uniqueId;
    }
  }

  return (
    <div
      style={{
        position: "relative",
        width: "160px",
        height: "54px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: "30px",
        overflow: "hidden",
        transition: "all 300ms ease-out",
        cursor: "pointer",
        border: "1px solid #365DFF",
      }}
      onClick={handleSubmit}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <span
        style={{
          flex: 1,
          textAlign: "center",
          color: "#365DFF",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        Submit
      </span>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#D9D9D9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StepForwardFilled
          style={{
            fontSize: "18px",
            color: "#365DFF",
          }}
        />
      </div>
    </div>
  );
};

export default CustomSubmitButton;
