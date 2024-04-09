import Image from "next/image";
import * as React from "react";
import { DatePicker } from "./components/DatePicker";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { CurrencyTextField } from "./components/CurrencyTextField";
import { GroupSelect } from "./components/GroupSelect";
import { Select } from "./components/Select";
import { Button, Typography } from "@mui/material";

/**
 * UI from https://flowbite.com/docs/components/forms/
 */

export default function Home() {
  return (
    <Container maxWidth="sm">
      <div className="form-input">
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center'}}>
          Add Transaction
        </Typography>
      </div>
      <div className="form-input">
        <CurrencyTextField label="Amount " />
      </div>
      <div className="form-input">
        <GroupSelect label="Category" />
      </div>
      <div className="form-input">
        <Select label="Account" />
      </div>
      <div className="form-input">
        <DatePicker />
      </div>
      <div className="form-input">
        <Button variant="contained" size="large" fullWidth>
          Save
        </Button>
      </div>
    </Container>
  );
}
