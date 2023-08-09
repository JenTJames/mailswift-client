import { Button as MuiButton } from "@mui/material";

const Button = ({
  color,
  variant = "text",
  children,
  type = "button",
  onClick,
  startIcon,
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
      size={size}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
