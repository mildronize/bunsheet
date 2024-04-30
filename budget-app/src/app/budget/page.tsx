import type * as React from "react";
import { MobileLayoutNavigation } from "../tabs/components/MobileLayoutNavigation";
import { BudgetTab } from "./components/BudgetTab";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";

export default function BudgetPage() {
  return (
    <div>
      <MobileLayoutNavigation
        currentRouterKey={1}
        title={dayjs().format("MMM YYYY")}
        disableOverflow
      >
        <BudgetTab
          budgetGroup={[
            {
              id: uuid(),
              name: "Want",
              budgetItems: [
                {
                  id: uuid(),
                  name: "Dining Out",
                  activity: 50,
                  assigned: 600,
                  available: 477,
                },
                {
                  id: uuid(),
                  name: "Shopping",
                  activity: 100,
                  assigned: 600,
                  available: -477,
                },
                {
                  id: uuid(),
                  name: "Entertainment",
                  activity: 300,
                  assigned: 600,
                  available: 0,
                },
                {
                  id: uuid(),
                  name: "Travel",
                  activity: 1000,
                  assigned: 600,
                  available: 477,
                },
                {
                  id: uuid(),
                  name: "Subscription",
                  activity: 250,
                  assigned: 600,
                  available: 477,
                },
              ],
            },
            {
              id: uuid(),
              name: "Need",
              budgetItems: [
                {
                  id: uuid(),
                  name: "Rent",
                  activity: 400,
                  assigned: 600,
                  available: -1000,
                },
                {
                  id: uuid(),
                  name: "Utilities",
                  activity: 200,
                  assigned: 600,
                  available: 2000,
                },
                {
                  id: uuid(),
                  name: "Groceries",
                  activity: 135,
                  assigned: 600,
                  available: 0,
                },
              ],
            },
            {
              id: uuid(),
              name: "Savings",
              budgetItems: [
                {
                  id: uuid(),
                  name: "Emergency Fund",
                  activity: -100,
                  assigned: 600,
                  available: 3000,
                },
                {
                  id: uuid(),
                  name: "Retirement",
                  activity: -120,
                  assigned: 600,
                  available: 40000,
                },
                {
                  id: uuid(),
                  name: "Investment",
                  activity: 300,
                  assigned: 400,
                  available: 2000,
                },
              ],
            },
          ]}
        />
      </MobileLayoutNavigation>
    </div>
  );
}
