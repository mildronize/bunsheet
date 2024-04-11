"use client";
import * as React from "react";
import { DatePicker } from "./DatePicker";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { CurrencyTextField } from "./CurrencyTextField";
import { Button, Typography } from "@mui/material";
import { GroupAutocompleteTextField } from "./GroupAutocompleteTextField";
import { AutocompleteTextField } from "./AutocompleteTextField";
import { Toaster, toast } from "sonner";

export function AddTransaction() {
  const handleSave = async () => {
    const result = await fetch("/api/transaction", {
      method: "POST",
    });
    console.log('result', result);
    toast.success("Save Successfully");
  };

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
        <Button variant="contained" size="large" fullWidth onClick={handleSave}>
          Save
        </Button>
      </div>
    </Container>
  );
}
