export interface BudgetItem {
  id: string;
  name: string;
  assigned: number;
  activity: number;
  available: number;
}

export interface BudgetGroupItem {
  id: string;
  name: string;
  totalAssigned: number,
  totalAvailable: number,
  budgetItems: BudgetItem[];
}