import { ELOQUIO_COLORS } from './colors';
import { ELOQUIO_TYPOGRAPHY } from './typography';

export const eloquioLightPalette = {
  primary: {
    main: ELOQUIO_COLORS.primary.green,
    light: ELOQUIO_COLORS.accent.light,
    dark: ELOQUIO_COLORS.accent.dark,
    contrastText: ELOQUIO_COLORS.primary.charcoal,
  },
  secondary: {
    main: ELOQUIO_COLORS.primary.sageDark,
    light: ELOQUIO_COLORS.primary.sage,
    dark: ELOQUIO_COLORS.primary.sageAccent,
  },
  text: {
    primary: ELOQUIO_COLORS.text.primary,
    secondary: ELOQUIO_COLORS.text.secondary,
    disabled: ELOQUIO_COLORS.text.disabled,
  },
  background: {
    default: ELOQUIO_COLORS.background.default,
    paper: ELOQUIO_COLORS.background.paper,
  },
  success: {
    main: ELOQUIO_COLORS.semantic.success,
  },
  warning: {
    main: ELOQUIO_COLORS.semantic.warning,
  },
  error: {
    main: ELOQUIO_COLORS.semantic.error,
  },
  info: {
    main: ELOQUIO_COLORS.semantic.info,
  },

  goldFg: 'rgb(104, 48, 9)',
  goldBg: 'rgba(255, 193, 7, 0.6)',
  shadow: ELOQUIO_COLORS.shadow.medium,
  blue: ELOQUIO_COLORS.primary.green,
  blueHover: ELOQUIO_COLORS.primary.greenHover,
  blueActive: ELOQUIO_COLORS.primary.greenActive,
  onBlue: ELOQUIO_COLORS.primary.charcoal,

  level0: ELOQUIO_COLORS.background.default,
  level1: ELOQUIO_COLORS.background.paper,
  level2: ELOQUIO_COLORS.background.cream,
  level3: ELOQUIO_COLORS.primary.sage,

  cream: ELOQUIO_COLORS.primary.cream,
  sage: ELOQUIO_COLORS.primary.sage,
  sageDark: ELOQUIO_COLORS.primary.sageDark,
  sageAccent: ELOQUIO_COLORS.primary.sageAccent,
} as const;

export const eloquioDarkPalette = {
  primary: {
    main: ELOQUIO_COLORS.primary.green,
    light: ELOQUIO_COLORS.accent.light,
    dark: ELOQUIO_COLORS.accent.dark,
    contrastText: ELOQUIO_COLORS.primary.charcoal,
  },
  secondary: {
    main: ELOQUIO_COLORS.primary.sage,
    light: '#C8DCC4',
    dark: ELOQUIO_COLORS.primary.sageDark,
  },
  text: {
    primary: ELOQUIO_COLORS.text.light,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  background: {
    default: ELOQUIO_COLORS.background.dark,
    paper: ELOQUIO_COLORS.background.darkElevated,
  },
  success: {
    main: ELOQUIO_COLORS.semantic.success,
  },
  warning: {
    main: ELOQUIO_COLORS.semantic.warning,
  },
  error: {
    main: ELOQUIO_COLORS.semantic.error,
  },
  info: {
    main: ELOQUIO_COLORS.semantic.info,
  },

  goldFg: '#FFD700',
  goldBg: 'rgba(255, 215, 0, 0.2)',
  shadow: ELOQUIO_COLORS.shadow.dark,
  blue: ELOQUIO_COLORS.primary.green,
  blueHover: ELOQUIO_COLORS.primary.greenHover,
  blueActive: ELOQUIO_COLORS.primary.greenActive,
  onBlue: ELOQUIO_COLORS.primary.charcoal,

  level0: ELOQUIO_COLORS.background.dark,
  level1: ELOQUIO_COLORS.background.darkElevated,
  level2: '#243820',
  level3: '#2d4528',

  cream: ELOQUIO_COLORS.primary.cream,
  sage: ELOQUIO_COLORS.primary.sage,
  sageDark: ELOQUIO_COLORS.primary.sageDark,
  sageAccent: ELOQUIO_COLORS.primary.sageAccent,
} as const;

export const eloquioTypography = {
  fontFamily: ELOQUIO_TYPOGRAPHY.fontFamily.body,
  displayFontFamily: ELOQUIO_TYPOGRAPHY.fontFamily.display,
  body1: ELOQUIO_TYPOGRAPHY.scale.body1,
  body2: ELOQUIO_TYPOGRAPHY.scale.body2,
  h1: ELOQUIO_TYPOGRAPHY.scale.h1,
  h2: ELOQUIO_TYPOGRAPHY.scale.h2,
  h3: ELOQUIO_TYPOGRAPHY.scale.h3,
  h4: ELOQUIO_TYPOGRAPHY.scale.h4,
  h5: ELOQUIO_TYPOGRAPHY.scale.h5,
  h6: ELOQUIO_TYPOGRAPHY.scale.h6,
  button: ELOQUIO_TYPOGRAPHY.scale.button,
  caption: ELOQUIO_TYPOGRAPHY.scale.caption,
} as const;
