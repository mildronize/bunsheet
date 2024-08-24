import { octokit } from "@/bootstrap";
import { scaleContainerApp } from "@/libs/github";
import { NextResponse } from "next/server";

/**
 * Scale Up Azure Container App (Set min_replicas to 1)
 * @param req 
 * @returns 
 */
export async function GET(req: Request) {
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
