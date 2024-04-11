export interface BaseResponse<T = unknown> {
  message?: string;
  /**
   * @default true
   */
  success?: boolean;
  data?: T;
  traceStack?: string;
}
