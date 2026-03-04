import { createTheme, type Shadows } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: {
    cssVarPrefix: "app",
  },

  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#37ec13", contrastText: "#121811" },
        secondary: { main: "#6B8E65", light: "#A8C5A3" },

        goldFg: "rgb(104, 48, 9)",
        goldBg: "rgba(255, 193, 7, 0.6)",
        shadow: "rgba(55, 236, 19, 0.2)",
        blue: "#37ec13",
        blueHover: "#2ed60f",
        blueActive: "#28c00d",
        onBlue: "#121811",

        level0: "#f6f8f6",
        level1: "#FFFFFF",
        level2: "#F4E6DA",
        level3: "#A8C5A3",
      },
    },
    dark: {
      palette: {
        primary: { main: "#37ec13", light: "#5ff03d", contrastText: "#121811" },
        secondary: { main: "#A8C5A3", light: "#C8DCC4" },

        goldFg: "#FFD700",
        goldBg: "rgba(255, 215, 0, 0.2)",
        shadow: "rgba(0, 0, 0, 0.3)",
        blue: "#37ec13",
        blueHover: "#2ed60f",
        blueActive: "#28c00d",
        onBlue: "#121811",

        level0: "#132210",
        level1: "#1c2e18",
        level2: "#243820",
        level3: "#2d4528",
      },
    },
  },

  shape: { borderRadius: 12 },

  shadows: Array(25).fill("none") as unknown[] as Shadows,

  typography: {
    fontFamily: '"DM Sans", "Helvetica", "Arial", sans-serif',
    pxToRem: (px: number) => `${px / 16}rem`,

    h1: { fontSize: 48, lineHeight: 1.1, fontWeight: 900, fontFamily: '"Playfair Display", Georgia, serif' },
    h2: { fontSize: 36, lineHeight: 1.2, fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif' },
    h3: { fontSize: 28, lineHeight: 1.3, fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif' },
    h4: { fontSize: 24, lineHeight: 1.4, fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif' },
    h5: { fontSize: 20, lineHeight: 1.5, fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif' },
    h6: { fontSize: 16, lineHeight: 1.5, fontWeight: 600 },

    subtitle1: { fontSize: 16, lineHeight: 1.6, fontWeight: 500 },
    subtitle2: { fontSize: 14, lineHeight: 1.6, fontWeight: 500 },

    displayLarge: { fontSize: 57, lineHeight: 1.1, fontWeight: 900, fontFamily: '"Playfair Display", Georgia, serif' },
    displayMedium: { fontSize: 45, lineHeight: 1.1, fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif' },
    displaySmall: { fontSize: 36, lineHeight: 1.1, fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif' },

    headlineLarge: { fontSize: 32, lineHeight: 1.2, fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif' },
    headlineMedium: { fontSize: 28, lineHeight: 1.2, fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif' },
    headlineSmall: { fontSize: 24, lineHeight: 1.3, fontWeight: 700, fontFamily: '"Playfair Display", Georgia, serif' },

    titleLarge: { fontSize: 24, lineHeight: 1.3, fontWeight: 500 },
    titleMedium: { fontSize: 18, lineHeight: 1.4, fontWeight: 500 },
    titleSmall: { fontSize: 16, lineHeight: 1.4, fontWeight: 500 },

    bodyLarge: { fontSize: 18, lineHeight: 1.6, fontWeight: 400 },
    bodyMedium: { fontSize: 16, lineHeight: 1.6, fontWeight: 400 },
    bodySmall: { fontSize: 14, lineHeight: 1.6, fontWeight: 400 },

    labelLarge: { fontSize: 16, lineHeight: 1.5, fontWeight: 500 },
    labelMedium: { fontSize: 14, lineHeight: 1.5, fontWeight: 500 },
    labelSmall: { fontSize: 13, lineHeight: 1.5, fontWeight: 500 },

    body1: { fontSize: 16, lineHeight: 1.6, fontWeight: 400 },
    body2: { fontSize: 14, lineHeight: 1.6, fontWeight: 400 },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          backgroundColor: themeParam.vars.palette.level0,
          color: themeParam.vars.palette.text?.primary,
          fontFamily: '"DM Sans", "Helvetica", "Arial", sans-serif',
          transition: "background-color 0.3s ease",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
      }),
    },

    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.vars.palette.level0,
          borderRadius: 16,
        }),
      },
    },

    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(3),
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
        }),
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(14),
          fontWeight: 500,
          backgroundColor: theme.vars.palette.level1,
          color: theme.vars.palette.text.primary,
          borderRadius: 8,
        }),
      },
    },

    MuiSwitch: {
      styleOverrides: {
        switchBase: ({ theme }) => ({
          "&.Mui-checked": {
            color: theme.vars.palette.blue,
            "& + .MuiSwitch-track": {
              backgroundColor: theme.vars.palette.blue,
            },
          },
        }),
        track: ({ theme }) => ({
          ".Mui-checked.Mui-checked + &": {
            backgroundColor: theme.vars.palette.blue,
          },
        }),
      },
    },

    MuiFab: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: "none",
          fontSize: theme.typography.pxToRem(20),
          fontWeight: 700,
          borderRadius: 99,
          padding: theme.spacing(2, 3),
          boxShadow: `0 4px 20px ${theme.vars.palette.shadow}`,
          "& .MuiSvgIcon-root": {
            fontSize: 28,
          },
          "&.MuiFab-info": {
            backgroundColor: theme.vars.palette.level2,
            color: theme.vars.palette.text.primary,
            "&:hover": {
              backgroundColor: theme.vars.palette.level3,
            },
          },
        }),
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.level1,
          borderRadius: theme.shape.borderRadius,
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: "auto",
          },
        }),
        rounded: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },

    MuiPopover: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.vars.palette.level1,
          boxShadow: `0px 8px 24px ${theme.vars?.palette.shadow}`,
          borderRadius: 12,
        }),
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(16),
          color: theme.vars.palette.text.primary,
          fontWeight: 500,
        }),
      },
    },

    MuiAccordionDetails: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(16),
          color: theme.vars.palette.text.secondary,
        }),
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: "none",
          fontWeight: 700,
          borderRadius: 99,
          fontSize: theme.typography.pxToRem(16),
          padding: theme.spacing(1.5, 3),
          "& .MuiSvgIcon-root": {
            fontSize: 24,
          },
        }),
        text: ({ theme }) => ({
          color: theme.vars.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.vars.palette.level1,
          },
          "&:active": {
            backgroundColor: theme.vars.palette.level0,
          },
        }),
        contained: ({ theme }) => ({
          backgroundColor: theme.vars.palette.primary.main,
          color: theme.vars.palette.primary.contrastText,
          boxShadow: `0 4px 16px ${theme.vars.palette.shadow}`,
          "&:hover": {
            backgroundColor: theme.vars.palette.blueHover,
            transform: "scale(1.02)",
          },
          "&:active": {
            backgroundColor: theme.vars.palette.blueActive,
          },
        }),
        outlined: ({ theme }) => ({
          borderColor: theme.vars.palette.secondary.light,
          color: theme.vars.palette.text.primary,
          "&:hover": {
            backgroundColor: "rgba(168, 197, 163, 0.1)",
            borderColor: theme.vars.palette.secondary.main,
          },
        }),
      },
      variants: [
        {
          props: { variant: "flat" },
          style: ({ theme }) => ({
            backgroundColor: theme.vars.palette.level1,
            color: theme.vars.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.vars.palette.level2,
            },
            "&:active": {
              backgroundColor: theme.vars.palette.level3,
            },
            fontSize: theme.typography.pxToRem(16),
            "& .MuiButton-startIcon > .MuiSvgIcon-root, \
    & .MuiButton-endIcon  > .MuiSvgIcon-root": {
              fontSize: 24,
            },
          }),
        },
        {
          props: { variant: "blue" },
          style: ({ theme }) => ({
            backgroundColor: theme.vars.palette.blue,
            color: theme.vars.palette.onBlue,
            boxShadow: `0 4px 20px ${theme.vars.palette.shadow}`,
            "&:hover": {
              backgroundColor: theme.vars.palette.blueHover,
              transform: "scale(1.05)",
            },
            "&:active": {
              backgroundColor: theme.vars.palette.blueActive,
            },
          }),
        },
      ],
    },

    MuiPaper: {
      defaultProps: { elevation: 0, variant: "flat" },
      styleOverrides: {
        outlined: ({ theme }) => ({
          backgroundColor: theme.vars.palette.level0,
          border: "1px solid rgba(168, 197, 163, 0.2)",
          borderRadius: 16,
        }),
      },
      variants: [
        {
          props: { variant: "flat" },
          style: ({ theme }) => ({
            backgroundColor: theme.vars.palette.level1,
            borderRadius: 16,
          }),
        },
      ],
    },

    MuiCard: {
      defaultProps: { variant: "flat" },
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 16,
          boxShadow: `0 4px 20px ${theme.vars.palette.shadow}`,
        }),
      },
      variants: [
        {
          props: { variant: "flat" },
          style: ({ theme }) => ({
            backgroundColor: theme.vars.palette.level1,
          }),
        },
      ],
    },

    MuiStepLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.level0,
          fontSize: theme.typography.pxToRem(18),
        }),
        vertical: ({ theme }) => ({
          backgroundColor: theme.vars.palette.level0,
          fontSize: theme.typography.pxToRem(18),
        }),
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.vars.palette.text.primary,
          "&:hover": {
            backgroundColor: theme.vars.palette.level1,
          },
        }),
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 12,
          "&:hover": {
            backgroundColor: theme.vars.palette.level1,
          },
          "&.Mui-selected": {
            backgroundColor: theme.vars.palette.level2,
            "&:hover": {
              backgroundColor: theme.vars.palette.level2,
            },
          },
        }),
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
          "&.Mui-selected": {
            backgroundColor: theme.vars.palette.primary.main,
            color: theme.vars.palette.primary.contrastText,
            "&:hover": {
              backgroundColor: theme.vars.palette.blueHover,
            },
          },
        }),
      },
    },

    MuiChip: {
      styleOverrides: {
        root: () => ({
          borderRadius: 99,
          fontWeight: 500,
        }),
        filled: ({ theme }) => ({
          backgroundColor: theme.vars.palette.level2,
        }),
        outlined: () => ({
          borderColor: "rgba(168, 197, 163, 0.3)",
        }),
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.vars.palette.secondary.light,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.vars.palette.primary.main,
            },
          },
        }),
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: () => ({
          borderRadius: 12,
        }),
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 99,
          backgroundColor: theme.vars.palette.level2,
        }),
        bar: ({ theme }) => ({
          borderRadius: 99,
          background: `linear-gradient(90deg, ${theme.vars.palette.secondary.light} 0%, ${theme.vars.palette.primary.main} 100%)`,
        }),
      },
    },
  },
});
