"use client";

import { useEffect, useState } from "react";
import { BottomNavigation } from "./components/BottomNavigation";
import { LocalStorage } from "@/libs/local-storage";
import { Container } from "@mui/material";
import { RecentTransactionTab } from "./RecentTransactionTab";
import { AddTransactionTab } from "./AddTransactionTab";
import { SettingTab } from "./SettingTab";

export function RootBottomNavigation() {
  const [currentTab, setCurrentTab] = useState(0);
  const tabStorage = new LocalStorage("currentTab", "0");

  useEffect(() => {
    setCurrentTab(Number(tabStorage.get()) || 0);
    console.log(tabStorage.get());
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
