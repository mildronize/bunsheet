"use client";

import { useQuery } from "@tanstack/react-query";
import type * as TransactionQueue from "@/app/api/transaction/queue/route";
import { InferRouteResponse } from "@/types";
import {
  Badge,
  Box,
  CircularProgress,
  circularProgressClasses,
  CircularProgressProps,
} from "@mui/material";
import axios from "axios";
import { catchResponseMessage } from "@/global/catchResponse";
import { useEventEmitter } from "@/hooks/useEventEmitter";
import SettingsIcon from "@mui/icons-material/Settings";
import { useEffect, useState } from "react";
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

/**
 * Inspired by the former Facebook spinners.
 * Ref: https://mui.com/material-ui/react-progress/#customization
 * @param props
 * @returns
 */
function FacebookCircularProgress(props: CircularProgressProps) {
  const size = 20;
  const thickness = 5;

  return (
    <Box sx={{ position: "relative", marginTop: "4px" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={size}
        thickness={thickness}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
          animationDuration: "700ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={size}
        thickness={thickness}
        {...props}
      />
    </Box>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function TargetIcon(props: { isLoading?: boolean }) {
  return props.isLoading ?? false ? (
    <FacebookCircularProgress />
  ) : (
    <SettingsIcon />
  );
}

/**
 * Check whether the queue count is greater than 0.
 *
 * The icon will be displayed with a badge if the queue count is greater than 0.
 *
 * The icon will switch to a loading spinner is connecting to the server and Azure SignalR server
 * @param props
 * @returns
 */

export function CountQueueBadgeWithIcon(props: CountQueueBadgeProps) {
  const [isLoading, setIsLoading] = useState(false);
  // const signalRConnection = useSignalR();

  const signalR = useSignalR();
  useEffect(() => {
    console.log("signalR state:", signalR.state);
    setIsLoading(signalR.isLoading);
  }, [signalR.state, signalR.isLoading]);

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
        console.log("refetching queueCount, because monthlyBudgetUpdated");
        queueCount.refetch();
      },
      transactionUpdated: async () => {
        console.log("refetching queueCount, because transactionUpdated");
        queueCount.refetch();
      },
    },
  });

  if (queueCount.error) {
    return <TargetIcon isLoading={isLoading} />;
  }

  if (queueCount.isLoading) {
    return <TargetIcon isLoading={isLoading} />;
  }

  if (
    parseQueueCount(queueCount.data?.data?.transactionMain) +
      parseQueueCount(queueCount.data?.data?.longMain) ===
    0
  ) {
    return <TargetIcon isLoading={isLoading} />;
  }

  return (
    <Badge
      badgeContent={
        parseQueueCount(queueCount.data?.data?.transactionMain) +
        parseQueueCount(queueCount.data?.data?.longMain)
      }
      color="warning"
    >
      <TargetIcon isLoading={isLoading} />
    </Badge>
  );
}
