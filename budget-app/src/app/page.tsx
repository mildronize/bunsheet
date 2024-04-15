import * as React from "react";
import { AddTransactionTab } from "./tabs/AddTransactionTab";
import { ShowTransactionQueue } from "./components/ShowTransactionQueue";
import { Container, Typography } from "@mui/material";
import { TransactionList } from "./components/TransactionList";
// import { TransactionListSection } from "./components/TransactionListSection";
import { BottomNavigation } from "./tabs/components/BottomNavigation";
import { RootBottomNavigation } from "./tabs/RootBottomNavigation";

export default function Home() {
  return (
    <div>
      {/* <Typography variant="h6" gutterBottom style={{ textAlign: "center" }}>
        Add Transaction
      </Typography>
      <AddTransactionForm />
      <ShowTransactionQueue /> */}
      {/* <TransactionListSection /> */}
      <RootBottomNavigation />
    </div>
  );
}
