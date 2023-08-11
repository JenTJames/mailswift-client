import { Button as MuiButton } from "@mui/material";

const Button = ({
  color,
  variant = "text",
  children,
  type = "button",
  onClick,
  startIcon,
  endIcon,
  size = "small",
}) => {
  return (
    <MuiButton
      onClick={onClick}
      type={type}
      sx={{
        textTransform: "none",
      }}
      disableElevation
      color={color || "brand"}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
      size={size}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
