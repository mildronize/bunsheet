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
import { ListTableColumn, ListTableRow } from "./layouts";

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

  let progress = 0;
  if (items.available > 0) {
    // progress =
    //   items.assigned > items.available
    //     ? 1
    //     : (items.assigned / items.available) * 100;
    progress = ((items.activity + items.available) / items.available) * 100;
  }

  return (
    <>
      <ListItemButton onClick={props.onEditAssigned} {...longPress}>
        <ListContainer>
          <ListTableRow>
            <ListTableColumn ratio={60}>
              <ListItemText
                primary={items.name}
                primaryTypographyProps={{
                  sx: {
                    fontSize: "0.9rem",
                    fontFamily: theme.typography.fontFamily,
                  },
                }}
              />
            </ListTableColumn>

            <ListTableColumn
              sx={{
                textAlign: "center",
              }}
            >
              {props.isEditAssigned ? (
                <AutoSelectTextField
                  /**
                   * When unfocused, save the value
                   */
                  onBlur={props.onEditAssignedSave}
                  type="number"
                  defaultValue={items.assigned}
                />
              ) : (
                <> </>
              )}
            </ListTableColumn>

            <ListTableColumn
              sx={{
                textAlign: "right",
              }}
            >
              <AvailableChip available={items.available} />
            </ListTableColumn>
          </ListTableRow>
          <BudgetLinearProgress variant="determinate" value={progress} />
        </ListContainer>
      </ListItemButton>
      <Divider />
    </>
  );
}
