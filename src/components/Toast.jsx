import { useEffect, useState } from "react";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { IconButton } from "@mui/material";

const Toast = ({ variant = "error", children, updateError = null }) => {
  const [showToast, setShowToast] = useState(true);
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (updateError) {
        updateError({
          isVisible: false,
          message: null,
        });
      }
      setShowToast(false);
    }, 5000);
    return () => {
      clearTimeout(timerId);
    };
  }, [updateError]);
  const closeHandler = () => {
    if (updateError) {
      updateError({
        isVisible: false,
        message: null,
      });
    }
    setShowToast(false);
  };
  if (showToast) {
    if (variant === "error")
      return (
        <div className="flex items-center justify-between gap-6 animate-translate-up bg-red-200 py-2 px-3 rounded fixed bottom-3 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-red-600 font-semibold">{children}</p>
          <IconButton onClick={closeHandler}>
            <HighlightOffRoundedIcon color="error" />
          </IconButton>
        </div>
      );
  }
};

export default Toast;
