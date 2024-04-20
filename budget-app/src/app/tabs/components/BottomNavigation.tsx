"use client";
import type * as React from "react";
import { useRouter } from "next/navigation";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { Container, Paper } from "@mui/material";
import { useState } from "react";
import { RecentTransactionTab } from "../RecentTransactionTab";
import { AddTransactionTab } from "../AddTransactionTab";
import { SettingTab } from "../SettingTab";
import { useSafeRouter } from "@/hooks/use-safe-router";

const routerMap = {
  0: {
    path: "/",
    // component: <RecentTransactionTab />,
  },
  1: {
    path: "/transaction/add",
    // component: <AddTransactionTab />,
  },
  2: {
    path: "/settings",
    // component: <SettingTab />,
  },
};

export type RouterMapKey = keyof typeof routerMap;

export interface BottomNavigationProps {
  children?: React.ReactNode;
  currentRouterKey: RouterMapKey;
}
export function BottomNavigation(props: BottomNavigationProps) {
  const router = useSafeRouter();
  const [currentTab, setCurrentTab] = useState(props.currentRouterKey);

  return (
    <>
      <Container maxWidth="sm" className="mb-200">
        {/* {routerMap[props.currentRouterKey].component} */}
        {props.children}
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 80 }}
          elevation={3}
        >
          <MuiBottomNavigation
            showLabels
            /**
             * Fix Height for PWA on iOS
             */
            sx={{ height: 80, paddingBottom: "20px" }}
            value={currentTab}
            onChange={(event, newValue: RouterMapKey) => {
              setCurrentTab(newValue);
              router.push(routerMap[newValue].path);
            }}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction
              label="Transaction"
              icon={<AddCircleRoundedIcon />}
            />
            <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
          </MuiBottomNavigation>
        </Paper>
      </Container>
    </>
  );
}
