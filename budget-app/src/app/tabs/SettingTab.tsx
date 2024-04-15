"use client";
import { catchResponseMessage } from "@/global/catchResponse";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TransactionList } from "../components/TransactionList";
import { InferRouteResponse } from "@/types";
import * as Transaction from "@/app/api/transaction/route";
import { Typography } from "@mui/material";

export type TransactionGetResponse = InferRouteResponse<typeof Transaction.GET>;

export function SettingTab() {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Settings
      </Typography>
    </div>
  );
}
