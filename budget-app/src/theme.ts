"use client";
import { Figtree, Roboto, Heebo, Poppins, Montserrat, Karla } from "next/font/google";

import { createTheme } from "@mui/material/styles";

const karla = Karla({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

// Figtree
const montserrat = Montserrat({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const heebo = Heebo({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

declare module '@mui/material/styles' {
  interface Theme {
    budget: Record<string, unknown>;
  }
  interface ThemeOptions {
    budget?: Record<string, unknown>;
  }
}

const theme = createTheme({
  palette: {
    mode: "light",
  },

  typography: {
    fontFamily: heebo.style.fontFamily,
    // budget: {
    //   fontFamily: karla.style.fontFamily,
    //   fontWeight: 700,
    // },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: poppins.style.fontFamily,
          fontWeight: 700,
        },
      },
    },
    MuiListItemText: {
      defaultProps: {
        primaryTypographyProps: {
          sx: {
            fontFamily: heebo.style.fontFamily,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: heebo.style.fontFamily,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: "transparent",
        position: "static",
      },
      styleOverrides: {
        root: {
          marginBottom: "30px",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.3)",
          padding: "5px 0px", // Expand size of AppBar
        },
      },
    },
  },
});

export default theme;
