"use client";
import * as React from "react";
import { DatePicker } from "./DatePicker";
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

export function AddTransaction() {
  const saveMutation = useMutation({
    mutationKey: ["saveTransaction"],
    mutationFn: async (data) => {
      return axios.post("/api/transaction", data)
      .catch((error: unknown) => {
        if (axios.isAxiosError(error) && error.response) {
          const data = error.response.data as BaseResponse;
          // TODO: Hotfix for the error message not being displayed.
          toast.error('Save Failed: ' + data.message);
          throw new Error(data.message);
        }
        throw error;
      })
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

  return (
    <Container maxWidth="sm">
      <div className="form-input">
        <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
          Add Transaction
        </Typography>
      </div>
      <div className="form-input">
        <CurrencyTextField label="Amount " />
      </div>
      <div className="form-input">
        <AutocompleteTextField label="Payee" freeSolo />
      </div>
      <div className="form-input">
        <GroupAutocompleteTextField label="Category" />
      </div>
      <div className="form-input">
        <AutocompleteTextField label="Account" />
      </div>
      <div className="form-input">
        <DatePicker />
      </div>
      <div className="form-input">
        <TextField
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
          disabled={saveMutation.isPending}
          onClick={() => saveMutation.mutate()}
          endIcon={<SendIcon />}
        >
          Add Transaction
        </Button>

        {saveMutation.isPending ? <LinearProgress /> : null}
      </div>
    </Container>
  );
}
