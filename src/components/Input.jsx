import { FormControl, InputAdornment, TextField } from "@mui/material";
import React from "react";

const Input = ({
  config,
  startAdornment,
  endAdornment,
  variant = "outlined",
}) => {
  return (
    <FormControl fullWidth>
      <TextField
        InputProps={{
          startAdornment: startAdornment ? (
            <InputAdornment position="start">{startAdornment}</InputAdornment>
          ) : null,
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : null,
        }}
        variant={variant}
        color="brandLight"
        {...config}
      />
    </FormControl>
  );
};

export default Input;
