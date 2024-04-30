import { Box, styled } from "@mui/material";

export const ListTableRow = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
}));

export function ListTableColumn(
  props: {
    ratio?: number;
    children?: React.ReactNode;
  } & React.ComponentProps<typeof Box>
) {
  return (
    <Box
      {...props}
      sx={{
        // display: 'flex',
        // alignItems: 'center',
        flex: `0 0 ${props.ratio ?? 20}%`,
        ...(props.sx ?? {}),
      }}
    >
      {props.children}
    </Box>
  );
}
