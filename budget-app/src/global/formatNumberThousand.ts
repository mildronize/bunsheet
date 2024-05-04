import numbro from "numbro";

export type NumbroFormatOption = Parameters<ReturnType<typeof numbro>["format"]>[0];

/**
 * Format number to thousand using numbro
 */
export function formatNumberThousand(num: number, formatOptions?: NumbroFormatOption) {
  return numbro(num).format(formatOptions ?? "0,0")
}