
import Image from "next/image";
import * as React from "react";
import { DatePicker } from "./components/DatePicker";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { CurrencyTextField } from "./components/CurrencyTextField";
import { GroupSelect } from "./components/GroupSelect";
import { Select } from "./components/Select";
import { Button, Typography } from "@mui/material";
import { GroupAutocompleteTextField } from "./components/GroupAutocompleteTextField";
import { AutocompleteTextField } from "./components/AutocompleteTextField";

/**
 * UI from https://flowbite.com/docs/components/forms/
 */

export default function Home() {
  return (
    <Container maxWidth="sm">
      <div className="form-input">
        <Typography variant="h6" gutterBottom style={{ textAlign: 'center'}}>
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
      <TextField id="outlined-basic" label="Memo" variant="outlined" fullWidth/>
      </div>
      <div className="form-input">
        <Button variant="contained" size="large" fullWidth>
          Save
        </Button>
      </div>
    </Container>
  );
}
