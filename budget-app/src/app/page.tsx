import type * as React from "react";
import { MobileLayoutNavigation } from "./tabs/components/MobileLayoutNavigation";
import { RecentTransactionTab } from "./tabs/RecentTransactionTab";
import { CountQueueChip } from "./components/CountQueueChip";
import { Typography } from "@mui/material";

export function RecentTransactionTitle() {
  return (
    <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "600" }}>
      Recent Transactions <CountQueueChip />
    </Typography>
  );
}

export default function Home() {
  return (
    <div>
      <MobileLayoutNavigation
        currentRouterKey={0}
        title={<RecentTransactionTitle />}
      >
        <RecentTransactionTab />
      </MobileLayoutNavigation>
    </div>
  );
}
