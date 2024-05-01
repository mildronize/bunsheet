import type * as React from "react";
import { MobileLayoutNavigation } from "../tabs/components/MobileLayoutNavigation";
import { RecentTransactionTab } from "../tabs/RecentTransactionTab";
import { CountQueueChip } from "../components/CountQueueChip";
import { Typography } from "@mui/material";

// function RecentTransactionTitle() {
//   return (
//     <Typography variant="h6" sx={{ fontSize: "0.9rem", fontWeight: "600" }}>
//       Recent Transactions <CountQueueChip />
//     </Typography>
//   );
// }

export default function RecentTransaction() {
  return (
    <div>
      <MobileLayoutNavigation currentRouterKey={3} title={"Recent Transaction"}>
        <RecentTransactionTab />
      </MobileLayoutNavigation>
    </div>
  );
}
