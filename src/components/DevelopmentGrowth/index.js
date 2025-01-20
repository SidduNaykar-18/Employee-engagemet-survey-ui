import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTitleAndContent from "../CustomTitleAndContent";
import CustomRadioSelectionCard from "../CustomRadioSelectionCard";
import CustomSliderCard from "../CustomSliderCard";
import { updateSurveyData } from "../../redux/slices/surveySlice";
import CustomLoading from "../CustomLoading";

const DevelopmentGrowth = ({ onValidate, questionData }) => {
  const dispatch = useDispatch();

  const developmentGrowthData = useSelector(
    (state) => state?.surveyData?.developmentGrowth
  );



  useEffect(() => {
    const isValid =
      developmentGrowthData?.radioResponse &&
      developmentGrowthData?.sliderResponse1 &&
      developmentGrowthData?.sliderResponse2;
    onValidate(isValid);
  }, [developmentGrowthData, onValidate]);

  const data = questionData?.length > 0 ? questionData[1] : {};

  const groupData = {
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
        section: "developmentGrowth",
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
        section: "developmentGrowth",
        dataKey: `sliderResponse${sliderIndex}`,
        dataValue: payload,
      })
    );
  };

  return questionData?.length > 0 ? (
    <div>
      <CustomTitleAndContent data={groupData} />
      <div style={{ marginTop: "10px" }}>
        <CustomRadioSelectionCard
          data={data?.questions[1]}
          initialValue={developmentGrowthData?.radioResponse?.inputValue}
          options={data?.questions[1]?.options}
          onChange={(value) =>
            handleRadioChange(
              data?.questions[1]?.id,
              value,
              data?.questions[1]?.options
            )
          }
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <CustomSliderCard
          data={data?.questions[0]}
          initialValue={developmentGrowthData?.sliderResponse1?.inputValue}
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
        <CustomSliderCard
          data={data?.questions[2]}
          initialValue={developmentGrowthData?.sliderResponse2?.inputValue}
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

export default DevelopmentGrowth;
