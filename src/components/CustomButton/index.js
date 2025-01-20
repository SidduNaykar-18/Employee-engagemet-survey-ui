import React from "react";
import { Button } from "antd";
import { StepForwardFilled } from "@ant-design/icons";

const CustomButton = ({ onClick }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "279px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#DFE5FC",
        borderRadius: "30px",
        overflow: "hidden",
        transition: "all 300ms ease-out",
        cursor: "pointer",
      }}
      onClick={onClick} 
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <span
        style={{
          flex: 1,
          textAlign: "center",
          color: "#365DFF",
          fontSize: "16px",
          fontWeight: "600",
        }}
      >
        Complete Now
      </span>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#365DFF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StepForwardFilled
          style={{
            fontSize: "18px",
            color: "#FFFFFF",
          }}
        />
      </div>
    </div>
  );
};

export default CustomButton;
