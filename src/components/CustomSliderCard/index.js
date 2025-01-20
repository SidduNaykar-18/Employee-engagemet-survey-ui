import React, { useState, useEffect } from "react";
import { Card, Slider, Row, Col } from "antd";

const CustomSliderCard = ({ data, onChange, initialValue }) => {
  const sliderMarks = {
    0: "Never",
    1: "Rarely",
    2: "Often",
    3: "Always",
  };

  const getNumericValue = (value) => {
    const keys = Object.keys(sliderMarks);
    return keys.find(key => sliderMarks[key] === value) || 0; 
  };

  const [value, setValue] = useState(getNumericValue(initialValue)); 
  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(getNumericValue(initialValue)); 
    }
  }, [initialValue]);

  const handleSliderChange = (value) => {
    setValue(value);
    const label = sliderMarks[value];
    onChange(label);
  };

  return (
    <Card
      style={{
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "15px",
        backgroundColor: "#fff",
        marginBottom: "20px",
        fontFamily: "Montserrat-SemiBold",
      }}
      title={data?.question}
    >
      <Row justify="center">
        <Col
          xs={24}
          sm={24}
          md={20}
          lg={16}
          xl={12}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Slider
            min={0}
            max={3}
            marks={sliderMarks}
            step={null}
            value={value}
            onChange={handleSliderChange}
            tooltipVisible={false}
            style={{
              width: "100%",
              marginTop: "10px",
              fontFamily: "Montserrat-SemiBold",
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};


export default CustomSliderCard;
