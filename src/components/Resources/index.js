import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTitleAndContent from "../CustomTitleAndContent";
import CustomRadioSelectionCard from "../CustomRadioSelectionCard";
import CustomSliderCard from "../CustomSliderCard";
import { updateSurveyData } from "../../redux/slices/surveySlice";
import CustomLoading from "../CustomLoading";

const Resources = ({ onValidate, questionData }) => {
  const dispatch = useDispatch();
  const resourcesData = useSelector((state) => state?.surveyData?.resources);
  const questions = useSelector((state) => state?.surveyData?.questions?.data);
  const data = questionData?.length > 0 ? questionData[4] : {};
  const Resourcedata = {
    title: data?.questionGroupTitle,
    content: data?.questionGroupDescription,
  };

  const handleRadioChange = (questionId, value, options) => {
    const selectedOption = options?.find((option) => option?.value === value);
    const payload = {
      questionId,
      selectedOptionId: selectedOption?.id,
      inputValue: selectedOption?.value,
    };
    dispatch(
      updateSurveyData({
        section: "resources",
        dataKey: "radioResponse",
        dataValue: payload,
      })
    );
  };
  const handleSliderChange = (questionId, value, options, sliderIndex) => {
    const selectedOption = options?.find((option) => option?.value === value);
    if (!selectedOption) {
      return;
    }
    const payload = {
      questionId,
      selectedOptionId: selectedOption?.id,
      inputValue: selectedOption?.value,
    };
    dispatch(
      updateSurveyData({
        section: "resources",
        dataKey: `sliderResponse${sliderIndex}`,
        dataValue: payload,
      })
    );
  };
  useEffect(() => {
    const isValid =
      resourcesData?.radioResponse &&
      resourcesData?.sliderResponse1 &&
      resourcesData?.sliderResponse2;
    onValidate(isValid);
  }, [resourcesData, onValidate]);

  return questionData?.length > 0 ? (
    <div>
      <CustomTitleAndContent data={Resourcedata} />
      <div style={{ marginTop: "10px" }}>
        <CustomRadioSelectionCard
          data={data?.questions[0]}
          initialValue={resourcesData?.radioResponse?.inputValue}
          options={data?.questions[0]?.options}
          onChange={(value) =>
            handleRadioChange(
              data?.questions[0]?.id,
              value,
              data?.questions[0]?.options
            )
          }
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <CustomSliderCard
          data={data?.questions[1]}
          initialValue={resourcesData?.sliderResponse1?.inputValue}
          options={data?.questions[1]?.options}
          onChange={(value) =>
            handleSliderChange(
              data?.questions[1]?.id,
              value,
              data?.questions[1]?.options,
              1
            )
          }
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <CustomSliderCard
          data={data?.questions[2]}
          initialValue={resourcesData?.sliderResponse2?.inputValue}
          options={data?.questions[2]?.options}
          onChange={(value) =>
            handleSliderChange(
              data?.questions[2]?.id,
              value,
              data?.questions[2]?.options,
              2
            )
          }
        />
      </div>
    </div>
  ) : (
    <>
      <CustomLoading />
    </>
  );
};  

export default Resources;
