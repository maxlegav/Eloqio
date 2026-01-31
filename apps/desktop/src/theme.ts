import { createTheme, type Shadows } from "@mui/material/styles";
import { eloquioLightPalette, eloquioDarkPalette } from "./enterprise/branding";

// === ELOQUIO THEME ===
export const theme = createTheme({
  cssVariables: {
    cssVarPrefix: "app",
  },

  colorSchemes: {
    light: {
      palette: eloquioLightPalette,
    },
    dark: {
      palette: eloquioDarkPalette,
    },
  },

  shape: { borderRadius: 12 },

  shadows: Array(25).fill("none") as unknown[] as Shadows,

  typography: {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
    pxToRem: (px: number) => `${px / 16}rem`,

    displayLarge: { fontSize: 57, lineHeight: 1, fontWeight: 400 },
    displayMedium: { fontSize: 45, lineHeight: 1, fontWeight: 400 },
    displaySmall: { fontSize: 36, lineHeight: 1, fontWeight: 400 },

    headlineLarge: { fontSize: 32, lineHeight: 1, fontWeight: 400 },
    headlineMedium: { fontSize: 28, lineHeight: 1, fontWeight: 400 },
    headlineSmall: { fontSize: 24, lineHeight: 1, fontWeight: 400 },

    titleLarge: { fontSize: 24, lineHeight: 1, fontWeight: 400 },
    titleMedium: { fontSize: 18, lineHeight: 1, fontWeight: 500 },
    titleSmall: { fontSize: 16, lineHeight: 1, fontWeight: 500 },

    bodyLarge: { fontSize: 18, lineHeight: 1, fontWeight: 400 },
    bodyMedium: { fontSize: 16, lineHeight: 1, fontWeight: 400 },
    bodySmall: { fontSize: 14, lineHeight: 1, fontWeight: 400 },

    labelLarge: { fontSize: 16, lineHeight: 1, fontWeight: 500 },
    labelMedium: { fontSize: 14, lineHeight: 1, fontWeight: 500 },
    labelSmall: { fontSize: 13, lineHeight: 1, fontWeight: 500 },

    body1: { fontSize: 16, lineHeight: 1.5, fontWeight: 400 },
    body2: { fontSize: 14, lineHeight: 1.5, fontWeight: 400 },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          backgroundColor: themeParam.vars.palette.level0,
          color: themeParam.vars.palette.text?.primary,
          transition: "background-color 0.3s ease",
        },
      }),
    },

    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.vars.palette.level0,
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
          borderRadius: 99,
          padding: theme.spacing(2, 3),
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
          boxShadow: `0px 8px 16px ${theme.vars?.palette.shadow}`,
        }),
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: theme.typography.pxToRem(16),
          color: theme.vars.palette.text.primary,
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
          fontWeight: 500,
          borderRadius: theme.shape.borderRadius,
          fontSize: theme.typography.pxToRem(18),
          padding: theme.spacing(1, 2),
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
          "&:hover": {
            backgroundColor: theme.vars.palette.primary.light,
          },
          "&:active": {
            backgroundColor: theme.vars.palette.primary.main,
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
            fontSize: theme.typography.pxToRem(18),
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
            "&:hover": {
              backgroundColor: theme.vars.palette.blueHover,
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
          border: `1px solid ${theme.vars.palette.primary}`,
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
        }),
      },
    },

    MuiCard: {
      defaultProps: { variant: "flat" },
      variants: [
        {
          props: { variant: "flat" },
          style: ({ theme }) => ({
            backgroundColor: theme.vars.palette.level1,
          }),
        },
      ],
    },

    MuiListItemButton: {
      styleOverrides: {
        root: () => ({
          borderRadius: 12,
        }),
      },
    },

    MuiToggleButton: {
      styleOverrides: {
        root: () => ({
          textTransform: "none",
        }),
      },
    },
  },
});
