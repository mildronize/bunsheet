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
import { useGlobalLoadingStore } from "@/store";
import { use, useEffect } from "react";

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
  console.log("data", data);
  const firstData = data ? data[0] : {};
  return {
    /**
     * If the amount is negative, it will be converted to positive
     * This will also convert before saving into google sheet as positive
     */
    amount: String((firstData.amount ?? 0) * -1) ?? "-0",
    payee: firstData.payee ?? "",
    category: firstData.category ?? "",
    account: firstData.account ?? "",
    date: dayjs(firstData.date) ?? null,
    memo: firstData.memo ?? "",
  };
}

export function TransactionDataContainer(props: TransactionDataContainerProps) {
  const setLoading = useGlobalLoadingStore((state) => state.setIsLoading);
  const transaction = useQuery<TransactionGetResponse>({
    queryKey: ["transactionSingleGet", { id: props.id }],
    queryFn: () =>
      axios
        .get("/api/transaction/" + props.id)
        .then((res) => res.data)
        .catch(catchResponseMessage),
  });

  useEffect(() => {
    if (transaction.isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [transaction.isPending, setLoading]);

  if (props.id === undefined) {
    return <AddTransactionTab action="add" />;
  }

  if (transaction.isPending) {
    return null;
  }

  if (transaction.isError) {
    return (
      <Alert severity="error">
        Cannot get transaction from id {props.id}: {transaction.error?.message}
      </Alert>
    );
  }

  if (transaction.isSuccess && transaction.data?.data) {
    return (
      <AddTransactionTab
        action={props.action}
        id={props.id}
        defaultValue={parseTransactionInputs(transaction.data?.data)}
      />
    );
  }
}
