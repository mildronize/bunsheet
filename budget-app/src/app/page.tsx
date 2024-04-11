import * as React from "react";
import { AddTransaction } from "./components/AddTransaction";
import { ShowTransactionQueue } from "./components/ShowTransactionQueue";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <div>
      <AddTransaction />
      <Container maxWidth="sm" className="mb-160">
        <ShowTransactionQueue />
      </Container>
    </div>
  );
}
