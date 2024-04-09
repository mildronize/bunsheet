
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
import { DrawerOpener } from "./components/DrawerOpener";
import { AddTransaction } from "./components/AddTransaction";

export default function Home() {
  return (
    <div>
      <AddTransaction /> 
    </div>
  );
}
