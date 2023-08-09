import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import GppBadRoundedIcon from "@mui/icons-material/GppBadRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { List } from "@mui/material";

import UserDetails from "./UserDetails";
import Button from "./Button";
import NavLink from "./NavLink";

const Sidebar = () => {
  return (
    <div className="w-1/5 bg-slate-200 h-full flex flex-col gap-10 p-5">
      <UserDetails />
      <Button
        size="large"
        variant="contained"
        startIcon={<CreateRoundedIcon />}
      >
        Compose
      </Button>
      <div className="flex flex-col gap-2">
        <List>
          <NavLink icon={<InboxRoundedIcon />} label="Inbox" />
          <NavLink icon={<ForwardToInboxRoundedIcon />} label="Sent Mails" />
          <NavLink icon={<GppBadRoundedIcon />} label="Spam" />
          <NavLink icon={<DeleteRoundedIcon />} label="Trash" />
        </List>
      </div>
    </div>
  );
};

export default Sidebar;
