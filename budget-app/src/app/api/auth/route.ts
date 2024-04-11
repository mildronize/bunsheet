import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "@/env";

export async function GET(req: NextRequest) {
  if (env.ENABLE_MICROSOFT_ENTRA_IDENTITY === false) {
    console.log("Microsoft Entra Identity is disabled");
    return NextResponse.json({
      message: "No Auth is enabled",
    });
  }
  console.log("Microsoft Entra Identity is enabled");
  console.log(
    "Redirecting to '/.auth/login/aad' for Login with Microsoft Entra Identity"
  );
  return NextResponse.redirect(new URL("/.auth/login/aad", req.url));
}
