import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import Avatar from "./Avatar";

const UserDetails = () => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = token.split(".")[1];
      const { firstname, lastname, email, id } = JSON.parse(atob(payload));
      setDetails({
        name: firstname + " " + lastname,
        email: email,
        id: id,
      });
    }
  }, []);

  return (
    <div className="bg-slate-50 rounded-md p-3 flex items-center gap-4">
      <Avatar />
      <div className="flex flex-col">
        <Typography variant="h5">{details?.name}</Typography>
        <Typography color="GrayText" variant="subtitle1">
          {details?.email}
        </Typography>
      </div>
    </div>
  );
};

export default UserDetails;
