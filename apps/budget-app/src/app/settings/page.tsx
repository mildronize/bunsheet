import * as React from "react";
import { BottomNavigation } from "../tabs/components/BottomNavigation";
import { SettingTab } from "../tabs/SettingTab";

export default function Home() {
  return (
    <div>
      <BottomNavigation currentRouterKey={2} >
        <SettingTab />
      </BottomNavigation>
    </div>
  );
}
