import { useEffect, useState } from "react";
import { env } from "next-runtime-env";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import invariant from "tiny-invariant";
// import { useInterval } from "usehooks-ts";

export type OnMessageFunction = (message: string) => void;
export type MessageName = string;

export interface UseSignalROptions {
  onMessages?: Record<MessageName, OnMessageFunction>;
}

export const useSignalR = (options?: UseSignalROptions) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [state, setState] = useState<HubConnectionState>(
    HubConnectionState.Disconnected
  );
  /**
   * For preventing duplicate messages
   */
  const [cachedMessages, setCachedMessages] = useState<Map<string, Date>>(
    new Map()
  );

  useEffect(() => {
    const apiBaseUrl = env("NEXT_PUBLIC_AZURE_FUNCTION_URL");
    invariant(apiBaseUrl, "NEXT_PUBLIC_AZURE_FUNCTION_URL is not defined");

    const newConnection = new HubConnectionBuilder()
      .withUrl(new URL("/api", apiBaseUrl).toString())
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    setConnection(newConnection);
    setState(newConnection.state);

    const startConnection = async () => {
      try {
        await newConnection.start();
        console.log("Connection started!");
        setState(newConnection.state);
      } catch (err) {
        console.error("Connection failed: ", err);
        setState(newConnection.state);
      }
    };

    startConnection();

    // Clean up on dismount
    return () => {
      newConnection.stop().then(() => console.log("Connection stopped!"));
    };
  }, []);

  useEffect(() => {
    if (connection) {
      Object.entries(options?.onMessages ?? {}).forEach(
        ([messageName, onMessage]) => {
          if (cachedMessages.has(messageName)) {
            return console.log("Message already cached", cachedMessages )
          }
          setCachedMessages(
            (prev) => new Map(prev.set(messageName, new Date()))
          );
          connection.on(messageName, onMessage);
        }
      );
    }

  }, [connection]);

  // // Prevent duplicate messages
  // useInterval(() => {
  //   if (cachedMessages.size === 0) return;
  //   const now = new Date();
  //   const expiredMessages = Array.from(cachedMessages.entries()).filter(
  //     ([_, date]) => now.getTime() - date.getTime() > 500 // 500 ms
  //   ); // Get expired messages when the message is older than 500 ms
  //   expiredMessages.forEach(([messageName, _]) => {
  //     setCachedMessages((prev) => {
  //       const newMap = new Map(prev);
  //       newMap.delete(messageName);
  //       return newMap;
  //     });
  //   });
  //   // console.log(cachedMessages);
  //   console.log("Reset cached messages");
  // }, 1000);

  return {
    connection,
    state,
    isLoading: state !== HubConnectionState.Connected,
  };
};
