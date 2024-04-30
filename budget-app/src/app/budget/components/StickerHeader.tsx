import { Box } from "@mui/material";

export interface StickyHeaderProps {
  height: number;
}

export function StickyHeader(props: StickyHeaderProps) {
  return (
    <Box
      sx={{
        maxHeight: `${props.height}px`,
        // padding: "10px 20px",
        margin: "10px",
        display: "flex",
        flexDirection:"column",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#FAEEED",
          padding: "10px 20px",
          borderRadius: "5px",
          // textAlign: "right",
        }}
      >
        0<br />
        Unassigned Budget
      </Box>
      <Box>
        header
      </Box>
    </Box>
  );
}
