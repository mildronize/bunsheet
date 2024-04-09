"use client";

import dayjs, { Dayjs } from "dayjs";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";

export function DatePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <MuiDatePicker
          label="Uncontrolled picker"
          defaultValue={dayjs()}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}