"use client";
import { catchResponseMessage } from "@/global/catchResponse";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TransactionList } from "./TransactionList";
import { InferRouteResponse } from "@/types";
import * as Transaction from "@/app/api/transaction/route";

export type TransactionGetResponse = InferRouteResponse<typeof Transaction.GET>;

export function TransactionListSection() {
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
      <h1>Transaction List Section</h1>
      <TransactionList data={transactionList.data?.data ?? []} />
    </div>
  );
}
