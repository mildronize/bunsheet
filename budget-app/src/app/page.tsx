import * as React from "react";
import { AddTransactionForm } from "./components/AddTransaction";
import { ShowTransactionQueue } from "./components/ShowTransactionQueue";
import { Container, Typography } from "@mui/material";
import { TransactionList } from "./components/TransactionList";
import { TransactionListSection } from "./components/TransactionListSection";

export default function Home() {
  return (
    <Container maxWidth="sm" className="mb-160">
      {/* <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
        Add Transaction
      </Typography>
      <AddTransactionForm />
      <ShowTransactionQueue /> */}
      <TransactionListSection />
    </Container>
  );
}
