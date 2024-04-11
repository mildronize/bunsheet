"use client";

import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { ReactHookFormControl } from "@/types";
import { Controller, type FieldValues } from "react-hook-form";

export interface DatePickerProps extends Record<string, unknown> {
  label?: string;
  defaultValue?: Dayjs | null;
  ref?: React.Ref<any>;
}

export function ControlledDatePicker<TField extends FieldValues>(
  props: DatePickerProps & ReactHookFormControl<TField>
) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{ required: true }}
      render={({ field }) => {
        return (
          // <DatePicker ref={ref} {...otherFields} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDatePicker
              label="Date"
              value={field.value}
              slotProps={{ textField: { fullWidth: true } }}
              inputRef={field.ref}
              onChange={field.onChange}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}
//   <DemoContainer components={["DatePicker"]}>

export function DatePicker(props: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker
        {...props}
        slotProps={{ textField: { fullWidth: true } }}
        label={props.label ?? "Date"}
        // inputRef={props.ref}
        defaultValue={props.defaultValue ?? undefined}
      />
    </LocalizationProvider>
  );
}
