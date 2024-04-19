import { AzureTableEntityBase } from "../libs/azure-table";

export interface SelectEntity extends AzureTableEntityBase {
  type: "category" | "account";
  id: string;
  label: string;
  order: number;
}
