import type * as React from "react";
import { MobileLayoutNavigation } from "../tabs/components/MobileLayoutNavigation";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <MobileLayoutNavigation currentRouterKey={1}>
      <Box
        sx={{
          padding: "15px",
        }}
      >
        Accounts
      </Box>
    </MobileLayoutNavigation>
  );
}
