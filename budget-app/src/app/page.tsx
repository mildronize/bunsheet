import type * as React from "react";
import { MobileLayoutNavigation } from "./tabs/components/MobileLayoutNavigation";

export default function Home() {
  return (
    <div>
      <MobileLayoutNavigation currentRouterKey={0}>
        My Overview
      </MobileLayoutNavigation>
    </div>
  );
}
