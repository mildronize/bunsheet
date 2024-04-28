"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Chip, Divider } from "@mui/material";
import numbro from "numbro";

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
  return (
    <span className="flex-container">
      <ListItemText
        className="flex-item"
        primary={props.name}
        sx={{
          flex: "flex: 1 1 50%; ",
        }}
      />
      <ListItemText
        className="flex-item"
        primary={numbro(props.assigned).format("0,0")}
        sx={{
          textAlign: "right",
        }}
      />
      <Box
        className="flex-item"
        sx={{
          textAlign: "right",
        }}
      >
        <Chip label={numbro(props.available).format("0,0")} color="success" />{" "}
      </Box>
    </span>
  );
}

export function BudgetTab(props: BudgetTabProps) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  // return <></>;

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
                <ListItemButton sx={{ pl: 5 }} key={budgetItem.name}>
                  <ListRow {...budgetItem} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}
