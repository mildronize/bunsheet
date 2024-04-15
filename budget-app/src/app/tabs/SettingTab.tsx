"use client";
import { InferRouteResponse } from "@/types";
import * as Transaction from "@/app/api/transaction/route";
import { Box, Button, Typography } from "@mui/material";
import { queryClient } from "../components/ReactQueryClientProvider";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import { toast, Toaster } from "sonner";
import { ShowTransactionQueue } from "../components/ShowTransactionQueue";

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
    <Box sx={{ paddingLeft: "15px", paddingRight: "15px" }}>
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
      <Box sx={{ paddingTop: "25px" }}>
        <ShowTransactionQueue />
      </Box>
    </Box>
  );
}
