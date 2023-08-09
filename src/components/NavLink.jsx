import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const NavLink = ({ label, icon }) => {
  return (
    <ListItem
      sx={{
        ".MuiListItemButton-root:hover": {
          background: "#22C55E55",
          color: "green",
        },
      }}
    >
      <ListItemButton disableRipple>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

export default NavLink;
