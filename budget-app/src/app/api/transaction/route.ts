import { customError } from "@/global/errorHandler";
import { globalHandler } from "@/global/globalHandler";
import { queue } from "@/libs/azure-storage-queue";
import { NextResponse } from "next/server";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const POST = globalHandler(async () => {
  try {
    await queue.sendMessage('Hello from Next.js!');
    return NextResponse.json({
      message: "OK",
    });
  } catch (error) {
    throw customError(
      error,
      "Failed to send message to the queue"
    );
  }
});
