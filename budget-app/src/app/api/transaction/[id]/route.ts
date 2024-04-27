import { transactionCacheTable } from "@/bootstrap";
import { TransactionCacheEntity } from "@/entites/transaction.entity";
import { globalHandler } from "@/global/globalHandler";
import dayjs from "dayjs";
import { NextResponse } from "next/server";
import { ODataExpression } from "ts-odata-client";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const GET = globalHandler(async (req, { params }) => {
  if (params.id === undefined) {
    throw new Error("id is required");
  }

  const filterQuery = ODataExpression.forV4<TransactionCacheEntity>()
    .filter((p) => p.id.$equals(params.id))
    .build();
  const rows: Partial<TransactionCacheEntity>[] = [];
  for await (const row of transactionCacheTable.list(filterQuery)) {
    rows.push({
      account: row.account,
      amount: row.amount,
      category: row.category,
      date: row.date,
      memo: row.memo,
      payee: row.payee,
      updatedAt: row.updatedAt,
    });
  }

  await delay(1000);

  if(rows.length > 1 ) {
    throw new Error("Multiple rows found");
  }

  return NextResponse.json({
    message: rows.length === 0 ? "No data found" : "Success",
    count: rows.length,
    data: rows,
  });
});
