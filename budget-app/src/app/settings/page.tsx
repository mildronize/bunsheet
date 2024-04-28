import * as React from "react";
import { MobileLayoutNavigation } from "../tabs/components/MobileLayoutNavigation";
import { SettingTab } from "../tabs/SettingTab";

export default function Home() {
  return (
    <div>
      <MobileLayoutNavigation currentRouterKey={4} >
        <SettingTab />
      </MobileLayoutNavigation>
    </div>
  );
}
