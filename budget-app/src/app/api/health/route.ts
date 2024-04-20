import { NextResponse } from "next/server";

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function GET() {

  // if(Math.random() > 0.3) {
  //   await delay(2000);
  // }
  return NextResponse.json({
    health: "OK",
  });
}
