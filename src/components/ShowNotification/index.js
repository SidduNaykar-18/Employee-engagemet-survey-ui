import { notification } from "antd";

const showNotification = ({ type, message, description, duration = 4.5 }) => {
  notification[type]({
    message: message,
    duration,
  
  });
};

export default showNotification;
