import { globalHandler } from "@/global/globalHandler";
import { NextResponse } from "next/server";
import { getSelectFromAzureTableByType } from "../helpers";

export const GET = globalHandler(async () => {
  return NextResponse.json({
    message: "OK",
    data: await getSelectFromAzureTableByType("account"),
  });
});
