import { queue } from "@/libs/azure-storage-queue";
import { NextResponse } from "next/server";

export async function POST() {
  await queue.sendMessage("Hello World");
  return NextResponse.json({
    message: "OK",
  });
}
