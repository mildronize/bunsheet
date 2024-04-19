"use client";

import { useQuery } from "@tanstack/react-query";
import type * as TransactionQueue from "@/app/api/transaction/queue/route";
import { InferRouteResponse } from "@/types";
import { Chip } from "@mui/material";
import axios from "axios";
import { catchResponseMessage } from "@/global/catchResponse";

export type TransactionQueueGetResponse = InferRouteResponse<
  typeof TransactionQueue.GET
>;

export function CountQueueChip() {
  const transactionQueue = useQuery<TransactionQueueGetResponse>({
    queryKey: ["transactionQueue"],
    queryFn: () =>
      axios
        .get("/api/transaction/queue")
        .then((res) => res.data)
        .catch(catchResponseMessage),
  });

  if (transactionQueue.error) {
    return null;
  }

  if (transactionQueue.isLoading) {
    return null;
  }

  return (
    <>
      {transactionQueue.data?.data?.numberOfMessages &&
      transactionQueue.data?.data?.numberOfMessages > 0 ? (
        <Chip
          label={String(transactionQueue.data?.data.numberOfMessages)}
          color="primary"
          size="small"
        />
      ) : null}
    </>
  );
}
