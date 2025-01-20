import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTitleAndContent from "../CustomTitleAndContent";
import CustomInputTextCard from "../CustomInputTextCard";
import { updateSurveyData } from "../../redux/slices/surveySlice";
import CustomLoading from "../CustomLoading";
import CustomSliderCard from "../CustomSliderCard";

const WorkEnvironmentRelationships = ({ onValidate, questionData }) => {
  const dispatch = useDispatch();

  const workEnvironmentData = useSelector(
    (state) => state?.surveyData?.workEnvironmentRelationships
  );
console.log("check workEnvironmentData=============",workEnvironmentData);

  useEffect(() => {
    const isValid =
      workEnvironmentData?.sliderResponse1 &&
      workEnvironmentData?.inputResponse1 &&
      workEnvironmentData?.inputResponse2;
    onValidate(isValid);
  }, [workEnvironmentData, onValidate]);

  const data = questionData?.length > 0 ? questionData[3] : {};

  const groupData = {
    title: data?.questionGroupTitle,
    content: data?.questionGroupDescription,
  };

  const handleInputChange = (questionId, value, inputKey) => {
    const payload = {
      questionId,
      inputValue: value,
    };

    dispatch(
      updateSurveyData({
        section: "workEnvironmentRelationships",
        dataKey: inputKey,
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
        section: "workEnvironmentRelationships",
        dataKey: `sliderResponse${sliderIndex}`,
        dataValue: payload,
      })
    );
  };

  return questionData?.length > 0 ? (
    <div>
      <CustomTitleAndContent data={groupData} />
      <div style={{ marginTop: "10px" }}>
        <CustomInputTextCard
          data={data?.questions[0]} 
          section="workEnvironmentRelationships"
          inputKey="inputResponse1"
          value={workEnvironmentData?.inputResponse1}
          onChange={(value) =>
            handleInputChange(data?.questions[0]?.id, value, "inputResponse1")
          }
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <CustomInputTextCard
          data={data?.questions[1]} 
          section="workEnvironmentRelationships"
          inputKey="inputResponse2"
          value={workEnvironmentData?.inputResponse2}
          onChange={(value) =>
            handleInputChange(data?.questions[1]?.id, value, "inputResponse2")
          }
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <CustomSliderCard
          data={data?.questions[2]} 
          section="workEnvironmentRelationships"
          inputKey="sliderResponse1"
          initialValue={workEnvironmentData?.sliderResponse1?.inputValue}
          onChange={(value) =>
            handleSliderChange(data?.questions[2]?.id, value,
              data?.questions[2]?.options,
              1
              )
          }
        />
      </div>
    </div>
  ) : (
    <CustomLoading />
  );
};

export default WorkEnvironmentRelationships;
