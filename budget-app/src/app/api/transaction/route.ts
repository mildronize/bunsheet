import { customError } from "@/global/errorHandler";
import { globalHandler } from "@/global/globalHandler";
import { queue, sheetDoc } from "@/bootstrap";
import { NextResponse } from "next/server";
import { z } from "zod";
import { updateExistingSheet } from "@/libs/google-sheet";
import { env } from "@/env";

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
  const result = await updateExistingSheet(sheetDoc, env.GSHEET_SHEET_TRANSACTION_SHEET_ID);
  return NextResponse.json({
    message: "OK",
    result,
  });
});
