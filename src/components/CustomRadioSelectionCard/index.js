import React, { useEffect, useState } from "react";
import { Radio, Card } from "antd";
const CustomRadioSelectionCard = ({ data, initialValue, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(initialValue);

  useEffect(() => {
    setSelectedOption(initialValue);
  }, [initialValue]);

  const handleOptionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <Card
      style={{
        margin: "0 auto",
        borderRadius: "25px",
        flexDirection: "column",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        fontFamily: "Montserrat-SemiBold",
      }}
      title={data?.question}
    >
      <Radio.Group
        onChange={handleOptionChange}
        value={selectedOption}
        style={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          fontFamily: "Montserrat-SemiBold",
        }}
      >
        <Radio style={{ fontFamily: "Montserrat-SemiBold" }} value="Yes">
          Yes
        </Radio>
        <Radio style={{ fontFamily: "Montserrat-SemiBold" }} value="No">
          No
        </Radio>
      </Radio.Group>
    </Card>
  );
};

export default CustomRadioSelectionCard;
