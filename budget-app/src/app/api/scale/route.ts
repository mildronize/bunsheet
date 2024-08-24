import { octokit } from "@/bootstrap";
import { env } from "@/env";
import { scaleContainerApp } from "@/libs/github";
import { NextResponse } from "next/server";

/**
 * Scale Up Azure Container App (Set min_replicas to 1)
 * @param req 
 * @returns 
 */
export async function GET(req: Request) {
  // TODO: Hack for Next.js Build, prevent static optimization
  if (env.GITHUB_TOKEN === "") {
    return NextResponse.json({
      message: "GITHUB_TOKEN is not set in .env",
    }, {
      status: 500,
    });
  }
  await scaleContainerApp(octokit, {
    owner: "mildronize",
    repo: "bunsheet",
    ref: "main",
    inputs: {
      min_replicas: 1,
    },
  })
  return NextResponse.json({
    message: "Sent request to scale up Azure Container App, check the action logs in the repository.",
  });
}
