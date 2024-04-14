import { customError } from "@/global/errorHandler";
import { globalHandler } from "@/global/globalHandler";
import { queue, sheetDoc, transactionCacheTable } from "@/bootstrap";
import { NextResponse } from "next/server";
import { z } from "zod";
import { updateExistingSheet } from "@/libs/google-sheet";
import { env } from "@/env";
import { ODataExpression } from "ts-odata-client";
import { TransactionCacheEntity } from "@/entites/transaction.entity";
import dayjs from "dayjs";

/**
 *  NOTE: Cannot be export in `route.ts` file 
 *  src/app/api/transaction/route.ts
    Type error: Route "src/app/api/transaction/route.ts" does not match the required types of a Next.js Route.
    "transactionPostSchema" is not a valid Route export field.
 */
const transactionPostSchema = z.object({
  type: z.enum(["add_transaction_queue"]),
  amount: z.number(),
  payee: z.string().nullable(),
  category: z.string().nullable(),
  account: z.string().nullable(),
  date: z.string().datetime().nullable(),
  memo: z.string().nullable(),
});
export type TrasactionPost = z.infer<typeof transactionPostSchema>;

export const POST = globalHandler(async (req) => {
  try {
    const body = transactionPostSchema.parse(await req.json());
    await queue.sendMessage(JSON.stringify(body));
    return NextResponse.json({
      message: "OK",
    });
  } catch (error) {
    throw customError(error, "Failed to send message to the queue");
  }
});

export const GET = globalHandler(async (req) => {
  /**
   * List last 7 days transactions
   */
  const rows: Partial<TransactionCacheEntity>[] = [];
  for await (const row of transactionCacheTable.list({
    filter: `date ge datetime'${dayjs().subtract(7, "day").toISOString()}'`,
  })) {
    rows.push({
      account: row.account,
      amount: row.amount,
      category: row.category,
      date: row.date,
      memo: row.memo,
      payee: row.payee,
    });
  }

  const sorted = rows.toSorted((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix()).slice(0, 20);
  return NextResponse.json({
    message: "OK",
    count: sorted.length,
    data: sorted,
  });
});
