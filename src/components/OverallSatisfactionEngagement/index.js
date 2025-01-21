import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTitleAndContent from "../CustomTitleAndContent";

import { updateSurveyData } from "../../redux/slices/surveySlice";
import CustomLoading from "../CustomLoading";
import CustomRadioSliderCard from "../CustomSliderCard";

const OverallSatisfactionEngagement = ({ onValidate, questionData }) => {
  const dispatch = useDispatch();

  const overallSatsData = useSelector(
    (state) => state?.surveyData?.overallSatisfactionEngagement
  );

  console.log("Overall Satisfaction Data:", overallSatsData);

  useEffect(() => {
    if (!overallSatsData || Object.keys(overallSatsData)?.length === 0) return;

    const isValid =
      overallSatsData?.sliderResponse1 && overallSatsData?.sliderResponse2;

    console.log("Validation Status:", isValid); 

    onValidate(isValid);
  }, [overallSatsData, onValidate]);

  const data = questionData?.length > 0 ? questionData[4] : {};
  const groupData = {
    title: data?.questionGroupTitle,
    content: data?.questionGroupDescription,
  };

  const handleSliderChange = (questionId, value, options, sliderIndex) => {
    const selectedOption = options?.find((option) => option?.value === value);
    
    if (!selectedOption) {
      console.log("No matching option found for value:", value); 
      return;
    }

    const payload = {
      questionId,
      selectedOptionId: selectedOption?.id,
      inputValue: selectedOption?.value,
    };


    dispatch(
      updateSurveyData({
        section: "overallSatisfactionEngagement",
        dataKey: `sliderResponse${sliderIndex}`,
        dataValue: payload,
      })
    );
  };

  return questionData?.length > 0 ? (
    <div>
      <CustomTitleAndContent data={groupData} />
      <div style={{ marginTop: "10px" }}>
        <CustomRadioSliderCard
          data={data?.questions[0]}
          initialValue={overallSatsData?.sliderResponse1?.inputValue || ""}
          options={data?.questions[0]?.options}
          onChange={(value) =>
            handleSliderChange(
              data?.questions[0]?.id,
              value,
              data?.questions[0]?.options,
              1
            )
          }
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <CustomRadioSliderCard
          data={data?.questions[1]}
          initialValue={overallSatsData?.sliderResponse2?.inputValue || ""}
          options={data?.questions[1]?.options}
          onChange={(value) =>
            handleSliderChange(
              data?.questions[1]?.id,
              value,
              data?.questions[1]?.options,
              2 
            )
          }
        />
      </div>
    </div>
  ) : (
    <CustomLoading />
  );
};

export default OverallSatisfactionEngagement;
