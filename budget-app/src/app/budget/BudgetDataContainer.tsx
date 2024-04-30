"use client";
import { useQuery } from "@tanstack/react-query";
import { BudgetTab } from "./components/BudgetTab";
import { InferRouteResponse } from "@/types";
import * as Budget from "@/app/api/budget/route";
import axios from "axios";
import { catchResponseMessage } from "@/global/catchResponse";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";
import { Alert } from "@mui/material";

export type BudgetGetResponse = InferRouteResponse<typeof Budget.GET>;

export interface BudgetDataContainerProps {}

export function BudgetDataContainer(props: BudgetDataContainerProps) {
  const budgetGroup = useQuery<BudgetGetResponse>({
    queryKey: ["budgetGroupGet"],
    queryFn: () =>
      axios
        .get("/api/budget")
        .then((res) => res.data)
        .catch(catchResponseMessage),
  });

  useGlobalLoading(budgetGroup.isPending);

  if (budgetGroup.isError) {
    <Alert severity="error">Error: {budgetGroup.error?.message}</Alert>;
  }

  if(!budgetGroup.data?.data) {
    return null;
  }

  return <BudgetTab budgetGroup={budgetGroup.data?.data} />;
}
