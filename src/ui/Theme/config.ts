import { createTheme, PaletteMode } from "@mui/material";

export default ({ theme = "dark" }: { theme: PaletteMode }) =>
  createTheme({
    palette: {
      mode: theme,
      primary: {
        main: theme === "light" ? "#000" : "#fff",
      },
      background: {
        default: theme === "light" ? "#fff" : "#000",
      },
    },

    shape: {
      borderRadius: 10,
    },

    components: {
      MuiChip: {
        styleOverrides: {
          filled: {
            backgroundColor: theme === "light" ? "#000" : "#fff",
            color: theme === "light" ? "#fff" : "#000",
          },
        },
      },

      MuiPaper: {
        defaultProps: {
          variant: "outlined",
        },
      },

      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            "&:active": {
              opacity: 0.7,
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            boxShadow: "none",
          },
          sizeLarge: {
            padding: "12px 20px",
            fontSize: "16px",
          },
        },
      },
    },
  });
