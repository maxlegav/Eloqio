export const ELOQUIO_TYPOGRAPHY = {
  fontFamily: {
    body: '"DM Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    display: '"Playfair Display", Georgia, serif',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900,
  },
  scale: {
    h1: { fontSize: 48, fontWeight: 900, lineHeight: 1.1, fontFamily: '"Playfair Display", Georgia, serif' },
    h2: { fontSize: 36, fontWeight: 700, lineHeight: 1.2, fontFamily: '"Playfair Display", Georgia, serif' },
    h3: { fontSize: 28, fontWeight: 700, lineHeight: 1.3, fontFamily: '"Playfair Display", Georgia, serif' },
    h4: { fontSize: 24, fontWeight: 700, lineHeight: 1.4, fontFamily: '"Playfair Display", Georgia, serif' },
    h5: { fontSize: 20, fontWeight: 500, lineHeight: 1.5 },
    h6: { fontSize: 18, fontWeight: 500, lineHeight: 1.5 },
    body1: { fontSize: 16, fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: 14, fontWeight: 400, lineHeight: 1.6 },
    button: { fontSize: 16, fontWeight: 700, lineHeight: 1.5 },
    caption: { fontSize: 12, fontWeight: 500, lineHeight: 1.5 },
  },
} as const;

export type EloquioTypography = typeof ELOQUIO_TYPOGRAPHY;
