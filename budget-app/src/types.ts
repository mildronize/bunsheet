import type { NextResponse } from "next/server";
import { ApiRoute } from "./global/globalHandler";

/**
 * Infer the response type of a route handler.
 */
export type InferRouteResponse<T extends (...args: any[]) => any> =
  ReturnType<T> extends Promise<NextResponse<infer T>>
    ? T
    : T extends ApiRoute<infer T>
    ? T
    : never;
