import { customError } from "@/global/errorHandler";
import { globalHandler } from "@/global/globalHandler";
import { poisonQueue, queue } from "@/bootstrap";
import { NextResponse } from "next/server";

export const GET = globalHandler(async () => {
  try {
    return NextResponse.json({
      success: true,
      data: {
        numberOfMessages: await queue.length(),
        poisonQueue: {
          numberOfMessages: await poisonQueue.length(),
        },
      },
    });
  } catch (error) {
    throw customError(
      error,
      "Failed to get the number of messages in the queue"
    );
  }
});
