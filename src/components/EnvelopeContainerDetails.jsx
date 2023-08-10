import { Typography } from "@mui/material";

const EnveloperContainerDetails = () => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h4">Inbox</Typography>
      <div className="flex gap-1">
        <Typography variant="p" className="text-slate-400">
          75 Messages
        </Typography>
        <Typography variant="p" className="text-slate-400">
          13 Unread
        </Typography>
      </div>
    </div>
  );
};

export default EnveloperContainerDetails;
