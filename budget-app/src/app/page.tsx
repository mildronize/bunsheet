import type * as React from "react";
import { BottomNavigation } from "./tabs/components/BottomNavigation";
import { RecentTransactionTab } from "./tabs/RecentTransactionTab";

export default function Home() {
  return (
    <div>
      <BottomNavigation currentRouterKey={0} >
        <RecentTransactionTab />
      </BottomNavigation>
    </div>
  );
}
