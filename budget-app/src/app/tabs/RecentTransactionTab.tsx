"use client";
import { catchResponseMessage } from "@/global/catchResponse";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TransactionList } from "../components/TransactionList";
import { InferRouteResponse } from "@/types";
import * as Transaction from "@/app/api/transaction/route";
import { Typography } from "@mui/material";

export type TransactionGetResponse = InferRouteResponse<typeof Transaction.GET>;

export function RecentTransactionTab() {
  const transactionList = useQuery<TransactionGetResponse>({
    queryKey: ["transactionList"],
    queryFn: () =>
      axios
        .get("/api/transaction")
        .then((res) => res.data)
        .catch(catchResponseMessage),
  });

  return (
    <div>
      <Typography variant="h6" gutterBottom sx={{ paddingLeft: '15px'}}>
        Recent Transactions
      </Typography>
      <TransactionList data={transactionList.data?.data ?? []} />
    </div>
  );
}