export interface BudgetItem {
    name: string;
    assigned: number;
    activity: number;
    available: number;
  }
  
  export interface BudgetGroupItem {
    name: string;
    budgetItems: BudgetItem[];
  }
  
  export interface BudgetTabProps {
    items: BudgetGroupItem[];
  }