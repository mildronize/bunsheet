import type { NextResponse } from "next/server";
import { ApiRoute } from "./global/globalHandler";
import { Controller, Control, Path, FieldValues, RefCallBack } from "react-hook-form";

/**
 * Infer the response type of a route handler.
 */
export type InferRouteResponse<T extends (...args: any[]) => any> =
  ReturnType<T> extends Promise<NextResponse<infer T>>
    ? T
    : T extends ApiRoute<infer T>
    ? T
    : never;


export interface ReactHookFormControl<TField extends FieldValues> {
  name: Path<TField>;
  control: Control<TField>;
  // onChange: (...event: any[]) => void;
  // value: string;
  // ref: RefCallBack;
}
