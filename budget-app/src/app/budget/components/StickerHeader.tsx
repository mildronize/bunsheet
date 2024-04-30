import { Box, Typography } from "@mui/material";

export interface StickyHeaderProps {
  height?: number;
}

export function StickyHeader(props: StickyHeaderProps) {
  return (
    <Box
      sx={{
        ...(props.height ? { height: `${props.height}px` } : {}),
        display: "flex",
        flexDirection: "column",
        // margin: "0 10px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#FAEEED",
          padding: "10px 20px",
          borderRadius: "5px",
          margin: "10px",
          // textAlign: "right",
        }}
      >
        0<br />
        Unassigned Budget
      </Box>
    </Box>
  );
}
