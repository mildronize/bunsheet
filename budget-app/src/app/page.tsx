import * as React from "react";
import { AddTransactionForm } from "./components/AddTransaction";
import { ShowTransactionQueue } from "./components/ShowTransactionQueue";
import { Container, Typography } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="sm" className="mb-160">
      <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
        Add Transaction
      </Typography>
      <AddTransactionForm />
      <ShowTransactionQueue />
    </Container>
  );
}
