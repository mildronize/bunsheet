import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import 'dotenv/config';

export const envSchema = z.object({
  /**
   *  Google Sheet Private Key
   *
   *  NOTE:
   *  we need to replace the escaped newline characters
   *  https://stackoverflow.com/questions/50299329/node-js-firebase-service-account-private-key-wont-parse
   */
  GSHEET_PRIVATE_KEY: z.preprocess((value) => {
    if (value === undefined) return "";
    if (typeof value !== "string") {
      throw new Error("GSHEET_PRIVATE_KEY must be a string");
    }
    return value.replace(/\\n/g, "\n");
  }, z.string()),
  /**
   * Google Sheet Client Email
   */
  GSHEET_CLIENT_EMAIL: z.string().default(""),
  /**
   * Google Sheet ID
   */
  GSHEET_SPREADSHEET_ID: z.string().default(""),
  /**
   * Google Sheet, Transaction Sheet ID
   */
  GSHEET_SHEET_TRANSACTION_SHEET_ID: z.preprocess((value) => {
    if (value === undefined) return -1;
    if (typeof value !== "string") {
      throw new Error("GSHEET_SHEET_TRANSACTION_SHEET_ID must be a string");
    }
    return parseInt(value, 10);
  }, z.number()),

  /**
   * Timezone
   */
  TIMEZONE: z.string().default("Asia/Bangkok"),
});

function printSecretFields(
  data: Record<string, unknown>,
  secretFields: string[]
) {
  const parsedEnv: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    parsedEnv[key] = secretFields.includes(key as any)
      ? `${String(value).substring(0, 10)}${value === "" ? "" : "..."}`
      : value;
  }
  return parsedEnv;
}

function parseZodPrettyError(env: Record<string, unknown>) {
  try {
    const data = envSchema.parse(env);
    const parsedEnv = printSecretFields(data, [
      "GSHEET_PRIVATE_KEY",
    ] as (keyof typeof data)[]);
    console.debug("Environment Variables: ", parsedEnv);
    return data;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        "Invalid environment variables: " + fromZodError(error).message
      );
    }
    throw error;
  }
}

export const env = parseZodPrettyError(process.env);
