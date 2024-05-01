import { env } from "@/env";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  if (!env.RESET_CACHE_URL) {
    return NextResponse.json({
      message: "Cache Reset URL is not set",
    });
  }
  const response = await axios.get(env.RESET_CACHE_URL);
  return NextResponse.json(response.data);
}
