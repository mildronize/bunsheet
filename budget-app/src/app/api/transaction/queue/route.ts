import { customError } from "@/global/errorHandler";
import { globalHandler } from "@/global/globalHandler";
import { queue } from "@/libs/azure-storage-queue";
import { NextResponse } from "next/server";

export const GET = globalHandler(async () => {
  try {
    const numberOfMessages = await queue.length();
    return NextResponse.json({
      success: true,
      data: {
        numberOfMessages,
      },
    });
  } catch (error) {
    throw customError(
      error,
      "Failed to get the number of messages in the queue"
    );
  }
});
