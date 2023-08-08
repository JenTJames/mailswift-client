import { Typography } from "@mui/material";

const Brand = ({ size = "large" }) => {
  if (size === "large") {
    return (
      <div className="flex items-center gap-1">
        <Typography className="text-slate-500" variant="h4" fontWeight={500}>
          Mail
        </Typography>
        <Typography
          className="text-slate-100 bg-green-500 p-1 rounded-md"
          variant="h5"
          fontWeight={500}
        >
          Swift
        </Typography>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-1">
        <Typography className="text-slate-500" variant="p" fontWeight={500}>
          Mail
        </Typography>
        <Typography
          className="text-slate-100 bg-green-500 p-1 rounded-md"
          variant="p"
          fontWeight={500}
        >
          Swift
        </Typography>
      </div>
    );
  }
};

export default Brand;
