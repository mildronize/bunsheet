"use client";
import * as React from "react";
import { ControlledDatePicker, DatePicker } from "./DatePicker";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { CurrencyTextField } from "./CurrencyTextField";
import {
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import { GroupAutocompleteTextField } from "./GroupAutocompleteTextField";
import { AutocompleteTextField } from "./AutocompleteTextField";
import SendIcon from "@mui/icons-material/Send";
import { Toaster, toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BaseResponse } from "@/global/response";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { ControlledAutocompleteTextField } from "./ControlledAutocompleteTextField";
import dayjs, { Dayjs } from "dayjs";

const options = [
  {
    id: "1",
    label: "Option 1",
  },
  {
    id: "2",
    label: "Option 2",
  },
  {
    id: "3",
    label: "Option 3",
  },
  {
    id: "4",
    label: "Option 4",
  },
];

type Inputs = {
  amount: string;
  payee: string;
  category: string;
  account: string;
  date: Dayjs | null;
  memo: string;
};

export function AddTransactionForm() {
  const saveMutation = useMutation({
    mutationKey: ["saveTransaction"],
    mutationFn: async (data) => {
      return axios.post("/api/transaction", data).catch((error: unknown) => {
        if (axios.isAxiosError(error) && error.response) {
          const data = error.response.data as BaseResponse;
          // TODO: Hotfix for the error message not being displayed.
          toast.error("Save Failed: " + data.message);
          throw new Error(data.message);
        }
        throw error;
      });
    },
    onSuccess: () => {
      toast.success("Save Successfully");
    },
    onError: (error) => {
      // TODO: Somehow the error message is not displayed.
      // toast.error(
      //   "Save Failed: " + JSON.stringify(error)
      // );
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      amount: "-0",
      payee: "",
      category: "",
      account: "",
      date: dayjs(),
      memo: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // saveMutation.mutate(data);
    console.log(data);
    console.log(data.date?.format("YYYY-MM-DD"))
    toast.success("Save Successfully");
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-input">
          <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
            Add Transaction
          </Typography>
        </div>
        <div className="form-input">
          {/* <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <CurrencyTextField {...field} label="Amount" />
            )}
          /> */}
          <CurrencyTextField control={control} name="amount" label="Amount" />
        </div>
        <div className="form-input">
          <ControlledAutocompleteTextField
            options={options}
            control={control}
            name="payee"
            placeholder="Payee"
          />
        </div>
        <div className="form-input">
          <ControlledAutocompleteTextField
            options={options}
            control={control}
            name="category"
            placeholder="Category"
          />
        </div>
        <div className="form-input">
          <ControlledAutocompleteTextField
            options={options}
            control={control}
            name="account"
            placeholder="Account"
          />
        </div>
        <div className="form-input">
          {/* https://github.com/orgs/react-hook-form/discussions/10135 */}
          <ControlledDatePicker control={control} name="date" />
        </div>
        <div className="form-input">
          <TextField
            {...register("memo")}
            id="outlined-basic"
            label="Memo"
            variant="outlined"
            fullWidth
          />
        </div>
        <Toaster
          closeButton
          richColors
          duration={2000}
          position="bottom-center"
        />
        <div className="form-input">
          <Button
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={saveMutation.isPending}
            endIcon={<SendIcon />}
          >
            Add Transaction
          </Button>

          {saveMutation.isPending ? <LinearProgress /> : null}
        </div>
      </form>
    </Container>
  );
}
