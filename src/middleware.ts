import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "./env";
import { headers } from "next/headers";

export function middleware(request: NextRequest) {
  console.debug("Intercept Middleware on path: ", request.url);
  if (env.ENABLE_MICROSOFT_ENTRA_IDENTITY === false) {
    console.log("Microsoft Entra Identity is disabled");
    return NextResponse.next();
  }
  if (env.ALLOW_WHITELIST_PRINCIPAL_NAMES.includes("*")) {
    console.log("All Principal Names are allowed to access");
    return NextResponse.next();
  }

  const headersList = headers();
  const principalName = headersList.get("X-MS-CLIENT-PRINCIPAL-NAME");
  if (
    principalName &&
    env.ALLOW_WHITELIST_PRINCIPAL_NAMES.includes(principalName)
  ) {
    console.log(`Principal Name: '${principalName}' is allowed to access`);
    return NextResponse.next();
  }

  console.log(`Principal Name: '${principalName}' is not allowed to access`);
  return NextResponse.json(
    {
      message: "Resource is not accessible for the Principal Name",
    },
    {
      status: 403,
    }
  );
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!public|_next|api/auth|api/auth/logout).*)", // match all paths not starting with 'public' or 'auth' or '_next' or 'api/auth'
  ],
};
