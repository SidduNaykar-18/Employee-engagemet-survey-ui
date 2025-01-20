import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTitleAndContent from "../CustomTitleAndContent";
import CustomRadioSelectionCard from "../CustomRadioSelectionCard";

import { updateSurveyData } from "../../redux/slices/surveySlice";
import CustomLoading from "../CustomLoading";
import CustomRadioSliderCard from "../CustomSliderCard";

const Resources = ({ onValidate, questionData }) => {
  const dispatch = useDispatch();
  const resourcesData = useSelector(
    (state) => state?.surveyData?.resources || {}
  );

  console.log("Resources data:============= ", resourcesData);

  const data =
    Array.isArray(questionData) && questionData.length > 0
      ? questionData[0]
      : {};

  const Resourcedata = {
    title: data?.questionGroupTitle,
    content: data?.questionGroupDescription,
  };

  useEffect(() => {
    const isValid =
      resourcesData?.radioResponse1 &&
      resourcesData?.sliderResponse1 &&
      resourcesData?.sliderResponse2;
    onValidate(isValid);
  }, [
    resourcesData?.radioResponse1,
    resourcesData?.sliderResponse1,
    resourcesData?.sliderResponse2,
    onValidate,
  ]);

  const handleRadioChange = (questionId, value, options) => {
    const selectedOption = options?.find((option) => option?.value === value);
    const payload = {
      questionId,
      selectedOptionId: selectedOption?.id,
      inputValue: selectedOption?.value,
    };
    console.log("Radio payload:", payload);

    dispatch(
      updateSurveyData({
        section: "resources",
        dataKey: "radioResponse1",
        dataValue: payload,
      })
    );
  };

  const handleSliderChange = (questionId, value, options, sliderIndex) => {
    const selectedOption = options?.find((option) => option?.value === value);

    if (!selectedOption) {
      console.error("No valid option found for the slider.");
      return;
    }

    const payload = {
      questionId,
      selectedOptionId: selectedOption?.id,
      inputValue: selectedOption?.value,
    };
    const dataKey = `sliderResponse${sliderIndex}`;

    dispatch(
      updateSurveyData({
        section: "resources",
        dataKey: dataKey,
        dataValue: payload,
      })
    );
  };

  return questionData?.length > 0 ? (
    <div>
      <CustomTitleAndContent data={Resourcedata} />

      <div style={{ marginTop: "10px" }}>
        <CustomRadioSelectionCard
          data={data?.questions[0]}
          initialValue={resourcesData?.radioResponse1?.inputValue}
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
        <CustomRadioSliderCard
          data={data?.questions[1]}
          initialValue={resourcesData?.sliderResponse1?.inputValue || 0}
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
        <CustomRadioSliderCard
          data={data?.questions[2]}
          initialValue={resourcesData?.sliderResponse2?.inputValue || 0}
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
    <CustomLoading />
  );
};

export default Resources;
