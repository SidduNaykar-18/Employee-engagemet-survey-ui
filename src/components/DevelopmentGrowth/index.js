import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTitleAndContent from "../CustomTitleAndContent";
import CustomRadioSelectionCard from "../CustomRadioSelectionCard";
import { updateSurveyData } from "../../redux/slices/surveySlice";
import CustomLoading from "../CustomLoading";
import CustomRadioSliderCard from "../CustomSliderCard";

const DevelopmentGrowth = ({ onValidate, questionData }) => {
  const dispatch = useDispatch();

  const developmentGrowthData = useSelector(
    (state) => state?.surveyData?.developmentGrowth
  );

  console.log("developmentGrowth data===========", developmentGrowthData);

  useEffect(() => {}, [developmentGrowthData]);

  const data = questionData?.length > 0 ? questionData[2] : {};

  const groupData = {
    title: data?.questionGroupTitle,
    content: data?.questionGroupDescription,
  };

  // Reusable handler for radio responses
  const handleRadioChange = (questionId, value, options, responseKey) => {
    console.log("Handling change for:", responseKey, value);

    const selectedOption = options?.find((option) => option?.value === value);
    if (!selectedOption) {
      console.warn(`No matching option for value: ${value}`);
      return;
    }

    const payload = {
      questionId,
      selectedOptionId: selectedOption?.id,
      inputValue: selectedOption?.value,
    };

    console.log("Dispatching payload:", payload);

    dispatch(
      updateSurveyData({
        section: "developmentGrowth",
        dataKey: responseKey,
        dataValue: payload,
      })
    );
  };

  // Reusable handler for slider responses
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
        section: "developmentGrowth",
        dataKey: `sliderResponse${sliderIndex}`,
        dataValue: payload,
      })
    );
  };

  useEffect(() => {
    const isValid =
      developmentGrowthData?.radioResponse1 &&
      developmentGrowthData?.radioResponse2 &&
      developmentGrowthData?.sliderResponse1 &&
      developmentGrowthData?.sliderResponse2;
    onValidate(isValid);
  }, [developmentGrowthData, onValidate]);

  return questionData?.length > 0 ? (
    <div>
      <CustomTitleAndContent data={groupData} />

      <div style={{ marginTop: "10px" }}>
        <CustomRadioSelectionCard
          data={data?.questions[0]}
          initialValue={developmentGrowthData?.radioResponse1?.inputValue || ""}
          options={data?.questions[0]?.options}
          onChange={(value) =>
            handleRadioChange(
              data?.questions[0]?.id,
              value,
              data?.questions[0]?.options,
              "radioResponse1"
            )
          }
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <CustomRadioSliderCard
          data={data?.questions[1]}
          initialValue={
            developmentGrowthData?.sliderResponse1?.inputValue || ""
          }
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
        <CustomRadioSelectionCard
          data={data?.questions[2]}
          initialValue={developmentGrowthData?.radioResponse2?.inputValue || ""}
          options={data?.questions[2]?.options}
          onChange={(value) =>
            handleRadioChange(
              data?.questions[2]?.id,
              value,
              data?.questions[2]?.options,
              "radioResponse2"
            )
          }
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <CustomRadioSliderCard
          data={data?.questions[3]}
          initialValue={
            developmentGrowthData?.sliderResponse2?.inputValue || ""
          }
          options={data?.questions[3]?.options}
          onChange={(value) =>
            handleSliderChange(
              data?.questions[3]?.id,
              value,
              data?.questions[3]?.options,
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

export default DevelopmentGrowth;
