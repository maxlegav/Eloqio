/**
 * Eloquio Color Palette
 */

export const ELOQUIO_COLORS = {
  primary: {
    creamBase: '#F4E6DA',
    warmWhite: '#F9F8F6',
    softGray: '#E4E2E0',
    mediumGray: '#757170',
    charcoal: '#1A1615',
    warmBrown: '#453F3D',
  },
  accent: {
    main: '#A8C5A3',
    light: '#C8DCC4',
    dark: '#88A584',
  },
  semantic: {
    success: '#A8C5A3',
    warning: '#E8C9A0',
    error: '#D4A59A',
    info: '#A8B5C5',
  },
  text: {
    primary: '#1A1615',
    secondary: '#453F3D',
    disabled: '#757170',
  },
  background: {
    default: '#F9F8F6',
    paper: '#F4E6DA',
    elevated: '#FFFFFF',
  },
} as const;

export type EloquioColors = typeof ELOQUIO_COLORS;
