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
  Box,
  Container,
  LinearProgress,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AddTransactionTab } from "../AddTransactionTab";
import { SwipeableDrawer } from "./SwipeableDrawer";
import { useGlobalLoadingStore } from "@/store";

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

export interface MobileLayoutNavigationProps {
  /**
   * Override the title of the BottomNavigation
   */
  title?: React.ReactNode;
  children?: React.ReactNode;
  currentRouterKey: RouterMapKey;
}
export function MobileLayoutNavigation(props: MobileLayoutNavigationProps) {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(props.currentRouterKey);
  const isLoading = useGlobalLoadingStore((state) => state.isLoading);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{ position: "fixed", top: 0, right: 0, left: 0, zIndex: 3000 }}
        >
          <LinearProgress />
        </Box>
      ) : null}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          zIndex: 900,
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          {typeof props.title === "string" || props.title === undefined ? (
            <Typography
              variant="h6"
              sx={{ fontSize: "0.9rem", fontWeight: "600" }}
            >
              {props.title ?? routerMap[currentTab].title}
            </Typography>
          ) : (
            props.title
          )}
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
          <AddTransactionTab
            action="add"
            onSaveSuccess={() => setIsDrawerOpen(false)}
          />
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
