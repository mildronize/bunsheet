"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { Paper } from "@mui/material";

export interface BottomNavigationProps {
  children: React.ReactNode;
  currentIndex: number;
  onTap: (arg: any) => void;
}
export function BottomNavigation(props: BottomNavigationProps) {
  return (
    <>
      {props.children}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 80 }}
        elevation={3}
      >
        <MuiBottomNavigation
          showLabels
          value={props.currentIndex}
          onChange={(event, newValue) => {
            props.onTap(newValue);
          }}
          // value={value}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction
            label="Transaction"
            icon={<AddCircleRoundedIcon />}
          />
          <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
        </MuiBottomNavigation>
      </Paper>
    </>
  );
}
