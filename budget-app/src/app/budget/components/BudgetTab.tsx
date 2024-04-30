"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, Divider, ListSubheader, useTheme } from "@mui/material";
import { BudgetGroupItem } from "./types";
import { ListRow } from "./ListRow";
import { StickyHeader } from "./StickerHeader";

type Id = string;
export type ListState = Record<
  Id,
  {
    isEditAssigned: boolean;
  }
>;
export type GroupState = Record<
  Id,
  {
    isExpanded: boolean;
  }
>;

export interface BudgetTabProps {
  budgetGroup: BudgetGroupItem[];
}

export function BudgetTab(props: BudgetTabProps) {
  const theme = useTheme();
  const [listState, setListState] = React.useState<ListState>(
    props.budgetGroup.reduce((acc, group) => {
      group.budgetItems.forEach((item) => {
        acc[item.id] = {
          isEditAssigned: false,
        };
      });
      return acc;
    }, {} as ListState)
  );

  const [groupState, setGroupState] = React.useState<GroupState>(
    props.budgetGroup.reduce((acc, group) => {
      acc[group.id] = {
        isExpanded: true,
      };
      return acc;
    }, {} as GroupState)
  );

  const handleClick = (id: string) => {
    setGroupState((prevState) => {
      const newState = { ...prevState };
      newState[id] = {
        isExpanded: !prevState[id].isExpanded,
      };
      return newState;
    });
  };

  const [isStickyHeaderVisible, setIsStickyHeaderVisible] =
    React.useState(true);

  const stickyHeaderHeight = 80;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        {isStickyHeaderVisible ? (
          <StickyHeader height={stickyHeaderHeight} />
        ) : null}
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          sx={{
            overflowY: "scroll",
            overflowX: "hidden",
            position: "relative",
            height: `calc(100svh - ${
              theme.global.appBar.height +
              theme.global.bottomNavigation.height +
              theme.global.bottomNavigation.paddingBottom +
              (isStickyHeaderVisible ? stickyHeaderHeight : 0)
            }px)`,
            paddingTop: 0,
          }}
        >
          {props.budgetGroup.map((item) => (
            <React.Fragment key={item.name}>
              <ListSubheader disableGutters sx={{}}>
                <ListItemButton
                  onClick={() => handleClick(item.id)}
                  sx={{
                    bgcolor: "#f0f0f0",
                    "&:hover": {
                      bgcolor: "#e0e0e0", // Background color on hover
                      //color: "white", // Optional: change text color on hover
                    },
                  }}
                >
                  {groupState[item.id].isExpanded ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListSubheader>
              <Collapse
                in={groupState[item.id].isExpanded}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.budgetItems.map((budgetItem) => (
                    <Box key={budgetItem.name}>
                      <ListRow
                        items={budgetItem}
                        isEditAssigned={listState[budgetItem.id].isEditAssigned}
                        onEditAssignedSave={
                          /**
                           * Clear the active state
                           */
                          () => {
                            setListState((prevState) => {
                              const newState = { ...prevState };
                              newState[budgetItem.id] = {
                                isEditAssigned: false,
                              };
                              return newState;
                            });
                            console.log("Save the value");
                          }
                        }
                        onEditAssigned={() =>
                          /**
                           * Clear all other edit states,
                           * then set the current item to edit mode
                           */
                          setListState((prevState) => {
                            const newState = { ...prevState };
                            Object.keys(newState).forEach((key) => {
                              newState[key] = {
                                isEditAssigned: false,
                              };
                            });
                            newState[budgetItem.id] = {
                              isEditAssigned: true,
                            };
                            return newState;
                          })
                        }
                      />
                    </Box>
                  ))}
                </List>
              </Collapse>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </>
  );
}
