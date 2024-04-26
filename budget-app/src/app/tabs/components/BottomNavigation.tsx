"use client";
import type * as React from "react";
import { useRouter } from "next/navigation";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  AppBar,
  Container,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AddTransactionTab } from "../AddTransactionTab";
import { SwipeableDrawer } from "./SwipeableDrawer";

const routerMap = {
  0: {
    path: "/",
    title: "Recent Transactions",
    // component: <RecentTransactionTab />,
  },
  1: {
    path: "/transaction/add",
    title: "Add Transaction",
    // component: <AddTransactionTab />,
  },
  2: {
    title: "Settings",
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
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(props.currentRouterKey);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "600" }}>
            {routerMap[currentTab].title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="sm"
        sx={{
          // Margin due to the fixed AppBar
          marginTop: "80px",
          paddingLeft: "0px",
          paddingRight: "0px",
        }}
        className="mb-200"
      >
        {props.children}
        <SwipeableDrawer
          title="Add Transaction"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onOpen={() => setIsDrawerOpen(true)}
        >
          <AddTransactionTab action="add" />
        </SwipeableDrawer>
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
              if (newValue === 1) {
                setIsDrawerOpen(true);
              } else {
                setCurrentTab(newValue);
                router.push(routerMap[newValue].path);
              }
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
