import { Box, Typography } from "@mui/material";
import { ListTableColumn, ListTableRow } from "./layouts";
import theme from "@/theme";

export interface StickerListHeaderProps {
  height?: number;
}

export function StickerListHeader(props: StickerListHeaderProps) {
  return (
    <ListTableRow
      sx={{
        ...(props.height ? { height: `${props.height}px` } : {}),
        padding: "8px 10px",
        bgcolor: "#ebebeb",
      }}
    >
      <ListTableColumn ratio={60}></ListTableColumn>
      <ListTableColumn ratio={20}>
        <Typography
          variant="subtitle2"
          align="center"
          sx={{
            textTransform: "uppercase",
            fontSize: "0.7rem",
            fontWeight: "bold",
            color: theme.palette.text.secondary,
          }}
        >
          Budget
        </Typography>
      </ListTableColumn>
      <ListTableColumn ratio={20}>
        <Typography
          variant="subtitle2"
          align="center"
          sx={{
            textTransform: "uppercase",
            fontSize: "0.7rem",
            fontWeight: "bold",
            color: theme.palette.text.secondary,
          }}
        >
          Available
        </Typography>
      </ListTableColumn>
    </ListTableRow>
  );
}
