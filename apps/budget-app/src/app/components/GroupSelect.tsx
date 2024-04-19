import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

interface GroupSelectProps {
  label?: string;
}

export function GroupSelect(props: GroupSelectProps) {
  return (
    <div>
      <InputLabel>{props.label ?? "Grouping"}</InputLabel>
      <Select
        {...props}
        native
        defaultValue=""
        id="grouped-native-select"
        label={props.label ?? "Grouping"}
        fullWidth
      >
        <option aria-label="None" value="" />
        <optgroup label="Needs">
          <option value={1}>Prep Meal & Fruit</option>
          <option value={2}>Gas</option>
        </optgroup>
        <optgroup label="Subscriptions">
          <option value={3}>Notion</option>
          <option value={4}>Azure</option>
        </optgroup>
      </Select>
    </div>
  );
}
