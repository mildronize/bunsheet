"use client";
import { InferRouteResponse } from "@/types";
import * as Transaction from "@/app/api/transaction/route";
import { Button, Typography } from "@mui/material";
import { queryClient } from "../components/ReactQueryClientProvider";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import { toast, Toaster } from "sonner";

export type TransactionGetResponse = InferRouteResponse<typeof Transaction.GET>;

export function SettingTab() {
  const clearCache = () => {
    /**
     * https://github.com/TanStack/query/discussions/3280
     * Clear all queries
     */
    queryClient.clear();
    toast.success("Clean Cache Successfully");
  };

  return (
    <div>
      <Toaster closeButton richColors duration={2000} position="top-center" />
      <Typography variant="h6" gutterBottom sx={{ marginBottom: "40px" }}>
        Settings
      </Typography>
      <Button
        variant="contained"
        size="large"
        fullWidth
        endIcon={<CleaningServicesRoundedIcon />}
        onClick={clearCache}
      >
        Clear Cache
      </Button>
    </div>
  );
}
