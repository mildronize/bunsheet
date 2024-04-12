import { QueueServiceClient } from "@azure/storage-queue";
import { env } from "./env";
import { AzureStorageQueue } from "./libs/azure-storage-queue";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

/**
 * Azure Storage Queue Client
 */

const queueServiceClient = QueueServiceClient.fromConnectionString(
  env.AZURE_STORAGE_CONNECTION_STRING
);

export const queue = new AzureStorageQueue(
  queueServiceClient,
  env.AZURE_STORAGE_QUEUE_NAME
);

/**
 * Google Sheet Service
 */

const serviceAccountAuth = new JWT({
  email: env.GSHEET_CLIENT_EMAIL,
  key: env.GSHEET_PRIVATE_KEY,
  /**
   * Authentication Scope, read more: https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication?id=auth-scopes
   */
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
  ],
});

export const sheetDoc = new GoogleSpreadsheet(
  env.GSHEET_SPREADSHEET_ID,
  serviceAccountAuth
);

// container
//   .bind<GoogleSpreadsheet>(Tokens.GoogleSpreadsheet)
//     .toConstantValue(new GoogleSpreadsheet(env.GSHEET_ID, jwt));
//   container.bind(GoogleSheetService).toSelf().inSingletonScope();
