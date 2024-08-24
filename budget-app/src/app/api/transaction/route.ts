import { customError } from "@/global/errorHandler";
import { globalHandler } from "@/global/globalHandler";
import { queue, sheetDoc, transactionCacheTable } from "@/bootstrap";
import { NextResponse } from "next/server";
import { z } from "zod";
import { TransactionCacheEntity } from "@/entites/transaction.entity";
import dayjs from "dayjs";
// https://github.com/vercel/next.js/issues/58242
import "core-js/features/array/to-sorted";
/**
 *  NOTE: Cannot be export in `route.ts` file 
 *  src/app/api/transaction/route.ts
    Type error: Route "src/app/api/transaction/route.ts" does not match the required types of a Next.js Route.
    "transactionPostSchema" is not a valid Route export field.
 */

const transactionPostSchema = z.object({
  type: z.enum(["add_transaction_queue", "edit_transaction_queue"]),
  id: z.string().optional().nullable(),
  amount: z.number().optional().nullable(),
  payee: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  account: z.string().optional().nullable(),
  date: z.string().datetime().optional().nullable(),
  memo: z.string().optional().nullable(),
});
export type TransactionPost = z.infer<typeof transactionPostSchema>;

export const POST = globalHandler(async (req) => {
  try {
    const body = transactionPostSchema.parse(await req.json());
    await queue.sendMessage(JSON.stringify(body));
    return NextResponse.json({
      message: "Success",
      count: 1,
      data: [
        {
          ...body,
          /**
           * Convert before returning to the client
           */
          amount: body.amount ? Number(body.amount) * -1 : 0,
        },
      ],
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
      id: row.id,
      account: row.account,
      amount: row.amount,
      category: row.category,
      date: row.date,
      memo: row.memo,
      payee: row.payee,
      updatedAt: row.updatedAt,
    });
  }

  const sorted = rows
    /**
     * Sorted by date then, updatedAt in descending order
     */
    .toSorted((a, b) => {
      // First, compare by date
      const dateComparison = dayjs(b.date).unix() - dayjs(a.date).unix();
      if (dateComparison !== 0) {
        return dateComparison;
      }

      // If dates are equal, compare by updatedAt
      return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
    })
    .slice(0, 30);

  return NextResponse.json({
    message: "OK",
    count: sorted.length,
    data: sorted,
  });
});
