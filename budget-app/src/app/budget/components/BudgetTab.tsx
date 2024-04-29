"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Divider } from "@mui/material";
import { BudgetTabProps } from "./types";
import { ListRow } from "./ListRow";

export function BudgetTab(props: BudgetTabProps) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
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
                  <Box key={budgetItem.name}>
                    <ListRow {...budgetItem} />
                  </Box>
                ))}
              </List>
            </Collapse>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </>
  );
}
