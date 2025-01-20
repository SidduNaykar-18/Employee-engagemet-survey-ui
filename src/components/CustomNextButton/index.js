import React from "react";
import { StepForwardFilled } from "@ant-design/icons";

const CustomNextButton = ({ onClick }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "160px",
        height: "54px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: "30px",
        overflow: "hidden",
        transition: "all 300ms ease-out",
        cursor: "pointer",
        border:"1px solid #365DFF"
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
        Next
      </span>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#D9D9D9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StepForwardFilled
          style={{
            fontSize: "18px",
            color: "#365DFF",
          }}
        />
      </div>
    </div>
  );
};

export default CustomNextButton;
