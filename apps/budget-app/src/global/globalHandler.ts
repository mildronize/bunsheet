import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";
import { BaseResponse } from "./response";

export type ApiRoute<TResponse> = (
  req: Request,
  others: {
    params: Record<string, string>;
  }
) => NextResponse<TResponse> | Promise<NextResponse<TResponse>>;
/**
 * Global error handler for API routes.
 * Ref: https://github.com/vercel/next.js/discussions/49984
 */
export function globalHandler<TResponse extends BaseResponse>(
  route: ApiRoute<TResponse>
): ApiRoute<TResponse> {
  return async (req, params) => {
    try {
      return await route(req, params);
    } catch (err) {
      let statusCode = 500;
      let message = "server error";

      if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
      } else if (err instanceof Error) {
        message = err.message;
      }

      const traceStack =
        err instanceof Error && process.env.NODE_ENV === "development"
          ? err.stack
          : undefined;

      console.error('Error:', err);

      return NextResponse.json(
        {
          message: message,
          success: false,
          traceStack,
        } satisfies BaseResponse,
        { status: statusCode }
      ) as NextResponse<TResponse>;
    }
  };
}
