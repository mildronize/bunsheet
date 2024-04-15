"use client";

import { useEffect, useState } from "react";
import { BottomNavigation } from "./components/BottomNavigation";
import { LocalStorage } from "@/libs/local-storage";
import { Container } from "@mui/material";
import { RecentTransactionTab } from "./RecentTransactionTab";
import { AddTransactionTab } from "./AddTransactionTab";
import { SettingTab } from "./SettingTab";

export interface RootBottomNavigationProps {
  initialTab?: number;
}

export function RootBottomNavigation(props: RootBottomNavigationProps) {
  const initialTab = props.initialTab ?? 0;
  const [currentTab, setCurrentTab] = useState(initialTab);
  const tabStorage = new LocalStorage("currentTab", String(initialTab));

  useEffect(() => {
    setCurrentTab(
      props.initialTab ? props.initialTab : Number(props.initialTab) || 0
    );
    console.log(`Starting with tab index: ${tabStorage.get()}`);
  }, []);

  function handleBottomNavigation(value: number) {
    setCurrentTab(value);
    tabStorage.set(value + "");
  }

  function contentRender() {
    switch (currentTab) {
      case 0:
        return <RecentTransactionTab />;
      case 1:
        return <AddTransactionTab />;
      case 2:
        return <SettingTab />;
      default:
        return <>Page not found</>;
    }
  }

  return (
    <div>
      <BottomNavigation
        currentIndex={currentTab}
        onTap={handleBottomNavigation}
      >
        <Container maxWidth="sm" className="mb-160">
          {contentRender()}
          {/* <div style={{ height: "30vh" }}></div> */}
        </Container>
      </BottomNavigation>
    </div>
  );
}
