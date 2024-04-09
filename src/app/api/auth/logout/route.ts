import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "@/env";

export async function GET(req: NextRequest) {
  if (env.ENABLE_MICROSOFT_ENTRA_IDENTITY === false) {
    return NextResponse.json({
      message: "No Auth is enabled",
    });
  }
  console.log("Microsoft Entra Identity is enabled");
  console.log(
    "Redirecting to '/.auth/logout' for Login with Microsoft Entra Identity"
  );
  /**
   * https://learn.microsoft.com/en-us/azure/container-apps/authentication#sign-out-of-a-session
   */
  return NextResponse.redirect(new URL("/.auth/logout", req.url));
}
