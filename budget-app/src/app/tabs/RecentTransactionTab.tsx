"use client";
import { catchResponseMessage } from "@/global/catchResponse";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TransactionList } from "../components/TransactionList";
import { InferRouteResponse } from "@/types";
import * as Transaction from "@/app/api/transaction/route";
import { Box, Chip, LinearProgress, Typography } from "@mui/material";
import { CountQueueChip } from "../components/CountQueueChip";

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
      {transactionList.isPending ? (
        <Box sx={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 100 }}>
          <LinearProgress />
        </Box>
      ) : null}
      <Typography variant="h6" gutterBottom sx={{ paddingLeft: '15px'}}>
        Recent Transactions <CountQueueChip />
      </Typography>
      <TransactionList data={transactionList.data?.data ?? []} />
    </div>
  );
}