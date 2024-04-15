import * as React from "react";
import { RootBottomNavigation } from "../tabs/RootBottomNavigation";

export default function Home() {
  return (
    <div>
      <RootBottomNavigation initialTab={1} />
    </div>
  );
}
