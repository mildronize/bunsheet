import { NextResponse } from "next/server";
import { headers } from 'next/headers'

export async function GET() {
  const headersList = headers()
  const principalName = headersList.get('X-MS-CLIENT-PRINCIPAL-NAME')
  return NextResponse.json({
    principalName,
    health: "OK",
  });
}
