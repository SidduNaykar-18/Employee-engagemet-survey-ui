import React, { useState, useEffect } from "react";
import { Card, Input, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { updateSurveyData } from "../../redux/slices/surveySlice";

const CustomInputTextCard = ({ data, section, inputKey, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value || "");
console.log("check value========",value);

  const dispatch = useDispatch();

  useEffect(() => {
    if (section && inputKey) {
      const storedValue = localStorage.getItem(inputKey);
      if (storedValue) {
        setInputValue(storedValue);
      }
    }
  }, [section, inputKey]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

  
    const payload = {
      questionId: data?.id,
      inputValue: value,
    };


    dispatch(
      updateSurveyData({
        section,
        dataKey: inputKey,
        dataValue: payload,
      })
    );
    
    localStorage.setItem(inputKey, value);
    if (onChange) {
      onChange(value);
    }
    
  };

  return (
    <Card
      style={{
        width: "100%",
        borderRadius: "15px",
        backgroundColor: "#fff",
        marginBottom: "20px",
      }}
      title={data?.question}
    >
      <Row justify="start">
        <Col
          xs={24}
          sm={24}
          md={20}
          lg={18}
          xl={24}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Input
            value={value?.inputValue}
            onChange={handleInputChange}
            placeholder="Type Your Answer here..!"
            style={{
              height: "50px",
              borderRadius: "25px",
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default CustomInputTextCard;
