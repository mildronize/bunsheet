import type * as React from "react";
import { MobileLayoutNavigation } from "../tabs/components/MobileLayoutNavigation";

export default function BudgetPage() {
  return (
    <div>
      <MobileLayoutNavigation currentRouterKey={1}>
        Budget
      </MobileLayoutNavigation>
    </div>
  );
}
