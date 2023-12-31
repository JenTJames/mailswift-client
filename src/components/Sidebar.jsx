import { useState } from "react";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";
import ForwardToInboxRoundedIcon from "@mui/icons-material/ForwardToInboxRounded";
import GppBadRoundedIcon from "@mui/icons-material/GppBadRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import UserDetails from "./UserDetails";
import Button from "./Button";
import NavLink from "./NavLink";
import Dialog from "./Dialog";
import ComposeMail from "./ComposeMail";

const composeEmailData = {
  title: "New Email",
  titleIcon: <CreateRoundedIcon fontSize="large" className="text-slate-500" />,
};

const Sidebar = () => {
  const [composeEmail, setComposeEmail] = useState(false);

  const logoutHandler = () => {
    localStorage.clear();
  };

  return (
    <>
      {composeEmail && (
        <Dialog
          size="md"
          open={composeEmail}
          handleClose={() => {
            setComposeEmail(false);
          }}
          data={composeEmailData}
        >
          <ComposeMail
            discardHandler={() => {
              setComposeEmail(false);
            }}
          />
        </Dialog>
      )}
      <div className="w-[400px] bg-slate-200 h-full flex flex-col justify-between p-5">
        <div className="flex flex-col gap-10">
          <UserDetails />
          <Button
            onClick={() => {
              setComposeEmail(true);
            }}
            size="large"
            variant="contained"
            startIcon={<CreateRoundedIcon />}
          >
            Compose
          </Button>
        </div>
        <div className="flex flex-1 flex-col gap-2 justify-center">
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
          <NavLink
            onClick={logoutHandler}
            icon={<LogoutRoundedIcon fontSize="large" />}
            to="/login"
          >
            Logout
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
