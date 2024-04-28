"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText, { ListItemTextProps } from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { alpha, styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { Box, Chip, Divider } from "@mui/material";
import numbro from "numbro";
import { useState } from "react";

export interface BudgetItem {
  name: string;
  assigned: number;
  activity: number;
  available: number;
}

export interface BudgetGroupItem {
  name: string;
  budgetItems: BudgetItem[];
}

export interface BudgetTabProps {
  items: BudgetGroupItem[];
}

export interface ListRowProps {}

export function ListRow(props: BudgetItem) {
  const [isClick, setIsClick] = useState(false);

  const theme = useTheme();
  let chipColor = "";
  if (props.available < 0) {
    chipColor = "#ffc6be";
  } else if (props.available > 0) {
    chipColor = "#ccf2a5";
  } else {
    chipColor = "#e3e3e3";
  }
  return (
    <ListItemButton onClick={() => setIsClick(!isClick)}>
      <span className="flex-container">
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
            flex: "flex: 1 1 50%; ",
          }}
        />
        {/* <ListItemText
            className="flex-item"
            primary={numbro(props.assigned).format("0,0")}
            primaryTypographyProps={{
              sx: {
                fontSize: "0.9rem",
              },
            }}
            sx={{
              textAlign: "right",
            }}
          /> */}
        {isClick ? (
          <input
            className="flex-item"
            type="text"
            defaultValue={props.assigned}
            style={{
              width: "50px",
              textAlign: "right",
              fontSize: "0.9rem",
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
          <Chip
            label={numbro(props.available).format("0,0")}
            // variant="filled"
            size="small"
            sx={{
              "&.MuiChip-root": {
                backgroundColor: chipColor,
                fontSize: "0.7rem",
              },
              "&.MuiChip-label": {
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      </span>
    </ListItemButton>
  );
}

export function BudgetTab(props: BudgetTabProps) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {props.items.map((item) => (
        <React.Fragment key={item.name}>
          <ListItemButton
            onClick={handleClick}
            sx={{
              bgcolor: "#f0f0f0",
              "&:hover": {
                bgcolor: "#e0e0e0", // Background color on hover
                //color: "white", // Optional: change text color on hover
              },
            }}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
            <ListItemText primary={item.name} />
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.budgetItems.map((budgetItem) => (
                <Box sx={{ pl: 5 }} key={budgetItem.name}>
                  <ListRow {...budgetItem} />
                </Box>
              ))}
            </List>
          </Collapse>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}
