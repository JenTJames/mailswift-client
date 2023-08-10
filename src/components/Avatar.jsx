import { Avatar as MuiAvatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Avatar = ({
  bgColor = "#22c55e",
  size = "large",
  variant = "rounded",
}) => {
  return (
    <MuiAvatar
      sx={{
        bgcolor: bgColor,
        width: size === "large" ? 65 : 45,
        height: size === "large" ? 65 : 45,
      }}
      variant={variant}
    >
      <AccountCircleIcon sx={{ fontSize: size === "large" ? 55 : 35 }} />
    </MuiAvatar>
  );
};

export default Avatar;
