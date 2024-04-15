import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { ListItemButton } from "@mui/material";
import numbro from 'numbro';

/**
 * Hotfix for uuid gen
 * @param length
 * @returns
 */
function generateRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export interface TransactionListProps {
  data: {
    id?: string;
    category?: string;
    date?: Date;
    amount?: number;
    payee?: string;
    account?: string;
    memo?: string;
  }[];
}

export function TransactionList(props: TransactionListProps) {
  const handleListClick = (item: any) => {
    console.log(item);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {props.data.map((item) => (
        <ListItem
          key={item.id ?? generateRandomString(8)}
          alignItems="flex-start"
        >
          <ListItemButton
            role={undefined}
            onClick={() => handleListClick(item)}
            dense
          >
            <ListItemAvatar>
              <Avatar>
                {item.category
                  ? item.category?.slice(0, 2)
                  : item.payee?.slice(0, 2)}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                item.category || item.category !== ""
                  ? item.category
                  : "No Category"
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {item.payee}
                  </Typography>
                  {` — ${numbro(item.amount).format('0,0')} on ${dayjs(item.date).format("MMM DD")}`}
                  {dayjs().year().toString() !==
                  dayjs(item.date).year().toString()
                    ? `, ${dayjs(item.date).year()}`
                    : ""}
                </React.Fragment>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
