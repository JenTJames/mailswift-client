import { Button as MuiButton } from "@mui/material";

const Button = ({
  color,
  variant = "text",
  children,
  type = "button",
  onClick,
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
    >
      {children}
    </MuiButton>
  );
};

export default Button;
