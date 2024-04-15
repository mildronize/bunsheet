"use client";
import {
  AddTransactionTab,
  TransactionInputs,
} from "@/app/tabs/AddTransactionTab";
import { InferRouteResponse } from "@/types";
import * as TransactionId from "@/app/api/transaction/[id]/route";
import axios from "axios";
import { catchResponseMessage } from "@/global/catchResponse";
import { useQuery } from "@tanstack/react-query";
import { Alert, Box, LinearProgress } from "@mui/material";
import dayjs from "dayjs";

export type TransactionGetResponse = InferRouteResponse<
  typeof TransactionId.GET
>;
export interface TransactionDataContainerProps {
  action: string;
  id: string;
}

function parseTransactionInputs(
  data: TransactionGetResponse["data"] | undefined
): TransactionInputs {
  const firstData = data ? data[0] : {};
  return {
    /**
     * If the amount is negative, it will be converted to positive
     * This will also convert before saving into google sheet as positive
     */
    amount: String((firstData.amount ?? 0) * -1 ) ?? "-0",
    payee: firstData.payee ?? "",
    category: firstData.category ?? "",
    account: firstData.account ?? "",
    date: dayjs(firstData.date) ?? null,
    memo: firstData.memo ?? "",
  };
}

export function TransactionDataContainer(props: TransactionDataContainerProps) {
  const transaction = useQuery<TransactionGetResponse>({
    queryKey: ["transactionSingleGet-" + props.id],
    queryFn: () =>
      axios
        .get("/api/transaction/" + props.id)
        .then((res) => res.data)
        .catch(catchResponseMessage),
  });

  if (props.id === undefined) {
    return <AddTransactionTab action="add" />;
  }

  if (transaction.isPending) {
    return (
      <Box sx={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 100 }}>
        <LinearProgress />
      </Box>
    );
  }

  if (
    transaction.data?.data === undefined ||
    transaction.data?.data.length === 0
  ) {
    <Alert severity="error">
      Cannot get transaction from id {props.id}: {transaction.error?.message}
    </Alert>;
  }

  return (
    <AddTransactionTab
      action={props.action}
      id={props.id}
      defaultValue={parseTransactionInputs(transaction.data?.data)}
    />
  );
}
