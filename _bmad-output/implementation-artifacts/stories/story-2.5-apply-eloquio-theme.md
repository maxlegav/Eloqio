# Story 2.5: Apply Eloquio Theme to MUI

## Metadata
- **Epic:** 2 - Complete Desktop App Branding
- **Priority:** P1
- **Complexity:** Low
- **Estimated effort:** 30 minutes
- **Dependencies:** Story 1.4 (theme overrides must exist)
- **Blocks:** None

## User Story
As a **developer**,
I want **the Eloquio color palette and typography applied to the MUI theme**,
So that **the entire app UI reflects Eloquio's warm, sophisticated visual identity**.

## Requirements Covered
- FR14: Apply Eloquio theme to `theme.ts`
- NFR10: Apply theme consistently across light and dark modes
- AR4: Theme extension/override pattern (not replacement)

## Technical Specification

### Files to Modify

1. `apps/desktop/src/theme.ts`

### Current State Analysis

The existing `theme.ts` file creates a MUI theme. We need to merge Eloquio overrides with minimal changes.

**Current structure (conceptual):**
```typescript
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: { ... },
  typography: { ... },
  // etc.
});
```

### Implementation Details

#### Update `apps/desktop/src/theme.ts`

**Target implementation:**
```typescript
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import { eloquioThemeOverrides } from '@/enterprise/branding';

// Base theme (existing Voquill theme configuration)
const baseTheme: ThemeOptions = {
  // ... existing theme config ...
};

// Merge Eloquio overrides with base theme
// Eloquio values take precedence
export const theme = createTheme(
  deepmerge(baseTheme, eloquioThemeOverrides)
);
```

**Alternative (simpler) approach if base theme is simple:**
```typescript
import { createTheme } from '@mui/material/styles';
import { eloquioThemeOverrides } from '@/enterprise/branding';

// Just use Eloquio theme directly
export const theme = createTheme(eloquioThemeOverrides);
```

**Minimal change approach (recommended):**
```typescript
import { createTheme, ThemeOptions } from '@mui/material/styles';
import { eloquioThemeOverrides } from '@/enterprise/branding';

// Original Voquill theme (preserved for upstream compatibility)
const voquillTheme: ThemeOptions = {
  // ... keep existing code exactly as-is ...
};

// === ELOQUIO CUSTOMIZATION START ===
// Import and merge Eloquio theme overrides
// To revert to Voquill, simply comment out the import and use voquillTheme directly
export const theme = createTheme({
  ...voquillTheme,
  ...eloquioThemeOverrides,
  // Deep merge palette and typography
  palette: {
    ...voquillTheme.palette,
    ...eloquioThemeOverrides.palette,
  },
  typography: {
    ...voquillTheme.typography,
    ...eloquioThemeOverrides.typography,
  },
});
// === ELOQUIO CUSTOMIZATION END ===

// Original export (commented out for Eloquio):
// export const theme = createTheme(voquillTheme);
```

### Lines Changed

This modification adds approximately **5-10 lines** to `theme.ts`:
1. Import statement for `eloquioThemeOverrides`
2. Spread operator merging
3. Comments marking Eloquio changes

## Acceptance Criteria

### AC1: Theme Import Added
```gherkin
Given Story 1.4 is complete (theme overrides exist)
When I update `apps/desktop/src/theme.ts`
Then it imports `eloquioThemeOverrides` from `@/enterprise/branding`
And the import causes no TypeScript errors
```

### AC2: Theme Merged
```gherkin
Given the import is added
When the theme is created
Then Eloquio overrides are merged with the base theme
And the modification is ~5-10 lines added
And the original theme structure is preserved (commented or as base)
```

### AC3: Light Mode Colors
```gherkin
Given the theme is applied
When I run the app in light mode
Then backgrounds use Warm White (#F9F8F6) and Cream (#F4E6DA)
And primary text uses Charcoal (#1A1615)
And accent elements (buttons, links) use Sage Green (#A8C5A3)
```

### AC4: Buttons Styled
```gherkin
Given the theme is applied
When I view any button in the app
Then it uses Sage Green (#A8C5A3) as primary color
And text is not uppercase (textTransform: none)
And corners are rounded (borderRadius: 8px)
```

### AC5: Shadows Warm-Toned
```gherkin
Given the theme is applied
When shadows are rendered on cards or elevated surfaces
Then they use warm tones (rgba(69, 63, 61, X)) instead of gray
```

### AC6: Dark Mode (Optional)
```gherkin
Given the theme is applied
When I switch to dark mode
Then the color scheme adapts appropriately
And text is readable (high contrast)
And Sage Green accent remains consistent
```

## Verification Steps

```bash
# 1. Update theme.ts
cd apps/desktop

# 2. Type check
npm run check-types

# 3. Run app
npm run dev:mac  # or appropriate platform

# 4. Visual inspection checklist:
# - [ ] Background is warm white, not pure white
# - [ ] Primary buttons are sage green
# - [ ] Text is charcoal, not black
# - [ ] Shadows look warm, not gray
# - [ ] Cards have cream-tinted background
```

## Visual Reference

### Before (Voquill)
- Backgrounds: Pure white/gray
- Accent: Blue/purple (typical MUI)
- Shadows: Gray

### After (Eloquio)
- Backgrounds: Warm White (#F9F8F6), Cream (#F4E6DA)
- Accent: Sage Green (#A8C5A3)
- Text: Charcoal (#1A1615)
- Shadows: Warm brown tones

## Merge Conflict Risk

**LOW-MEDIUM** - This file may change upstream for new features.

**Resolution strategy:**
1. Keep the import and merge logic
2. If upstream adds new theme values, they go into `voquillTheme`
3. Eloquio overrides will still take precedence via spread

## Notes for Developer

- The `deepmerge` utility from MUI handles nested objects properly
- If not available, use manual spread (shown in minimal approach)
- Keep Voquill theme code intact but not exported
- This allows easy comparison and future sync
- Test both light and dark modes if dark mode is supported
