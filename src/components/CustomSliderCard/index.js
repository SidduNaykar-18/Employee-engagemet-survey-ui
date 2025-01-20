import React, { useState, useEffect } from "react";
import { Card, Row, Col, Radio } from "antd";

const CustomRadioSliderCard = ({ data, onChange, initialValue, section, sliderIndex }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (initialValue !== undefined) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleRadioChange = (e) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    onChange(selectedValue); 
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
          <Radio.Group
            value={value}
            onChange={handleRadioChange}
            style={{
              width: "100%",
              marginTop: "10px",
              fontFamily: "Montserrat-SemiBold",
           
      
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
        {data?.options?.map((option) => (
          <Radio key={option.id} value={option?.value}>
            {option?.value}
          </Radio>
        ))}
      </div>
          </Radio.Group>
        </Col>
      </Row>
    </Card>
  );
}
export default CustomRadioSliderCard;
