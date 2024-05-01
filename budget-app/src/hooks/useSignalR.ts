import { signalRConnection } from "@/bootstrap-client";
import * as signalR from "@microsoft/signalr";
import { set } from "core-js/core/dict";
import { is } from "core-js/core/object";
import { useEffect, useState } from "react";

export type OnMessageFunction = (message: string) => void;
export type MessageName = string;

export interface UseSignalROptions {
  onMessages?: Record<MessageName, OnMessageFunction>;
}

export function useSignalR(options?: UseSignalROptions) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  const [state, setState] = useState<signalR.HubConnectionState>(
    signalR.HubConnectionState.Disconnected
  );

  /**
   * For preventing duplicate messages
   */
  const [cachedMessages, setCachedMessages] = useState<Set<string>>(new Set());

  const handleSignalRClient = async () => {
    setConnection(signalRConnection);
    try {
      if (signalRConnection.state === signalR.HubConnectionState.Disconnected) {
        await signalRConnection.start();
      }
      console.log("SignalR connection state:", signalRConnection.state);
      setState(signalRConnection.state);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSignalRClient();

    return () => {
      if (connection) connection.stop();
    };
  }, []);

  useEffect(() => {
    if (connection) {
      Object.entries(options?.onMessages ?? {}).forEach(
        ([messageName, onMessage]) => {
          if (cachedMessages.has(messageName)) {
            return;
          }
          setCachedMessages((prev) => new Set(prev.add(messageName)));
          connection.on(messageName, onMessage);
        }
      );
    }
  }, [connection, options]);

  useEffect(() => {
    if (connection) {
      connection.onreconnecting(() => {
        setState(signalR.HubConnectionState.Reconnecting);
      });

      connection.onreconnected(() => {
        setState(signalR.HubConnectionState.Connected);
      });

      connection.onclose(() => {
        setState(signalR.HubConnectionState.Disconnected);
      });
    }
  }, [connection]);

  return {
    connection,
    state,
  };
}
