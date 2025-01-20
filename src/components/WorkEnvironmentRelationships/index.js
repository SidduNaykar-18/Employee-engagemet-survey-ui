import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTitleAndContent from "../CustomTitleAndContent";
import CustomRadioSelectionCard from "../CustomRadioSelectionCard";
import CustomInputTextCard from "../CustomInputTextCard";
import { updateSurveyData } from "../../redux/slices/surveySlice";
import CustomLoading from "../CustomLoading";

const WorkEnvironmentRelationships = ({ onValidate,questionData }) => {
  const dispatch = useDispatch();

  const workEnvironmentData = useSelector(
    (state) => state?.surveyData?.workEnvironmentRelationships
  );
  
  useEffect(() => {
    const isValid =
      workEnvironmentData?.radioResponse &&
      workEnvironmentData?.inputResponse1 &&
      workEnvironmentData?.inputResponse2;
    onValidate(isValid);
  }, [workEnvironmentData, onValidate]);
  const data = questionData?.length > 0 ? questionData[2] : {};
  
  const groupData = {
    title: data?.questionGroupTitle,
    content: data?.questionGroupDescription,
  };
  
  const handleRadioChange = (questionId, value, options, section) => {
    const selectedOption = options?.find((option) => option?.value === value);
    const payload = {
      questionId,
      selectedOptionId: selectedOption?.id,
      inputValue: selectedOption?.value,
    };
  
    dispatch(
      updateSurveyData({
        section: section,
        dataKey: "radioResponse",
        dataValue: payload,
      })
    );
  };
  
  const handleInputChange = (questionId, value, section, inputKey) => {
    const payload = {
      questionId,
      inputValue: value,
    };
  
    dispatch(
      updateSurveyData({
        section: section,
        dataKey: inputKey,
        dataValue: payload,
      })
    );
  };
  
  return (
    questionData?.length > 0 ? (
    <div>
      <CustomTitleAndContent data={groupData} />
      <div style={{ marginTop: "10px" }}>
        <CustomRadioSelectionCard
          data={data?.questions[1]}
          initialValue={workEnvironmentData?.radioResponse?.inputValue}
          options={data?.questions[1]?.options}
          onChange={(value) =>
            handleRadioChange(
              data?.questions[1]?.id,
              value,
              data?.questions[1]?.options,
              "workEnvironmentRelationships"
            )
          }
        />
      </div>
  
      <div style={{ marginTop: "10px" }}>
        <CustomInputTextCard
          data={data?.questions[0]} 
          section="workEnvironmentRelationships"
          inputKey="inputResponse1"
          value={workEnvironmentData?.inputResponse1}
          onChange={(value) =>
            handleInputChange(
              data?.questions[0]?.id,
              value,
              "workEnvironmentRelationships",
              "inputResponse1"
            )
          }
        />
      </div>
  
      <div style={{ marginTop: "10px" }}>
        <CustomInputTextCard
          data={data?.questions[2]} 
          section="workEnvironmentRelationships"
          inputKey="inputResponse2"
          value={workEnvironmentData?.inputResponse2}
          onChange={(value) =>
            handleInputChange(
              data?.questions[2]?.id,
              value,
              "workEnvironmentRelationships",
              "inputResponse2"
            )
          }
        />
      </div>
    </div>):(<><CustomLoading/></>)
  );
  };
  
  export default WorkEnvironmentRelationships;
  