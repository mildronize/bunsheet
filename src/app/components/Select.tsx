import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import MuiSelect from "@mui/material/Select";

interface SelectProps {
  label?: string;
}

export function Select(props: SelectProps) {
  return (
    <FormControl fullWidth>
      {props.label ?? "Select"}
      <MuiSelect
        native
        variant="outlined"
        defaultValue={''}
        inputProps={{
          name: "age",
          id: "uncontrolled-native",
        }}
      >
        <option value=""></option>
        <option value="cash">Cash</option>
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </MuiSelect>
    </FormControl>
  );
}
