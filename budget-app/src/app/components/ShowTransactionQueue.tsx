"use client";

import { useQuery } from "@tanstack/react-query";
import type * as TransactionQueue from "@/app/api/transaction/queue/route";
import { InferRouteResponse } from "@/types";
import { Alert, Container, Skeleton } from "@mui/material";
import axios from "axios";
import { catchResponseMessage } from "@/global/catchResponse";

export type TransactionQueueGetResponse = InferRouteResponse<
  typeof TransactionQueue.GET
>;

export function ShowTransactionQueue() {
  const transactionQueue = useQuery<TransactionQueueGetResponse>({
    queryKey: ["transactionQueue"],
    queryFn: () =>
      axios
        .get("/api/transaction/queue")
        .then((res) => res.data)
        .catch(catchResponseMessage),
  });

  if (transactionQueue.error) {
    return (
      <Alert severity="error">
        Error: {transactionQueue.error?.message}
      </Alert>
    );
  }

  if (transactionQueue.isLoading) {
    return <Skeleton variant="text" sx={{ fontSize: "2rem" }} />;
  }

  if(transactionQueue.data?.data?.numberOfMessages === 0){
    return <></>;
  }

  return (
    <Alert severity="warning">
      Number of messages in queue:{" "}
      {String(transactionQueue.data?.data.numberOfMessages)}
    </Alert>
  );
}
