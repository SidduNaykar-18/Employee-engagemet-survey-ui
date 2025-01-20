import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

const CustomLoading = ({
  size = 40,
  style = {},
  fullScreen = true,
  message,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: fullScreen ? "70vh" : "auto",
        ...style,
      }}
    >
      <LoadingOutlined
        style={{ fontSize: size,  }}
        spin
      />
      <div style={{ fontSize: "18px" }}>{message}</div>
    </div>
  );
};

export default CustomLoading;
