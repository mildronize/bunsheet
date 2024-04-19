"use client";

import * as React from "react";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface ControlledAutocompleteTextField<
  O extends { id: string; label: string },
  TField extends FieldValues
> {
  control: Control<TField>;
  name: Path<TField>;
  options: O[];
  placeholder?: string;
}
/**
 * Ref:
 * How to use MaterialUI Autocomplete with React Hook Form (1/2) by Vlad Nicula, https://www.youtube.com/watch?v=5UhpJHcA6Oc
 *
 * @param props
 * @returns
 */
export const ControlledAutocompleteTextField = <
  O extends { id: string; label: string },
  TField extends FieldValues
>(
  props: ControlledAutocompleteTextField<O, TField>
) => {
  const { control, options, name } = props;
  return (
    <Controller
      name={name}
      control={control}
      // rules={{
      //   required: "This field is requried",
      // }}
      render={({ field, fieldState: { error } }) => {
        const { onChange, value, ref } = field;
        return (
          <>
            <Autocomplete
              disabled={options.length === 0}
              value={
                value
                  ? options.find((option) => {
                      return value === option.id;
                    }) ?? null
                  : null
              }
              getOptionLabel={(option) => {
                return option.label;
              }}
              onChange={(event: any, newValue) => {
                onChange(newValue ? newValue.id : null);
              }}
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={props.placeholder}
                  inputRef={ref}
                />
              )}
            />
            {error ? (
              <span style={{ color: "red" }}>{error.message}</span>
            ) : null}
          </>
        );
      }}
    />
  );
};
