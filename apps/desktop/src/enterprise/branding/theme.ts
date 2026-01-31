import { ELOQUIO_COLORS } from './colors';
import { ELOQUIO_TYPOGRAPHY } from './typography';

/**
 * Eloquio Color Scheme Overrides
 *
 * To be used with MUI's colorSchemes format.
 * Matches the structure in apps/desktop/src/theme.ts
 */
export const eloquioLightPalette = {
  primary: { main: ELOQUIO_COLORS.accent.main },
  secondary: { main: ELOQUIO_COLORS.primary.warmBrown },

  goldFg: 'rgb(104, 48, 9)',
  goldBg: 'rgba(255, 193, 7, 0.6)',
  shadow: 'rgba(69, 63, 61, 0.18)',
  blue: ELOQUIO_COLORS.accent.main,
  blueHover: ELOQUIO_COLORS.accent.light,
  blueActive: ELOQUIO_COLORS.accent.dark,
  onBlue: ELOQUIO_COLORS.primary.charcoal,

  level0: ELOQUIO_COLORS.background.default,
  level1: ELOQUIO_COLORS.background.paper,
  level2: ELOQUIO_COLORS.primary.softGray,
  level3: '#D0D0D0',
} as const;

export const eloquioDarkPalette = {
  primary: { main: ELOQUIO_COLORS.primary.warmWhite, light: ELOQUIO_COLORS.primary.softGray },
  secondary: { main: '#B3B3B3' },

  goldFg: '#FFD700',
  goldBg: 'rgba(255, 215, 0, 0.2)',
  shadow: 'rgba(69, 63, 61, 0.46)',
  blue: ELOQUIO_COLORS.accent.main,
  blueHover: ELOQUIO_COLORS.accent.light,
  blueActive: ELOQUIO_COLORS.accent.dark,
  onBlue: ELOQUIO_COLORS.primary.charcoal,

  level0: ELOQUIO_COLORS.primary.charcoal,
  level1: ELOQUIO_COLORS.primary.warmBrown,
  level2: '#2D2D2D',
  level3: '#3E3E3E',
} as const;

export const eloquioTypography = {
  fontFamily: ELOQUIO_TYPOGRAPHY.fontFamily.body,
  body1: ELOQUIO_TYPOGRAPHY.scale.body1,
  body2: ELOQUIO_TYPOGRAPHY.scale.body2,
} as const;
