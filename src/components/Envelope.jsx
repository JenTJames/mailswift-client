import { Typography } from "@mui/material";
import { DateTime } from "luxon";

import Avatar from "./Avatar";

const Envelope = ({ mail }) => {
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

  return (
    <div className="flex items-center w-full border rounded-md gap-3 hover:bg-emerald-100 cursor-pointer p-2">
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
      </div>
    </div>
  );
};

export default Envelope;
