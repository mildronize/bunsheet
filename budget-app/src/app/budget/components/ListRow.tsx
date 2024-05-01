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
import numbro from "numbro";

const SpendingLinearProgress = styled(LinearProgress)(({ theme }) => ({
  marginTop: 5,
  borderRadius: 5,
  height: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.mode === "light" ? "#9ecd6f" : "#ccf2a5",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    background: `repeating-linear-gradient(
      45deg,
      ${alpha("#d3e4c5", 0.6)}, 
      ${alpha("#d3e4c5", 0.6)} 5px,
      ${alpha("#f0ffe4", 0.6)} 5px, 
      ${alpha("#f4ffeb", 0.6)} 10px, 
      ${alpha("#d3e4c5", 0.6)} 10px
    )`,
  },
}));

const BudgetLinearProgress = styled(LinearProgress)(({ theme }) => ({
  marginTop: 5,
  borderRadius: 5,
  height: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#9ecd6f" : "#ccf2a5",
  },
}));

function BudgetProgress({
  items,
  value,
}: {
  value: number;
  items: BudgetItem;
}) {
  const theme = useTheme();
  if (items.activity * -1 > 0 && items.activity * -1 <= items.available) {
    return (
      <Box>
        <SpendingLinearProgress variant="determinate" value={100 - value} />
        <Box
          sx={{
            fontSize: "0.85rem",
            color: theme.palette.text.secondary,
            paddingTop: "10px",
          }}
        >
          Spent {numbro(items.activity * -1).format("0,0")} of{" "}
          {numbro(items.available).format("0,0")}
        </Box>
      </Box>
    );
  } else if (
    Math.abs(items.activity * -1 - items.assigned) < 1 &&
    items.activity * -1 > 0
  ) {
    return (
      <Box>
        <SpendingLinearProgress variant="determinate" value={100} />
        <Box
          sx={{
            fontSize: "0.85rem",
            color: theme.palette.text.secondary,
            paddingTop: "10px",
          }}
        >
          Fully Spent
        </Box>
      </Box>
    );
  }
  return <BudgetLinearProgress variant="determinate" value={value} />;
}

const ListContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
}));

export interface ListRowProps {
  items: BudgetItem;
  isEditAssigned: boolean;
  isShowAssigned: boolean;
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
                textAlign: "right",
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
              ) : props.isShowAssigned ? (
                <Box
                  sx={{
                    marginTop: '3px',
                    fontFamily: theme.budget.amount.fontFamily,
                    fontSize: theme.budget.amount.fontSize,
                  }}
                >
                  {numbro(items.assigned).format("0,0")}
                </Box>
              ) : null}
            </ListTableColumn>

            <ListTableColumn
              sx={{
                textAlign: "right",
              }}
            >
              <AvailableChip available={items.available} />
            </ListTableColumn>
          </ListTableRow>
          <BudgetProgress value={progress} items={items} />
        </ListContainer>
      </ListItemButton>
      <Divider />
    </>
  );
}
