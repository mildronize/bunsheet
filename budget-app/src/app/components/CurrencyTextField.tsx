"use client";

import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import TextField from "@mui/material/TextField";
import { Controller, FieldValues } from "react-hook-form";
import { ReactHookFormControl } from "@/types";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        style={{ textAlign: "center" }}
        allowLeadingZeros={false}
        thousandSeparator
        valueIsNumericString
        // prefix="฿ "
      />
    );
  }
);

interface CurrencyTextFieldProps {
  label?: string;
}

export function CurrencyTextField<TField extends FieldValues>(
  props: CurrencyTextFieldProps & ReactHookFormControl<TField>
) {

  return (
    <Controller
      control={props.control}
      name={props.name}
      rules={{ required: true }}
      render={({ field }) => {
        return (
          <TextField
            {...props}
            label={props.label || "Amount"}
            fullWidth
            value={field.value}
            onChange={(value) => {
              field.onChange(value);
            }}
            inputRef={field.ref}
            size="medium"
            name="numberformat"
            id="formatted-numberformat-input"
            InputProps={{
              style: {
                fontSize: 40,
                color: `${
                  parseInt(field.value) <= 0 ? "red" : "green"
                }`,
              },
              inputComponent: NumericFormatCustom as any,
            }}
            variant="standard"
          />
        );
      }}
    />
  );
}
