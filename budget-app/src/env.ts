import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  /**
   * Enable Microsoft Entra Identity
   */
  ENABLE_MICROSOFT_ENTRA_IDENTITY: z.preprocess((value: unknown) => {
    if (value === "true") {
      return true;
    } else {
      return false;
    }
  }, z.boolean()),
  /**
   * Allowlist of emails that can access the application
   * @default "*" means all emails are allowed
   *
   * @example
   * ALLOW_WHITELIST_PRINCIPAL_NAMES="aaa@gmail.com,bbb@gmail.com"
   *
   * @note
   * Works only if ENABLE_MICROSOFT_ENTRA_IDENTITY is true
   */
  ALLOW_WHITELIST_PRINCIPAL_NAMES: z.preprocess((value: unknown) => {
    if (value === undefined || value === "") {
      return ["*"];
    } else if (typeof value === "string") {
      return value.split(",");
    }
    throw new Error(
      "Invalid ALLOW_WHITELIST_PRINCIPAL_NAMES, example: 'aaa@gmail.com,bbb@gmail.com'"
    );
  }, z.array(z.string())),

  /**
   * Azure Storage Connection String
   */
  AZURE_STORAGE_CONNECTION_STRING: z.string(),

  /**
   * Azure Storage Queue Name
   */
  AZURE_STORAGE_QUEUE_NAME: z.string(),
});

function parseZodPrettyError(env: Record<string, unknown>) {
  try {
    const data = envSchema.parse(env);
    console.log("Environment Variables: ", data);
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
