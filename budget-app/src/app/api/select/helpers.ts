import { selectTable } from "@/bootstrap";
import { SelectEntity } from "@/entites/select.entity";
import { ODataExpression } from "ts-odata-client";

export async function getSelectFromAzureTableByType(type: string) {
  const filterQuery = ODataExpression.forV4<SelectEntity>()
    .filter((p) => p.type.$equals(type))
    .build();
  const tableResult = selectTable.list({
    filter: filterQuery.filter,
  });
  const data = [];
  for await (const entity of tableResult) {
    data.push({
      id: entity.id,
      label: entity.label,
      order: entity.order,
    });
  }
  return data.sort((a, b) => a.order - b.order);
}
