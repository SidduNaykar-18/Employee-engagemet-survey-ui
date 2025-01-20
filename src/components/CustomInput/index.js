import React from "react";
import { Input } from "antd";

const CustomInput = ({ ...props }) => {
  return (
    <Input
      {...props} 
     
      style={{
        border: "none",
        borderBottom: "1px solid #219EBC", 
        borderRadius: 0, 
        padding: "8px", 
        fontSize: "16px", 
        ...props.style, 
      }}
    />
  );
};

export default CustomInput;
