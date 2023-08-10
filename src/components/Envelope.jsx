import { Typography } from "@mui/material";

import Avatar from "./Avatar";

const Envelope = () => {
  return (
    <div className="flex items-center w-full gap-3 hover:bg-emerald-100 cursor-pointer p-2">
      <Avatar variant="circle" bgColor="orange" />
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-between">
          <Typography variant="p" className="text-slate-500">
            Puma
          </Typography>
          <Typography variant="p" className="text-slate-500">
            10:30pm
          </Typography>
        </div>
        <Typography variant="h6" className="text-slate-700">
          Order Placed!
        </Typography>
        <Typography variant="p" className="text-slate-500">
          Thank you for placing the order!...
        </Typography>
      </div>
    </div>
  );
};

export default Envelope;
