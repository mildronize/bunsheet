"use client";
import { catchResponseMessage } from "@/global/catchResponse";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TransactionList } from "../components/TransactionList";
import { InferRouteResponse } from "@/types";
import * as Transaction from "@/app/api/transaction/route";
import { Alert, Box, LinearProgress } from "@mui/material";
import { useGlobalLoadingStore } from "@/store";
import { useEffect } from "react";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";

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

  useGlobalLoading(transactionList);

  if (transactionList.isError) {
    return (
      <Alert severity="error">Error: {transactionList.error?.message}</Alert>
    );
  }

  return (
    <div>
      <TransactionList data={transactionList.data?.data ?? []} />
    </div>
  );
}
