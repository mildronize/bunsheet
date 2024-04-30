import type * as React from "react";
import { MobileLayoutNavigation } from "../tabs/components/MobileLayoutNavigation";
import { BudgetTab } from "./components/BudgetTab";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import { BudgetDataContainer } from "./BudgetDataContainer";

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
