import { useContext, useState } from "react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";
import { DateTime } from "luxon";

import InboxContext from "../contexts/inbox-context";

import Avatar from "./Avatar";

const Envelope = ({ mail }) => {
  const inboxContext = useContext(InboxContext);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isSpamHovered, setIsSpamHovered] = useState(false);

  const getDate = (timestamp) => {
    const date = DateTime.fromISO(timestamp);
    const today = DateTime.local().startOf("day");
    const yesterday = today.minus({ days: 1 });

    if (date.hasSame(today, "day")) {
      return date.toFormat("hh:mm a");
    } else if (date.hasSame(yesterday, "day")) {
      return "Yesterday";
    } else {
      return date.toFormat("MMM dd, yyyy");
    }
  };

  const truncateText = (text) => {
    const maxLength = 67;
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + "...";
  };

  const loadMailHandler = () => {
    inboxContext.setMailID(mail.id);
  };

  const markAsSpamHandler = () => {};

  const moveToTrashHandler = () => {};

  return (
    <div
      className="flex items-center w-full border rounded-md gap-3 hover:bg-emerald-100 cursor-pointer p-2"
      onClick={loadMailHandler}
    >
      <Avatar variant="circle" bgColor="orange" />
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-between">
          <Typography variant="p" className="text-slate-500">
            {mail.sender.name}
          </Typography>
          <Typography variant="p" className="text-slate-500">
            {getDate(mail.sentAt)}
          </Typography>
        </div>
        <Typography variant="h6" className="text-slate-700">
          {mail.subject}
        </Typography>
        <Typography variant="p" className="text-slate-500">
          {truncateText(mail.body)}
        </Typography>
        <div className="flex justify-end">
          <Tooltip title="Move to Trash">
            <IconButton
              onClick={moveToTrashHandler}
              onMouseEnter={() => setIsDeleteHovered(true)}
              onMouseLeave={() => setIsDeleteHovered(false)}
            >
              <DeleteOutlineRoundedIcon
                color={isDeleteHovered ? "error" : "disabled"}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Mark as Spam">
            <IconButton
              onClick={markAsSpamHandler}
              onMouseEnter={() => setIsSpamHovered(true)}
              onMouseLeave={() => setIsSpamHovered(false)}
            >
              <OutlinedFlagTwoToneIcon
                color={isSpamHovered ? "warning" : "disabled"}
              />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Envelope;
