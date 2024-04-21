"use client";
import { FullPageLoading } from "./FullPageLoading";

export function GlobalStateProvider(props: { children: React.ReactNode }) {
  return (
    <>
      <FullPageLoading />
      {props.children}
    </>
  );
}
