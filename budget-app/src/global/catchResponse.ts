import axios from "axios";
import { BaseResponse } from "./response";

export function catchResponseMessage(error: unknown) {
  if (axios.isAxiosError(error) && error.response) {
    const data = error.response.data as BaseResponse;
    throw new Error(data.message);
  }
  throw error;
}
