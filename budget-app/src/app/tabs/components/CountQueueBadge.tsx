"use client";

import { useQuery } from "@tanstack/react-query";
import type * as TransactionQueue from "@/app/api/transaction/queue/route";
import { InferRouteResponse } from "@/types";
import { Badge } from "@mui/material";
import axios from "axios";
import { catchResponseMessage } from "@/global/catchResponse";
import { useEventEmitter } from "@/hooks/useEventEmitter";
import { useSignalR } from "@/hooks/useSignalR";

export type TransactionQueueGetResponse = InferRouteResponse<
  typeof TransactionQueue.GET
>;

function parseQueueCount(count: number | undefined): number {
  return count && count > 0 ? count : 0;
}

export interface CountQueueBadgeProps {
  children?: React.ReactNode;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function CountQueueBadge(props: CountQueueBadgeProps) {
  const queueCount = useQuery<TransactionQueueGetResponse>({
    queryKey: ["queueCount"],
    queryFn: () =>
      axios
        .get("/api/transaction/queue")
        .then((res) => res.data)
        .catch(catchResponseMessage),
  });

  useEventEmitter({
    eventName: "queueCount",
    onReceive: async () => {
      console.log("queueCount event received");
      console.log("refetching queueCount");
      await delay(500);
      queueCount.refetch();
    },
  });

  useSignalR({
    onMessages: {
      monthlyBudgetUpdated: async () => {
        console.log("refetching queueCount");
        queueCount.refetch();
      },
      transactionUpdated: async () => {
        console.log("refetching queueCount");
        queueCount.refetch();
      }
    },
  });

  if (queueCount.error) {
    return props.children;
  }

  if (queueCount.isLoading) {
    return props.children;
  }

  if (
    parseQueueCount(queueCount.data?.data?.transactionMain) +
      parseQueueCount(queueCount.data?.data?.longMain) ===
    0
  ) {
    return props.children;
  }

  return (
    <Badge
      badgeContent={
        parseQueueCount(queueCount.data?.data?.transactionMain) +
        parseQueueCount(queueCount.data?.data?.longMain)
      }
      color="warning"
    >
      {props.children}
    </Badge>
  );
}
