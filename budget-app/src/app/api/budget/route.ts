import { BudgetGroupItem } from "@/app/budget/components/types";
import { monthlyBudgetTable } from "@/bootstrap";
import { globalHandler } from "@/global/globalHandler";
import { dateTimezone } from "@/libs/dayjs";
// https://github.com/vercel/next.js/issues/58242
import "core-js/features/array/to-sorted";
import { NextResponse } from "next/server";

function isExistBudgetGroup(
  budgetGroups: BudgetGroupItem[],
  categoryGroupID: string
): boolean {
  return budgetGroups.some((group) => group.id === categoryGroupID);
}

export const GET = globalHandler(async (req) => {
  /**
   * List last 7 days transactions
   */
  const budgetGroups: BudgetGroupItem[] = [];
  const partitionKey = dateTimezone().format("YYYY-MM");

  for await (const row of monthlyBudgetTable.list({
    filter: `PartitionKey eq '${partitionKey}'`,
  })) {
    if (isExistBudgetGroup(budgetGroups, row.categoryGroupID)) {
      const budgetGroup = budgetGroups.find(
        (group) => group.id === row.categoryGroupID
      );
      if (!budgetGroup) {
        continue;
      }
      const budgetItem = {
        id: row.id,
        name: row.title,
        assigned: row.assigned,
        activity: row.activity,
        available: row.available,
        order: row.order,
      };
      budgetGroup.budgetItems.push(budgetItem);
      budgetGroup.totalAssigned += row.assigned;
      budgetGroup.totalAvailable += row.available;
      if (row.available < 0) {
        budgetGroup.countOverspent++;
      }
    } else {
      const budgetGroup: BudgetGroupItem = {
        id: row.categoryGroupID,
        name: row.categoryGroup,
        totalAssigned: 0,
        totalAvailable: 0,
        countOverspent: 0,
        order: row.baseOrder,
        budgetItems: [],
      };
      budgetGroups.push(budgetGroup);
    }
  }

  const sortedBudgetGroups = budgetGroups
    /**
     * Sorted by baseOrder field
     */
    .toSorted((a, b) => {
      return a.order - b.order;
    });

  /**
   * Sorted by order field
   */
  for (const group of sortedBudgetGroups) {
    group.budgetItems = group.budgetItems.toSorted((a, b) => {
      return a.order - b.order;
    });
  }

  return NextResponse.json({
    message: "OK",
    count: sortedBudgetGroups.length,
    data: sortedBudgetGroups,
  });
});
