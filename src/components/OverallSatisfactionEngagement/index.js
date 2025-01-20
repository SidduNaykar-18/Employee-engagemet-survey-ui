import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTitleAndContent from "../CustomTitleAndContent";
import CustomRadioSelectionCard from "../CustomRadioSelectionCard";
import CustomSliderCard from "../CustomSliderCard";
import { updateSurveyData } from "../../redux/slices/surveySlice";

const OverallSatisfactionEngagement = ({ onValidate, questionData }) => {
  const dispatch = useDispatch();

  const overallSatsData = useSelector(
    (state) => state?.surveyData?.overallSatisfactionEngagement
  );
  const surveyData = useSelector((state) => state.surveyData);
  
  useEffect(() => {
    if (!overallSatsData || Object.keys(overallSatsData)?.length === 0) return;
    const isValid =
      overallSatsData?.radioResponse &&
      overallSatsData?.sliderResponse1 &&
      overallSatsData?.sliderResponse2;

    onValidate(isValid);
  }, [overallSatsData, onValidate]);
  
  const data = questionData?.length> 0 ? questionData[0]:[];
  const groupData = {
    title: data?.questionGroupTitle,
    content: data?.questionGroupDescription,
  };

  const handleRadioChange = (questionId, value, options) => {
    const selectedOption = options?.find((option) => option?.value === value);
  
    if (!selectedOption) {
      console.error("No selected option found!");
      return;
    }
  
    const payload = {
      questionId,
      selectedOptionId: selectedOption?.id,
      inputValue: selectedOption?.value,
    };
  
    console.log("Dispatching radio payload:", payload);
  
    dispatch(
      updateSurveyData({
        section: "overallSatisfactionEngagement",
        dataKey: "radioResponse",
        dataValue: payload,
      })
    );
  };
  
  const handleSliderChange = (questionId, value, options, sliderIndex) => {
    const selectedOption = options?.find((option) => option?.value === value);
  
    if (!selectedOption) {
      console.error("No selected option found for slider!");
      return;
    }
  
    const payload = {
      questionId,
      selectedOptionId: selectedOption?.id,
      inputValue: selectedOption?.value,
    };
  
    console.log(`Dispatching slider payload for slider ${sliderIndex}:`, payload);
  
    dispatch(
      updateSurveyData({
        section: "overallSatisfactionEngagement",
        dataKey: `sliderResponse${sliderIndex}`,
        dataValue: payload,
      })
    );
  };
  
  return (
    <div>
      <CustomTitleAndContent data={groupData} />
      <div style={{ marginTop: "10px" }}>
        <CustomRadioSelectionCard
          data={data?.questions[0]}
          initialValue={overallSatsData?.radioResponse?.inputValue}
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
          initialValue={overallSatsData?.sliderResponse1?.inputValue}
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
          initialValue={overallSatsData?.sliderResponse2?.inputValue}
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
  );
  
};

export default OverallSatisfactionEngagement;
