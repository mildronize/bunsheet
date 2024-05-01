import { env } from "./env";
import { initSignalRClient } from "./libs/signalr-client";

/**
 * SignalR Connection
 *
 * Make sure singletons are used
 */

export const signalRConnection = initSignalRClient(
  env.NEXT_PUBLIC_AZURE_FUNCTION_URL
);
