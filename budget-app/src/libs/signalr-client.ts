import * as signalR from "@microsoft/signalr";

export function initSignalRClient(apiBaseUrl: string) {
  console.log(`Connectioning to ${apiBaseUrl}`);
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(new URL("/api", apiBaseUrl).toString())
    .configureLogging(signalR.LogLevel.Information)
    .build();

  console.log(`connection state: ${connection.state}`);

  return connection;
}
