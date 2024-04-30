import * as React from "react";
import { MobileLayoutNavigation } from "../tabs/components/MobileLayoutNavigation";
import { SettingTab } from "../tabs/SettingTab";

export default function Home() {
  return (
    <MobileLayoutNavigation currentRouterKey={4}>
      <SettingTab />
    </MobileLayoutNavigation>
  );
}
