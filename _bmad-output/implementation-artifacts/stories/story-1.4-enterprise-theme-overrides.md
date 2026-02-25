# Story 1.4: Create Enterprise Theme Overrides

## Metadata
- **Epic:** 1 - Enterprise Architecture Foundation
- **Priority:** P0
- **Complexity:** Medium
- **Estimated effort:** 1.5 hours
- **Dependencies:** Story 1.1
- **Blocks:** Story 2.5

## User Story
As a **developer**,
I want **a theme overrides module with Eloquio's color palette and typography**,
So that **the theme can be applied by extending the base Voquill theme without replacing it entirely**.

## Requirements Covered
- FR4: Create enterprise theme overrides for Eloquio color palette
- AR6: Primary palette (Cream Base, Warm White, Soft Gray, Charcoal)
- AR7: Accent color (Sage Green with variants)
- AR8: Semantic colors
- AR9: Warm-toned shadows
- AR10: Inter font for body
- AR11: Clash Display for headings

## Technical Specification

### Files to Create/Modify

```
apps/desktop/src/enterprise/branding/
├── colors.ts             # NEW - Color palette constants
├── typography.ts         # NEW - Typography configuration
├── shadows.ts            # NEW - Warm-toned shadows
├── theme.ts              # NEW - MUI theme overrides
└── index.ts              # MODIFY - Add exports
```

### Implementation Details

#### 1. Create `apps/desktop/src/enterprise/branding/colors.ts`

```typescript
/**
 * Eloquio Color Palette
 *
 * Design system colors:
 * - Primary: Warm neutrals (cream, beige tones)
 * - Accent: Sage Green (calming, enterprise-appropriate)
 * - Semantic: Coordinated success/warning/error/info
 */

export const ELOQUIO_COLORS = {
  // Primary palette (warm neutrals)
  primary: {
    creamBase: '#F4E6DA',
    warmWhite: '#F9F8F6',
    softGray: '#E4E2E0',
    mediumGray: '#757170',
    charcoal: '#1A1615',
    warmBrown: '#453F3D',
  },

  // Accent (Sage Green)
  accent: {
    main: '#A8C5A3',
    light: '#C8DCC4',
    dark: '#88A584',
  },

  // Semantic colors (coordinated with palette)
  semantic: {
    success: '#A8C5A3',  // Same as accent
    warning: '#E8C9A0',  // Warm amber
    error: '#D4A59A',    // Soft coral
    info: '#A8B5C5',     // Muted blue-gray
  },

  // Text colors
  text: {
    primary: '#1A1615',    // Charcoal
    secondary: '#453F3D',  // Warm brown
    disabled: '#757170',   // Medium gray
  },

  // Background colors
  background: {
    default: '#F9F8F6',    // Warm white
    paper: '#F4E6DA',      // Cream base
    elevated: '#FFFFFF',   // Pure white for cards
  },
} as const;

// Type export for external use
export type EloquioColors = typeof ELOQUIO_COLORS;
```

#### 2. Create `apps/desktop/src/enterprise/branding/typography.ts`

```typescript
/**
 * Eloquio Typography
 *
 * Fonts:
 * - Inter: Body text, UI elements (400, 500, 600)
 * - Clash Display: Headlines, hero text (500, 600)
 *
 * NOTE: Clash Display requires font files to be added.
 * For MVP, we use Inter for everything with adjusted weights.
 */

export const ELOQUIO_TYPOGRAPHY = {
  // Font families
  fontFamily: {
    body: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    display: '"Clash Display", "Inter", sans-serif',
  },

  // Font weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semiBold: 600,
  },

  // Type scale (desktop sizes)
  scale: {
    h1Hero: { fontSize: '64px', fontWeight: 600, lineHeight: 1.1 },
    h1: { fontSize: '48px', fontWeight: 600, lineHeight: 1.2 },
    h2: { fontSize: '32px', fontWeight: 600, lineHeight: 1.3 },
    h3: { fontSize: '24px', fontWeight: 600, lineHeight: 1.4 },
    h4: { fontSize: '20px', fontWeight: 600, lineHeight: 1.4 },
    h5: { fontSize: '18px', fontWeight: 500, lineHeight: 1.5 },
    h6: { fontSize: '16px', fontWeight: 500, lineHeight: 1.5 },
    body1: { fontSize: '16px', fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: '14px', fontWeight: 400, lineHeight: 1.6 },
    button: { fontSize: '16px', fontWeight: 600, lineHeight: 1.5 },
    caption: { fontSize: '12px', fontWeight: 500, lineHeight: 1.5 },
  },
} as const;

export type EloquioTypography = typeof ELOQUIO_TYPOGRAPHY;
```

#### 3. Create `apps/desktop/src/enterprise/branding/shadows.ts`

```typescript
/**
 * Eloquio Shadows
 *
 * Warm-toned shadows using rgba(69, 63, 61, X) instead of gray.
 * Creates a softer, more cohesive look with the warm palette.
 */

// Base shadow color (warm brown)
const SHADOW_COLOR = '69, 63, 61';

export const ELOQUIO_SHADOWS = {
  // Elevation levels
  none: 'none',
  soft: `0 4px 20px rgba(${SHADOW_COLOR}, 0.08)`,
  medium: `0 8px 32px rgba(${SHADOW_COLOR}, 0.12)`,
  high: `0 16px 48px rgba(${SHADOW_COLOR}, 0.16)`,

  // Component-specific
  card: `0 2px 12px rgba(${SHADOW_COLOR}, 0.06)`,
  dropdown: `0 4px 16px rgba(${SHADOW_COLOR}, 0.10)`,
  modal: `0 24px 64px rgba(${SHADOW_COLOR}, 0.20)`,
  button: `0 2px 8px rgba(${SHADOW_COLOR}, 0.08)`,
  buttonHover: `0 4px 12px rgba(${SHADOW_COLOR}, 0.12)`,
} as const;

// MUI shadow array (25 levels, 0-24)
// We override key levels with warm shadows
export const MUI_SHADOWS = [
  'none',                                          // 0
  `0 1px 3px rgba(${SHADOW_COLOR}, 0.04)`,        // 1
  `0 2px 6px rgba(${SHADOW_COLOR}, 0.06)`,        // 2
  `0 3px 8px rgba(${SHADOW_COLOR}, 0.08)`,        // 3
  `0 4px 12px rgba(${SHADOW_COLOR}, 0.08)`,       // 4
  `0 5px 14px rgba(${SHADOW_COLOR}, 0.10)`,       // 5
  `0 6px 16px rgba(${SHADOW_COLOR}, 0.10)`,       // 6
  `0 7px 18px rgba(${SHADOW_COLOR}, 0.10)`,       // 7
  `0 8px 20px rgba(${SHADOW_COLOR}, 0.12)`,       // 8
  `0 9px 22px rgba(${SHADOW_COLOR}, 0.12)`,       // 9
  `0 10px 24px rgba(${SHADOW_COLOR}, 0.12)`,      // 10
  `0 11px 26px rgba(${SHADOW_COLOR}, 0.14)`,      // 11
  `0 12px 28px rgba(${SHADOW_COLOR}, 0.14)`,      // 12
  `0 13px 30px rgba(${SHADOW_COLOR}, 0.14)`,      // 13
  `0 14px 32px rgba(${SHADOW_COLOR}, 0.14)`,      // 14
  `0 15px 34px rgba(${SHADOW_COLOR}, 0.16)`,      // 15
  `0 16px 36px rgba(${SHADOW_COLOR}, 0.16)`,      // 16
  `0 17px 38px rgba(${SHADOW_COLOR}, 0.16)`,      // 17
  `0 18px 40px rgba(${SHADOW_COLOR}, 0.16)`,      // 18
  `0 19px 42px rgba(${SHADOW_COLOR}, 0.18)`,      // 19
  `0 20px 44px rgba(${SHADOW_COLOR}, 0.18)`,      // 20
  `0 21px 46px rgba(${SHADOW_COLOR}, 0.18)`,      // 21
  `0 22px 48px rgba(${SHADOW_COLOR}, 0.20)`,      // 22
  `0 23px 50px rgba(${SHADOW_COLOR}, 0.20)`,      // 23
  `0 24px 52px rgba(${SHADOW_COLOR}, 0.20)`,      // 24
] as const;

export type EloquioShadows = typeof ELOQUIO_SHADOWS;
```

#### 4. Create `apps/desktop/src/enterprise/branding/theme.ts`

```typescript
import type { ThemeOptions } from '@mui/material/styles';
import { ELOQUIO_COLORS } from './colors';
import { ELOQUIO_TYPOGRAPHY } from './typography';
import { MUI_SHADOWS } from './shadows';

/**
 * Eloquio MUI Theme Overrides
 *
 * These overrides are designed to be merged with the base Voquill theme
 * using spread operator. Only specified values are overridden.
 *
 * Usage in theme.ts:
 *   import { eloquioThemeOverrides } from '@/enterprise/branding';
 *   const theme = createTheme({ ...baseTheme, ...eloquioThemeOverrides });
 */
export const eloquioThemeOverrides: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: ELOQUIO_COLORS.accent.main,
      light: ELOQUIO_COLORS.accent.light,
      dark: ELOQUIO_COLORS.accent.dark,
      contrastText: ELOQUIO_COLORS.primary.charcoal,
    },
    secondary: {
      main: ELOQUIO_COLORS.primary.warmBrown,
      light: ELOQUIO_COLORS.primary.mediumGray,
      dark: ELOQUIO_COLORS.primary.charcoal,
    },
    error: {
      main: ELOQUIO_COLORS.semantic.error,
    },
    warning: {
      main: ELOQUIO_COLORS.semantic.warning,
    },
    success: {
      main: ELOQUIO_COLORS.semantic.success,
    },
    info: {
      main: ELOQUIO_COLORS.semantic.info,
    },
    background: {
      default: ELOQUIO_COLORS.background.default,
      paper: ELOQUIO_COLORS.background.paper,
    },
    text: {
      primary: ELOQUIO_COLORS.text.primary,
      secondary: ELOQUIO_COLORS.text.secondary,
      disabled: ELOQUIO_COLORS.text.disabled,
    },
  },

  typography: {
    fontFamily: ELOQUIO_TYPOGRAPHY.fontFamily.body,
    h1: {
      fontFamily: ELOQUIO_TYPOGRAPHY.fontFamily.display,
      ...ELOQUIO_TYPOGRAPHY.scale.h1,
    },
    h2: {
      fontFamily: ELOQUIO_TYPOGRAPHY.fontFamily.display,
      ...ELOQUIO_TYPOGRAPHY.scale.h2,
    },
    h3: {
      fontFamily: ELOQUIO_TYPOGRAPHY.fontFamily.display,
      ...ELOQUIO_TYPOGRAPHY.scale.h3,
    },
    h4: {
      fontFamily: ELOQUIO_TYPOGRAPHY.fontFamily.display,
      ...ELOQUIO_TYPOGRAPHY.scale.h4,
    },
    h5: ELOQUIO_TYPOGRAPHY.scale.h5,
    h6: ELOQUIO_TYPOGRAPHY.scale.h6,
    body1: ELOQUIO_TYPOGRAPHY.scale.body1,
    body2: ELOQUIO_TYPOGRAPHY.scale.body2,
    button: {
      ...ELOQUIO_TYPOGRAPHY.scale.button,
      textTransform: 'none', // No uppercase buttons
    },
    caption: ELOQUIO_TYPOGRAPHY.scale.caption,
  },

  shadows: MUI_SHADOWS as unknown as ThemeOptions['shadows'],

  shape: {
    borderRadius: 8, // Slightly rounded corners
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: `0 4px 12px rgba(69, 63, 61, 0.12)`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: `0 2px 12px rgba(69, 63, 61, 0.06)`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
  },
};

/**
 * Dark mode overrides (optional, for future use)
 */
export const eloquioDarkThemeOverrides: Partial<ThemeOptions> = {
  palette: {
    mode: 'dark',
    background: {
      default: ELOQUIO_COLORS.primary.charcoal,
      paper: ELOQUIO_COLORS.primary.warmBrown,
    },
    text: {
      primary: ELOQUIO_COLORS.primary.warmWhite,
      secondary: ELOQUIO_COLORS.primary.softGray,
    },
  },
};
```

#### 5. Update `apps/desktop/src/enterprise/branding/index.ts`

```typescript
/**
 * Eloquio Branding Module
 * Theme, colors, typography, and shadows
 */

export * from './colors';
export * from './typography';
export * from './shadows';
export * from './theme';
```

## Acceptance Criteria

### AC1: Colors Exported
```gherkin
Given Story 1.1 is complete
When I create `apps/desktop/src/enterprise/branding/colors.ts`
Then it exports `ELOQUIO_COLORS` with:
  | Category    | Key         | Value     |
  | primary     | creamBase   | #F4E6DA   |
  | primary     | warmWhite   | #F9F8F6   |
  | primary     | charcoal    | #1A1615   |
  | accent      | main        | #A8C5A3   |
  | accent      | light       | #C8DCC4   |
  | accent      | dark        | #88A584   |
  | semantic    | success     | #A8C5A3   |
  | semantic    | warning     | #E8C9A0   |
  | semantic    | error       | #D4A59A   |
  | semantic    | info        | #A8B5C5   |
```

### AC2: Theme Overrides Structure
```gherkin
Given the branding module exists
When I import `eloquioThemeOverrides` from `@/enterprise/branding`
Then it is compatible with MUI v7 `createTheme()` structure
And it includes `palette`, `typography`, `shadows`, and `components` keys
```

### AC3: Shadows Are Warm-Toned
```gherkin
Given the theme overrides exist
When I inspect the shadows
Then they use `rgba(69, 63, 61, X)` (warm brown) instead of gray
And all 25 MUI shadow levels are defined
```

### AC4: Typography Configuration
```gherkin
Given the theme overrides exist
When I inspect typography
Then body text uses Inter font family
And h1-h4 use Clash Display (or Inter as fallback)
And button text is not uppercase (textTransform: 'none')
```

### AC5: Merge Compatibility
```gherkin
Given the theme overrides exist
When they are merged with a base theme using spread operator
Then Eloquio colors and styles take precedence
And any unspecified values fall back to the base theme
```

## Verification Steps

```bash
# 1. Type check
cd apps/desktop
npm run check-types

# 2. Verify all exports
# Create test file:
# import {
#   ELOQUIO_COLORS,
#   ELOQUIO_TYPOGRAPHY,
#   ELOQUIO_SHADOWS,
#   MUI_SHADOWS,
#   eloquioThemeOverrides,
# } from '@/enterprise/branding';
# console.log(ELOQUIO_COLORS.accent.main); // #A8C5A3
```

## Font Installation (Optional)

To use Clash Display font:

1. Download from [fontshare.com/fonts/clash-display](https://www.fontshare.com/fonts/clash-display)
2. Add to `apps/desktop/src/assets/fonts/`
3. Import in `main.tsx` or CSS

For MVP, Inter (already installed via `@fontsource/roboto`) can be used for all text.

## Notes for Developer

- Theme overrides use MUI v7 structure (check existing `theme.ts` for compatibility)
- Colors are intentionally warm to match Eloquio brand
- Shadows use warm brown instead of pure gray for cohesion
- `textTransform: 'none'` prevents ALL CAPS buttons (enterprise preference)
- Dark mode overrides are optional for MVP
