/**
 * Eloquio Typography
 */

export const ELOQUIO_TYPOGRAPHY = {
  fontFamily: {
    body: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    display: '"Clash Display", "Inter", sans-serif',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semiBold: 600,
  },
  scale: {
    h1: { fontSize: 48, fontWeight: 600, lineHeight: 1.2 },
    h2: { fontSize: 32, fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: 24, fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: 20, fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: 18, fontWeight: 500, lineHeight: 1.5 },
    h6: { fontSize: 16, fontWeight: 500, lineHeight: 1.5 },
    body1: { fontSize: 16, fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: 14, fontWeight: 400, lineHeight: 1.6 },
    button: { fontSize: 16, fontWeight: 600, lineHeight: 1.5 },
    caption: { fontSize: 12, fontWeight: 500, lineHeight: 1.5 },
  },
} as const;

export type EloquioTypography = typeof ELOQUIO_TYPOGRAPHY;
