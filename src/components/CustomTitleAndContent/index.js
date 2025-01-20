import { Card } from "antd";

const CustomTitleAndContent = ({ data }) => {
  return (
    <Card
      style={{
        borderRadius: "25px",
        backgroundColor: "#2D52EB26",
      }}
    >
      <h3
        style={{
          fontFamily: "Montserrat-Bold",
          fontSize: "1.8rem",
          textAlign: "left",
          margin: "0 0 10px",
          color: "#333",
        }}
      >
        {data?.title}
      </h3>
      <span
        style={{
          fontFamily: "Montserrat-Medium",
          fontSize: "1rem",
          textAlign: "left",
          color: "#555",
          lineHeight: "1.5",
          margin: 0,
        }}
      >
        {data?.content}
      </span>
    </Card>
  );
};

export default CustomTitleAndContent;
