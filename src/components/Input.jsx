import { InputAdornment, TextField } from "@mui/material";
import React from "react";

const Input = ({ config, startAdornment, endAdornment }) => {
  return (
    <TextField
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : null,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : null,
      }}
      variant="outlined"
      color="brandLight"
      {...config}
    />
  );
};

export default Input;
