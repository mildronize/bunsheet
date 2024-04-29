"use client";
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { alpha, styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Divider,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import { useState } from "react";
import useLongPress from "@/hooks/useLongPress";
import { BudgetItem } from "./types";
import { AvailableChip } from "./AvailableChip";

const BudgetLinearProgress = styled(LinearProgress)(({ theme }) => ({
  marginTop: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#9ecd6f" : "#ccf2a5",
  },
}));

const ListContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

const ListRowContainer = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
}));

export interface ListRowProps {}

export function ListRow(props: BudgetItem) {
  const [isClick, setIsClick] = useState(false);

  const longPress = useLongPress(() => console.log("Long Press Happened"), 500);

  const theme = useTheme();

  return (
    <>
      <ListItemButton onClick={() => setIsClick(true)} {...longPress}>
        <ListContainer>
          <ListRowContainer>
            <ListItemText
              className="flex-item"
              primary={props.name}
              primaryTypographyProps={{
                sx: {
                  fontSize: "0.9rem",
                  fontFamily: theme.typography.fontFamily,
                },
              }}
              sx={{
                flex: "flex: 1 1 65%; ",
                minWidth: "200px",
              }}
            />

            {isClick ? (
              <input
                autoFocus
                className="flex-item"
                type="number"
                defaultValue={props.assigned}
                style={{
                  width: "50px",
                  textAlign: "right",
                  fontSize: "16px", // Use font 16px prevent zooming on mobile
                  fontFamily: theme.typography.fontFamily,
                  border: "none",
                  backgroundColor: alpha("#ffffff", 0.0),
                }}
              />
            ) : (
              <> </>
            )}
            <Box
              className="flex-item"
              sx={{
                textAlign: "right",
              }}
            >
              <AvailableChip available={props.available} />
            </Box>
          </ListRowContainer>
          <BudgetLinearProgress
            variant="determinate"
            value={
              props.available > 0
                ? props.assigned > props.available
                  ? 1
                  : (props.assigned / props.available) * 100
                : 0
            }
          />
        </ListContainer>
      </ListItemButton>
      <Divider />
    </>
  );
}
