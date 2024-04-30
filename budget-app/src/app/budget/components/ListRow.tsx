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
import useLongPress from "@/hooks/useLongPress";
import { BudgetItem } from "./types";
import { AvailableChip } from "./AvailableChip";
import { AutoSelectTextField } from "./AutoSelectNumberTextField";

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

export interface ListRowProps {
  items: BudgetItem;
  isEditAssigned: boolean;
  onEditAssigned: () => void;
  onEditAssignedSave: () => void;
}

export function ListRow(props: ListRowProps) {
  const { items } = props;

  const longPress = useLongPress(() => console.log("Long Press Happened"), 500);

  const theme = useTheme();

  return (
    <>
      <ListItemButton onClick={props.onEditAssigned} {...longPress}>
        <ListContainer>
          <ListRowContainer>
            <ListItemText
              className="flex-item"
              primary={items.name}
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

            {props.isEditAssigned ? (
              <AutoSelectTextField
                /**
                 * When unfocused, save the value
                 */
                onBlur={props.onEditAssignedSave}
                className="flex-item"
                type="number"
                defaultValue={items.assigned}
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
              <AvailableChip available={items.available} />
            </Box>
          </ListRowContainer>
          <BudgetLinearProgress
            variant="determinate"
            value={
              items.available > 0
                ? items.assigned > items.available
                  ? 1
                  : (items.assigned / items.available) * 100
                : 0
            }
          />
        </ListContainer>
      </ListItemButton>
      <Divider />
    </>
  );
}
