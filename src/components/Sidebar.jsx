import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import GppBadRoundedIcon from "@mui/icons-material/GppBadRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import UserDetails from "./UserDetails";
import Button from "./Button";
import NavLink from "./NavLink";

const Sidebar = () => {
  return (
    <div className="w-[400px] bg-slate-200 h-full flex flex-col justify-between p-5">
      <div className="flex flex-col  gap-10">
        <UserDetails />
        <Button
          size="large"
          variant="contained"
          startIcon={<CreateRoundedIcon />}
        >
          Compose
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <NavLink icon={<InboxRoundedIcon fontSize="large" />} to="/inbox">
          Inbox
        </NavLink>
        <NavLink
          icon={<ForwardToInboxRoundedIcon fontSize="large" />}
          to="/sent-mails"
        >
          Sent Mails
        </NavLink>
        <NavLink icon={<GppBadRoundedIcon fontSize="large" />} to="/spam">
          Spam
        </NavLink>
        <NavLink icon={<DeleteRoundedIcon fontSize="large" />} to="/trash">
          Trash
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
