import { InputAdornment, TextField } from "@mui/material";
import React from "react";

const Input = ({ config, startIcon }) => {
  return (
    <TextField
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : null,
      }}
      variant="outlined"
      color="brandLight"
      {...config}
    />
  );
};

export default Input;
