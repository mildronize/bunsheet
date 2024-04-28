import type * as React from "react";
import { MobileLayoutNavigation } from "../tabs/components/MobileLayoutNavigation";
import { BudgetTab } from "../tabs/BudgetTab";
import dayjs from "dayjs";

export default function BudgetPage() {
  return (
    <div>
      <MobileLayoutNavigation currentRouterKey={1} title={dayjs().format('MMM YYYY')}>
        <BudgetTab
          items={[
            {
              name: "Want",
              budgetItems: [
                {
                  name: "Dining Out",
                  activity: 50,
                  assigned: 600,
                  available: 477,
                },
                {
                  name: "Shopping",
                  activity: 100,
                  assigned: 600,
                  available: -477,
                },
                {
                  name: "Entertainment",
                  activity: 300,
                  assigned: 600,
                  available: 0,
                },
                {
                  name: "Travel",
                  activity: 1000,
                  assigned: 600,
                  available: 477,
                },
                {
                  name: "Subscription",
                  activity: 250,
                  assigned: 600,
                  available: 477,
                },
              ],
            },
            {
              name: "Need",
              budgetItems: [
                {
                  name: "Rent",
                  activity: 400,
                  assigned: 600,
                  available: -1000,
                },
                {
                  name: "Utilities",
                  activity: 200,
                  assigned: 600,
                  available: 2000,
                },
                {
                  name: "Groceries",
                  activity: 135,
                  assigned: 600,
                  available: 0,
                },
              ],
            },
            {
              name: "Savings",
              budgetItems: [
                {
                  name: "Emergency Fund",
                  activity: -100,
                  assigned: 600,
                  available: 3000,
                },
                {
                  name: "Retirement",
                  activity: -120,
                  assigned: 600,
                  available: 40000,
                },
                {
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
