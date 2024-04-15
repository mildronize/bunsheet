"use client";
import * as React from "react";
import { ControlledDatePicker } from "../components/DatePicker";
import TextField from "@mui/material/TextField";
import { CurrencyTextField } from "../components/CurrencyTextField";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Fab,
  LinearProgress,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Toaster, toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BaseResponse } from "@/global/response";
import { useForm, SubmitHandler } from "react-hook-form";
import { ControlledAutocompleteTextField } from "../components/ControlledAutocompleteTextField";
import dayjs, { Dayjs } from "dayjs";
import { TrasactionPost } from "../api/transaction/route";
import { InferRouteResponse } from "@/types";
import type * as SelectAccount from "@/app/api/select/account/route";
import { catchResponseMessage } from "@/global/catchResponse";

type Inputs = {
  amount: string;
  payee: string;
  category: string;
  account: string;
  date: Dayjs | null;
  memo: string;
};

export type SelectGetResponse = InferRouteResponse<typeof SelectAccount.GET>;

export function AddTransactionTab() {
  const selectAccountGet = useQuery<SelectGetResponse>({
    queryKey: ["selectAccountGet"],
    queryFn: () =>
      axios
        .get("/api/select/account")
        .then((res) => res.data)
        .catch(catchResponseMessage),
  });

  const selectCategoryGet = useQuery<SelectGetResponse>({
    queryKey: ["selectCategoryGet"],
    queryFn: () =>
      axios
        .get("/api/select/category")
        .then((res) => res.data)
        .catch(catchResponseMessage),
  });

  const saveMutation = useMutation({
    mutationKey: ["saveTransaction"],
    mutationFn: async (data: TrasactionPost) => {
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
    reset,
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

  if (selectAccountGet.error) {
    return (
      <Alert severity="error">
        Select Account Error: {selectAccountGet.error?.message}
      </Alert>
    );
  }

  if (selectCategoryGet.error) {
    return (
      <Alert severity="error">
        Select Category Error: {selectCategoryGet.error?.message}
      </Alert>
    );
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const parsedData: TrasactionPost = {
      amount: parseFloat(data.amount),
      payee: data.payee,
      category: data.category,
      account: data.account,
      date: data.date?.toISOString() ?? null,
      memo: data.memo,
      type: "add_transaction_queue",
    };
    console.log("Submit data: ", parsedData);
    saveMutation.mutate(parsedData);
    reset();
  };

  return (
    <Box sx={{ paddingLeft: '15px', paddingRight: '15px' }} >
      {saveMutation.isPending ? (
        <Box sx={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 100 }}>
          <LinearProgress />
        </Box>
      ) : null}
      <Typography variant="h6" gutterBottom>
        Add Transaction
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-input"></div>
        <div className="form-input">
          <CurrencyTextField control={control} name="amount" label="Amount" />
        </div>
        <div className="form-input">
          {/* TODO: Add Autocomplete with freeSolo Mode later */}
          {/* <ControlledAutocompleteTextField
            options={options}
            control={control}
            name="payee"
            placeholder="Payee"
          /> */}
          <TextField
            {...register("payee")}
            label="Payee"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="form-input">
          <ControlledAutocompleteTextField
            options={selectCategoryGet.data?.data ?? []}
            control={control}
            name="category"
            placeholder="Category"
          />
        </div>
        <div className="form-input">
          <ControlledAutocompleteTextField
            options={selectAccountGet.data?.data ?? []}
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
        <Toaster closeButton richColors duration={2000} position="top-center" />
        <div className="form-input">
          {/* <Button
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={saveMutation.isPending}
            endIcon={<SendIcon />}
          >
            Add Transaction
          </Button> */}
          <Box sx={{ position: "fixed", bottom: 80, right: 25, zIndex: 100 }}>
            <Fab
              variant="extended"
              color="primary"
              type="submit"
              disabled={saveMutation.isPending}
            >
              <SendIcon sx={{ mr: 1 }} />
              Add Transaction
            </Fab>
          </Box>
        </div>
      </form>
    </Box>
  );
}
