import * as React from "react";
import { AddTransactionForm } from "./components/AddTransaction";
import { ShowTransactionQueue } from "./components/ShowTransactionQueue";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <div>
      <AddTransactionForm />
      <Container maxWidth="sm" className="mb-160">
        <ShowTransactionQueue />
      </Container>
    </div>
  );
}
