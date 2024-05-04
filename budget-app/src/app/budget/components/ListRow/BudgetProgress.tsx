import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { BudgetItem } from "../types";
import numbro from "numbro";
import { BudgetLinearProgress, SpendingLinearProgress } from "./components";

export function BudgetProgress({
  items,
  value,
}: {
  value: number;
  items: BudgetItem;
}) {
  const theme = useTheme();

  const activity = items.activity * -1;
  const available = items.available + activity;
  
  if (activity > 0 && activity <= available) {
    return (
      <Box>
        <SpendingLinearProgress variant="determinate" value={value} />
        <Box
          sx={{
            fontSize: "0.85rem",
            color: theme.palette.text.secondary,
            paddingTop: "10px",
          }}
        >
          {Math.abs(activity - available) < 1
            ? "Fully Spent"
            : `Spent ${numbro(activity).format("0,0")} of 
          ${numbro(available).format("0,0")}`}
        </Box>
      </Box>
    );
  }
  return <BudgetLinearProgress variant="determinate" value={value} />;
}
