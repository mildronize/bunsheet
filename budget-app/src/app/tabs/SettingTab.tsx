"use client";
import { InferRouteResponse } from "@/types";
import * as Transaction from "@/app/api/transaction/route";
import { Box, Button, Typography } from "@mui/material";
import { queryClient } from "../components/ReactQueryClientProvider";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import { toast, Toaster } from "sonner";
import { AlertActiveQueue } from "../components/AlertActiveQueue";
import axios from "axios";

export type TransactionGetResponse = InferRouteResponse<typeof Transaction.GET>;

export function SettingTab() {
  const resetCache = async () => {
    try {
      await axios.get("/api/cache/reset");
      /**
       * https://github.com/TanStack/query/discussions/3280
       * Clear all queries
       */
      queryClient.clear();
      toast.success("Clean Cache Successfully");
    } catch (error) {
      toast.error("Failed to reset cache");
      return;
    }
  };

  const reloadPage = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  return (
    <Box sx={{ padding: "15px" }}>
      <Toaster closeButton richColors duration={2000} position="top-center" />
      <div className="form-input">
        <Button
          variant="contained"
          fullWidth
          endIcon={<CleaningServicesRoundedIcon />}
          onClick={resetCache}
        >
          Reset Cache
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
