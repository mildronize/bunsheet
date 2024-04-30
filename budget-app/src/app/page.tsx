import type * as React from "react";
import { MobileLayoutNavigation } from "./tabs/components/MobileLayoutNavigation";
import dayjs from "dayjs";
import { BudgetDataContainer } from "./budget/BudgetDataContainer";

export default function BudgetPage() {
  return (
    <div>
      <MobileLayoutNavigation
        currentRouterKey={0}
        title={dayjs().format("MMM YYYY")}
        disableOverflow
      >
        <BudgetDataContainer />
      </MobileLayoutNavigation>
    </div>
  );
}
