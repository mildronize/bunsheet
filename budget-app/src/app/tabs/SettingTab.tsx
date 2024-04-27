"use client";
import { InferRouteResponse } from "@/types";
import * as Transaction from "@/app/api/transaction/route";
import { Box, Button, Typography } from "@mui/material";
import { queryClient } from "../components/ReactQueryClientProvider";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import { toast, Toaster } from "sonner";
import { AlertActiveQueue } from "../components/AlertActiveQueue";

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

  const reloadPage = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  return (
    <Box sx={{ paddingLeft: "15px", paddingRight: "15px" }}>
      <Toaster closeButton richColors duration={2000} position="top-center" />
      <Typography variant="h6" gutterBottom sx={{ marginBottom: "40px" }}>
        Settings
      </Typography>
      <div className="form-input">
        <Button
          variant="contained"
          fullWidth
          endIcon={<CleaningServicesRoundedIcon />}
          onClick={clearCache}
        >
          Clear Cache
        </Button>
      </div>
      <div className="form-input">
        <Button
          variant="contained"
          sx={{ backgroundColor: "#dfdfdf", color: "#000000" }}
          fullWidth
          onClick={reloadPage}
        >
          Reload App
        </Button>
      </div>
      <Box sx={{ paddingTop: "25px" }}>
        <AlertActiveQueue />
      </Box>
    </Box>
  );
}
