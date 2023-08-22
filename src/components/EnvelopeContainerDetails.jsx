import { IconButton, Tooltip, Typography } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { useEffect, useState } from "react";

const EnvelopeContainerDetails = ({
  refreshInbox,
  totalMessages,
  totalUnread,
  animateReloadIcon,
}) => {
  const [reloadStyles, setReloadStyles] = useState("");

  useEffect(() => {
    if (animateReloadIcon) {
      setReloadStyles("animate-spin");
    } else {
      setReloadStyles("");
    }
  }, [animateReloadIcon]);

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h4">Inbox</Typography>
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <Typography variant="p" className="text-slate-400">
            {totalMessages} messages
          </Typography>
          <Typography variant="p" className="text-slate-400">
            {totalUnread} unread
          </Typography>
        </div>
        <Tooltip title="Refresh">
          <IconButton className={reloadStyles} onClick={refreshInbox}>
            <RefreshRoundedIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default EnvelopeContainerDetails;
