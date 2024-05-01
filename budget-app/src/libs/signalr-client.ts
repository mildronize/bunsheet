import { env } from "@/env";
import * as signalR from "@microsoft/signalr";

export async function initSignalRClient() {
  const apiBaseUrl = env.NEXT_PUBLIC_AZURE_FUNCTION_URL;
  console.log(`Connectioning to ${apiBaseUrl}`)
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(new URL("/api", apiBaseUrl).toString())
    .configureLogging(signalR.LogLevel.Information)
    .build();

  try {
    await connection.start();
  } catch (err) {
    console.log(err);
  }

  connection.on("newMessage", (message) => {
    console.log(`newMessage: ${message}`);
  });
}
