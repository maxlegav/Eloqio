# Eloquio Implementation Stories

## Overview

This directory contains detailed implementation stories for white-labeling Voquill to Eloquio. Each story file includes:
- Technical specifications
- Code examples
- Acceptance criteria (Gherkin format)
- Verification steps
- Merge conflict risk assessment

## Story Index

### Epic 1: Enterprise Architecture Foundation
| Story | Title | Priority | Complexity | Dependencies |
|-------|-------|----------|------------|--------------|
| 1.1 | Create Enterprise Module Structure | P0 | Low | None |
| 1.2 | Create Enterprise Config Module | P0 | Low | 1.1 |
| 1.3 | Create Enterprise Features Config | P0 | Low | 1.1 |
| 1.4 | Create Enterprise Theme Overrides | P0 | Medium | 1.1 |

### Epic 2: Complete Desktop App Branding
| Story | Title | Priority | Complexity | Dependencies |
|-------|-------|----------|------------|--------------|
| 2.1 | Update Package Configuration | P1 | Low | None |
| 2.2 | Update Tauri/Rust Configuration | P1 | Low | 1.2 |
| 2.3 | Update Project Documentation | P1 | Low | None |
| 2.4 | Integrate Visual Assets | P1 | Low | Assets ready |
| 2.5 | Apply Eloquio Theme to MUI | P1 | Low | 1.4 |
| 2.6 | Update All Locale Files | P1 | Low | None |

### Epic 3: Local-Only Mode Experience
| Story | Title | Priority | Complexity | Dependencies |
|-------|-------|----------|------------|--------------|
| 3.1 | Analyze Settings Mode Component | P0 | Low | None |
| 3.2 | Implement Conditional Mode Rendering | P0 | Medium | 1.3 |
| 3.3 | Verify Local Default & Validation | P1 | Low | 1.3 |

### Epic 4: Marketing Site Launch
| Story | Title | Priority | Complexity | Dependencies |
|-------|-------|----------|------------|--------------|
| 4.1 | Update Site Config & Theme | P1 | Medium | None |
| 4.2 | Replace Site Branding Assets | P1 | Low | Assets ready |
| 4.3 | Rebuild Landing Page | P1 | High | 4.1, 4.2 |
| 4.4 | Add FAQ Section | P1 | Medium | 4.1 |
| 4.5 | Simplify Pricing Section | P1 | Medium | 4.1 |
| 4.6 | Update Navigation & Footer | P1 | Low | 4.1 |

### Epic 5: Documentation & Maintenance
| Story | Title | Priority | Complexity | Dependencies |
|-------|-------|----------|------------|--------------|
| 5.1 | Create White-Label Docs | P2 | Low | All of Epic 1 |
| 5.2 | Create Upstream Sync Guide | P2 | Medium | None |
| 5.3 | Update Existing Docs | P2 | Low | None |

## Implementation Order (Recommended)

```
Phase 1: Foundation (Day 1)
├── Story 1.1: Enterprise module structure
├── Story 1.2: Config module (parallel)
├── Story 1.3: Features config (parallel)
└── Story 1.4: Theme overrides (parallel)

Phase 2: Core Branding (Day 1-2)
├── Story 2.1: Package.json updates
├── Story 2.2: Tauri/Cargo config
├── Story 2.5: Apply theme to MUI
└── Story 2.6: Locale file updates (can batch)

Phase 3: Mode Hiding (Day 2)
├── Story 3.1: Analyze current implementation
├── Story 3.2: Implement conditional rendering
└── Story 3.3: Verify defaults

Phase 4: Visual Assets (Day 2-3)
├── Story 2.3: Documentation updates
├── Story 2.4: Logo/icon integration
└── (Requires assets to be ready)

Phase 5: Marketing Site (Day 3-4)
├── Story 4.1: Site config
├── Story 4.2: Site assets
├── Story 4.3: Landing page rebuild
├── Story 4.4: FAQ section
├── Story 4.5: Pricing simplification
└── Story 4.6: Navigation/footer

Phase 6: Documentation (Day 4-5)
├── Story 5.1: White-label docs
├── Story 5.2: Upstream sync guide
└── Story 5.3: Update existing docs
```

## Dependency Graph

```
1.1 ─┬─→ 1.2 ─→ 2.2
     ├─→ 1.3 ─→ 3.2
     └─→ 1.4 ─→ 2.5

Assets ─→ 2.4
       ─→ 4.2 ─→ 4.3

4.1 ─┬─→ 4.3
     ├─→ 4.4
     ├─→ 4.5
     └─→ 4.6
```

## Files in This Directory

### Detailed Story Files
- `story-1.1-enterprise-module-structure.md`
- `story-1.2-enterprise-config-module.md`
- `story-1.3-enterprise-features-config.md`
- `story-1.4-enterprise-theme-overrides.md`
- `story-2.1-package-configuration.md`
- `story-2.2-tauri-rust-configuration.md`
- `story-2.5-apply-eloquio-theme.md`
- `story-3.2-conditional-mode-rendering.md`
- `story-4.3-landing-page-enterprise-messaging.md`

### Stories Without Detailed Files
The remaining stories (2.3, 2.4, 2.6, 3.1, 3.3, 4.1, 4.2, 4.4-4.6, 5.1-5.3) have acceptance criteria in the main `epics.md` file but don't require detailed implementation files because they are:
- Simple find-and-replace tasks (2.3, 2.6)
- Asset replacement (2.4, 4.2)
- Analysis/verification (3.1, 3.3)
- Documentation writing (5.1-5.3)
- Covered by similar patterns in detailed stories (4.1, 4.4-4.6)

## Merge Conflict Risk Summary

| Risk Level | Files |
|------------|-------|
| **High** | `.env.prod`, `.env.dev`, `.firebaserc` (Firebase config) |
| **Medium** | `package.json`, `tauri.conf.json`, `Cargo.toml` |
| **Low** | `theme.ts`, settings components, locale files |
| **None** | All `enterprise/` module files (new files) |

## Quick Reference: Key Directories

```
apps/desktop/src/enterprise/     # All Eloquio customizations (NEW)
├── config/                      # Brand values
├── features/                    # Feature flags
└── branding/                    # Theme overrides

apps/desktop/src/components/     # UI components (minimal changes)
apps/desktop/src/theme.ts        # MUI theme (add import + merge)
apps/desktop/src/i18n/locales/   # Locale files (find-replace)
apps/desktop/src-tauri/          # Rust backend (config only)
apps/web/                        # Marketing site (full rebrand)
```

## Testing Checklist

After all stories are complete:

- [ ] `npm run check-types` passes in `apps/desktop`
- [ ] `npm run build` produces "Eloquio" app
- [ ] App window title shows "Eloquio"
- [ ] App icon is Eloquio logo
- [ ] Theme colors are Cream/Sage (not Voquill colors)
- [ ] Settings shows only "Local" mode
- [ ] All 12 locales show "Eloquio" text
- [ ] Marketing site shows Eloquio branding
- [ ] No Discord links on marketing site
- [ ] "Book a Call" CTA works
- [ ] Can still merge upstream Voquill changes
