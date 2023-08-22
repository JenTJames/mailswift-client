import { useState } from "react";

const useToast = () => {
  const [toastData, setToastData] = useState({
    isVisible: false,
    message: null,
    severity: "error",
  });

  const setToast = (isVisible, message, severity) => {
    setToastData({
      isVisible,
      message,
      severity,
    });
  };

  return {
    setToast,
    toastData,
  };
};
export default useToast;
