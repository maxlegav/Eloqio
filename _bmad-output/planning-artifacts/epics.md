---
stepsCompleted: [1, 2, 3, 4]
status: ready-for-development
totalEpics: 5
totalStories: 22
totalFRsCovered: 42
inputDocuments:
  - "User-provided Tech-Spec: White-label Voquill to Eloquio MVP"
  - "User-provided Complete Voquill Repository Analysis"
---

# Eloqio - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Eloqio, decomposing the requirements from the Tech-Spec and Repository Analysis into implementable stories for white-labeling Voquill to Eloquio.

## Project Context

### Application Description

**Eloquio** is a white-labeled version of Voquill, a cross-platform voice-to-text desktop application built with Tauri (Rust + TypeScript/React). The application enables users to transcribe speech to text using local Whisper inference, with enterprise focus on privacy and local-first processing.

### Technology Stack

| Layer | Technology | Version/Details |
|-------|------------|-----------------|
| **Framework** | Tauri | v2 (Rust + TypeScript bridge) |
| **Backend** | Rust | Native APIs, SQLite, whisper-rs |
| **Frontend** | React | v19 with TypeScript |
| **State Management** | Zustand | With Immer for immutable updates |
| **UI Framework** | MUI | v7 Material Design 3 |
| **Build Tool** | Vite | v7 |
| **Monorepo** | Turborepo | Workspace management |
| **Database** | SQLite | Local via tauri-plugin-sql |
| **Transcription** | whisper-rs | Local Whisper inference |
| **i18n** | react-intl | 12 languages supported |
| **Marketing Site** | Astro | Static site generation |

### Architecture Philosophy

**"Rust is the API, TypeScript is the Brain"**
- ALL business logic lives in TypeScript (never duplicated in Rust)
- Rust provides pure API capabilities without decision-making
- Single source of truth for state is Zustand in TypeScript
- Tauri commands bridge the two layers

### Repository Structure

```
Eloqio/
├── apps/
│   ├── desktop/           # Tauri app (main product)
│   │   ├── src/           # TypeScript/React frontend
│   │   │   ├── actions/   # Business logic orchestration
│   │   │   ├── repos/     # Data access abstraction
│   │   │   ├── state/     # Zustand state slices
│   │   │   ├── components/# React components
│   │   │   ├── utils/     # Pure functions
│   │   │   ├── i18n/      # Internationalization (12 locales)
│   │   │   └── theme.ts   # MUI theme configuration
│   │   └── src-tauri/     # Rust backend
│   │       ├── src/
│   │       │   ├── commands.rs    # 45+ Tauri commands
│   │       │   ├── platform/      # Audio, Whisper, Keyboard
│   │       │   ├── db/            # SQLite queries + migrations
│   │       │   └── system/        # GPU, crypto, models
│   │       └── icons/     # App icons (all platforms)
│   ├── web/               # Astro marketing site
│   └── firebase/          # Cloud Functions backend
├── packages/              # 9 shared packages
│   ├── types/             # Shared TypeScript + Zod types
│   ├── voice-ai/          # Groq, OpenAI, Azure clients
│   └── ...
└── docs/                  # Architecture documentation
```

### Key Patterns

- **Repository Pattern**: Base abstract class + implementations (Local/Cloud/API)
- **Entity Normalization**: State uses maps by ID (`userById`, `transcriptionById`)
- **Actions as Orchestrators**: Compose utils + repos, no logic in components
- **Tauri Commands**: Pure API (conversion + DB call), all decisions in TypeScript

## Requirements Inventory

### Functional Requirements

**Phase 1: Enterprise Module Setup**
- FR1: Create enterprise module directory structure at `apps/desktop/src/enterprise/` with subdirectories: `config/`, `branding/`, `features/`, `i18n/`, `assets/`, `components/`
- FR2: Create enterprise config module exporting Eloquio brand values (appName, productName, bundleIdentifier, website, supportEmail)
- FR3: Create enterprise features config controlling transcription mode visibility (only 'local' for MVP)
- FR4: Create enterprise theme overrides for Eloquio color palette

**Phase 2: Configuration Files Branding**
- FR5: Update root `package.json` name field from "voquill" to "eloquio"
- FR6: Update `apps/desktop/package.json` with name, productName, and description for Eloquio
- FR7: Update `apps/desktop/src-tauri/tauri.conf.json` with productName "Eloquio", identifier "com.eloquio.app", and window title
- FR8: Update `apps/desktop/src-tauri/Cargo.toml` with name "eloquio", description, and authors
- FR9: Update `CLAUDE.md` replacing all "Voquill" references with "Eloquio"
- FR10: Update `README.md` with Eloquio branding, description, and URLs

**Phase 3: Visual Identity & Theme**
- FR11: Prepare Eloquio visual assets (logo SVG, app icons all resolutions, tray icons, macOS .icns, Windows .ico)
- FR12: Replace `apps/desktop/src/assets/app-logo.svg` with Eloquio logo
- FR13: Replace all icons in `apps/desktop/src-tauri/icons/` with Eloquio branded versions
- FR14: Apply Eloquio theme to `apps/desktop/src/theme.ts` using the specified color palette (Cream Base #F4E6DA, Sage Green #A8C5A3, Charcoal #1A1615)

**Phase 4: Internationalization**
- FR15: Update English locale (`en.json`) replacing "Voquill" with "Eloquio"
- FR16: Update French locale (`fr.json`) replacing "Voquill" with "Eloquio"
- FR17: Update Spanish locale (`es.json`) replacing "Voquill" with "Eloquio"
- FR18: Update German locale (`de.json`) replacing "Voquill" with "Eloquio"
- FR19: Update Italian locale (`it.json`) replacing "Voquill" with "Eloquio"
- FR20: Update Portuguese Brazil locale (`pt-BR.json`) replacing "Voquill" with "Eloquio"
- FR21: Update Portuguese Portugal locale (`pt-PT.json`) replacing "Voquill" with "Eloquio"
- FR22: Update Japanese locale (`ja.json`) replacing "Voquill" with "Eloquio"
- FR23: Update Chinese Simplified locale (`zh-CN.json`) replacing "Voquill" with "Eloquio"
- FR24: Update Chinese Traditional locale (`zh-TW.json`) replacing "Voquill" with "Eloquio"
- FR25: Update Russian locale (`ru.json`) replacing "Voquill" with "Eloquio"
- FR26: Update Korean locale (`ko.json`) replacing "Voquill" with "Eloquio"

**Phase 5: Feature Visibility Control**
- FR27: Locate settings mode selection component in `apps/desktop/src/components/settings/SettingsPage.tsx`
- FR28: Implement conditional rendering for transcription modes using enterprise feature flags (hide API and Cloud)
- FR29: Ensure Local mode is set as default in `apps/desktop/src/state/settings.state.ts`
- FR30: Create mode validation helper function `isAllowedMode()` in enterprise features module

**Phase 6: Marketing Site Rebrand**
- FR31: Update `apps/web/astro.config.mjs` with Eloquio site metadata
- FR32: Update `apps/web/package.json` name to "eloquio-web"
- FR33: Replace all branding assets in `apps/web/public/` (logos, favicons, og-images)
- FR34: Update landing page with Eloquio hero section, taglines, and messaging
- FR35: Update pricing page for enterprise focus (if exists)
- FR36: Update all content pages (about, features) with Eloquio branding
- FR37: Update site navigation with Eloquio logo and links

**Phase 7: Documentation**
- FR38: Create `docs/eloquio-white-label.md` documenting enterprise module structure
- FR39: Update `docs/desktop-architecture.md` with enterprise module section
- FR40: Create `docs/upstream-sync.md` with step-by-step merge workflow guide
- FR41: Update `AGENTS.md` with Eloquio-specific conventions
- FR42: Create `apps/desktop/.env.eloquio` environment configuration (optional)

### NonFunctional Requirements

**Upstream Compatibility**
- NFR1: Maintain 100% ability to merge upstream changes from Voquill repository
- NFR2: Achieve zero conflicts in core business logic files (`src/` and `src-tauri/src/`)
- NFR3: Target 95%+ clean merges when syncing upstream
- NFR4: Limit core file modifications to 4 files with ~10 lines total changes

**Architecture Constraints**
- NFR5: Create all Eloquio-specific code in isolated `/src/enterprise/` module (~15 new files)
- NFR6: Document resolution strategy for 3 config files expected to have merge conflicts
- NFR7: Preserve existing Voquill test suite compatibility
- NFR8: Maintain cross-platform support (macOS, Windows, Linux)

**Branding Consistency**
- NFR9: Support all 12 existing languages for branding consistency
- NFR10: Apply theme consistently across light and dark modes
- NFR11: Ensure tray icon visibility on all OS light/dark menu bars

**Build & Deployment**
- NFR12: Output app named "Eloquio" from build process
- NFR13: Package installer shows Eloquio name and icon
- NFR14: App data folder uses appropriate naming

### Additional Requirements

**From Architecture Strategy**
- AR1: Layered architecture approach with separate enterprise module that wraps/overrides Voquill core
- AR2: Git branch strategy: `main` (upstream mirror, never develop here) + `product/main` (Eloquio development)
- AR3: Feature hiding via UI configuration/feature flags - backend code remains intact for future enablement
- AR4: Theme extension/override pattern in `theme.ts` (not replacement) for easier upstream merges
- AR5: Minimal entry point modifications with dependency injection pattern

**From Color Palette Specification**
- AR6: Primary palette: Cream Base (#F4E6DA), Warm White (#F9F8F6), Soft Gray (#E4E2E0), Charcoal (#1A1615)
- AR7: Accent color: Sage Green (#A8C5A3) with light (#C8DCC4) and dark (#88A584) variants
- AR8: Semantic colors: Success (#A8C5A3), Warning (#E8C9A0), Error (#D4A59A), Info (#A8B5C5)
- AR9: Warm-toned shadows instead of gray (rgba(69, 63, 61, 0.08-0.16))

**From Typography Specification**
- AR10: Primary font: Inter (400, 500, 600 weights) for body text and UI
- AR11: Display font: Clash Display (500, 600 weights) for headings and hero text
- AR12: Type scale from H1 Hero (64px desktop) down to Caption (12px)

**From Existing Patterns to Preserve**
- AR13: Repository pattern with base abstract class + implementations
- AR14: Zustand state management with Immer for immutable updates
- AR15: Tauri commands as pure API (no business logic)
- AR16: Entity normalization in state (maps by ID)

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 1 | Create enterprise module directory structure |
| FR2 | Epic 1 | Create enterprise config module |
| FR3 | Epic 1 | Create enterprise features config |
| FR4 | Epic 1 | Create enterprise theme overrides |
| FR5 | Epic 2 | Update root package.json |
| FR6 | Epic 2 | Update desktop package.json |
| FR7 | Epic 2 | Update tauri.conf.json |
| FR8 | Epic 2 | Update Cargo.toml |
| FR9 | Epic 2 | Update CLAUDE.md |
| FR10 | Epic 2 | Update README.md |
| FR11 | Epic 2 | Prepare visual assets |
| FR12 | Epic 2 | Replace app-logo.svg |
| FR13 | Epic 2 | Replace all app icons |
| FR14 | Epic 2 | Apply Eloquio theme |
| FR15 | Epic 2 | Update en.json locale |
| FR16 | Epic 2 | Update fr.json locale |
| FR17 | Epic 2 | Update es.json locale |
| FR18 | Epic 2 | Update de.json locale |
| FR19 | Epic 2 | Update it.json locale |
| FR20 | Epic 2 | Update pt-BR.json locale |
| FR21 | Epic 2 | Update pt-PT.json locale |
| FR22 | Epic 2 | Update ja.json locale |
| FR23 | Epic 2 | Update zh-CN.json locale |
| FR24 | Epic 2 | Update zh-TW.json locale |
| FR25 | Epic 2 | Update ru.json locale |
| FR26 | Epic 2 | Update ko.json locale |
| FR27 | Epic 3 | Locate settings mode component |
| FR28 | Epic 3 | Implement conditional mode rendering |
| FR29 | Epic 3 | Set Local as default mode |
| FR30 | Epic 3 | Create mode validation helper |
| FR31 | Epic 4 | Update Astro site config |
| FR32 | Epic 4 | Update web package.json |
| FR33 | Epic 4 | Replace site branding assets |
| FR34 | Epic 4 | Update landing page |
| FR35 | Epic 4 | Update pricing page |
| FR36 | Epic 4 | Update content pages |
| FR37 | Epic 4 | Update site navigation |
| FR38 | Epic 5 | Create eloquio-white-label.md |
| FR39 | Epic 5 | Update desktop-architecture.md |
| FR40 | Epic 5 | Create upstream-sync.md |
| FR41 | Epic 5 | Update AGENTS.md |
| FR42 | Epic 5 | Create .env.eloquio |

## Epic List

### Epic 1: Enterprise Architecture Foundation
**Goal:** Establish a clean, merge-safe architecture where all Eloquio customizations live in an isolated `/src/enterprise/` module, enabling conflict-free upstream syncs from Voquill.

**User Outcome:** Development team can add any Eloquio-specific customization without touching core Voquill files, ensuring 95%+ clean merges when syncing upstream.

**FRs covered:** FR1, FR2, FR3, FR4
**NFRs addressed:** NFR1, NFR2, NFR3, NFR4, NFR5

---

### Epic 2: Complete Desktop App Branding
**Goal:** Transform the desktop application's visual identity from Voquill to Eloquio across all surfaces—window title, logo, icons, theme colors, and UI text in all 12 supported languages.

**User Outcome:** End users launching the app see "Eloquio" everywhere with the new warm, sophisticated color palette (Cream Base, Sage Green accents) and consistent branding across light/dark modes.

**FRs covered:** FR5, FR6, FR7, FR8, FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20, FR21, FR22, FR23, FR24, FR25, FR26
**NFRs addressed:** NFR8, NFR9, NFR10, NFR11, NFR12, NFR13

---

### Epic 3: Local-Only Mode Experience
**Goal:** Streamline the settings interface to show only "Local" transcription mode, hiding API and Cloud options while preserving the underlying code for future enablement.

**User Outcome:** End users see a focused, enterprise-friendly settings page without confusion about API keys or cloud features—emphasizing Eloquio's local-first, privacy-focused positioning.

**FRs covered:** FR27, FR28, FR29, FR30
**NFRs addressed:** NFR7

---

### Epic 4: Marketing Site Launch
**Goal:** Completely rebrand and restructure the marketing site for enterprise positioning—security-first messaging, FAQ section, simplified pricing, and Book a Call CTA replacing Discord.

**User Outcome:** Enterprise visitors discover Eloquio via a professionally branded website emphasizing 100% local processing, data security, and a clear B2B sales funnel (Free → Book a Call → Enterprise).

**FRs covered:** FR31, FR32, FR33, FR34, FR35, FR36, FR37
**Key Changes:** +FAQ section, +Book a Call CTA, -Discord, -Pro tier, Security-first messaging

---

### Epic 5: Documentation & Maintenance Readiness
**Goal:** Create comprehensive documentation enabling the development team to maintain Eloquio and confidently sync upstream Voquill changes.

**User Outcome:** Development team has clear guides for the enterprise module architecture, upstream sync workflow, and project conventions—ensuring long-term maintainability.

**FRs covered:** FR38, FR39, FR40, FR41, FR42
**NFRs addressed:** NFR6

---

## Epic 1: Enterprise Architecture Foundation

**Goal:** Establish a clean, merge-safe architecture where all Eloquio customizations live in an isolated `/src/enterprise/` module, enabling conflict-free upstream syncs from Voquill.

### Story 1.1: Create Enterprise Module Directory Structure

As a **developer**,
I want **a dedicated enterprise module directory with organized subdirectories**,
So that **all Eloquio-specific code is isolated from Voquill core, enabling clean upstream merges**.

**Requirements:** FR1
**Files to create:**
- `apps/desktop/src/enterprise/index.ts`
- `apps/desktop/src/enterprise/config/index.ts`
- `apps/desktop/src/enterprise/branding/index.ts`
- `apps/desktop/src/enterprise/features/index.ts`

**Acceptance Criteria:**

**Given** the repository is on `product/main` branch
**When** I create the enterprise module structure
**Then** the directory `apps/desktop/src/enterprise/` exists with subdirectories: `config/`, `branding/`, `features/`
**And** each subdirectory contains an `index.ts` barrel export file
**And** the root `enterprise/index.ts` re-exports all submodules
**And** no core Voquill files are modified

**Given** the enterprise module is created
**When** I run `npm run check-types` from `apps/desktop`
**Then** TypeScript compilation succeeds with no errors
**And** the enterprise module is importable via `@/enterprise`

---

### Story 1.2: Create Enterprise Config Module

As a **developer**,
I want **a centralized configuration module with all Eloquio brand values**,
So that **branding changes require editing only one file and all references stay consistent**.

**Requirements:** FR2
**Files to create/modify:**
- `apps/desktop/src/enterprise/config/brand.ts`
- `apps/desktop/src/enterprise/config/index.ts`

**Acceptance Criteria:**

**Given** the enterprise config module needs to be created
**When** I create `apps/desktop/src/enterprise/config/brand.ts`
**Then** it exports a `ELOQUIO_CONFIG` object with these properties:
```typescript
{
  appName: 'Eloquio',
  productName: 'Eloquio',
  bundleIdentifier: 'com.eloquio.app',
  website: 'https://eloquio.com',
  supportEmail: 'support@eloquio.com',
  companyName: 'Eloquio Team',
  description: 'Enterprise voice-to-text for confidential workflows'
}
```
**And** the config is properly typed with TypeScript interfaces
**And** the config is re-exported from `enterprise/config/index.ts`

**Given** the config module exists
**When** I import `ELOQUIO_CONFIG` from `@/enterprise/config`
**Then** all brand values are accessible
**And** TypeScript provides proper autocomplete and type checking

---

### Story 1.3: Create Enterprise Features Config

As a **developer**,
I want **a feature flags module that controls which transcription modes are visible**,
So that **we can hide API and Cloud modes from the UI while keeping the code intact for future enablement**.

**Requirements:** FR3
**Files to create/modify:**
- `apps/desktop/src/enterprise/features/flags.ts`
- `apps/desktop/src/enterprise/features/index.ts`

**Acceptance Criteria:**

**Given** the enterprise features module needs to be created
**When** I create `apps/desktop/src/enterprise/features/flags.ts`
**Then** it exports an `ELOQUIO_FEATURES` object with:
```typescript
{
  transcriptionModes: ['local'] as const,
  showApiMode: false,
  showCloudMode: false,
  enablePostProcessing: true,
  enableDictionary: true
}
```
**And** a helper function `isAllowedMode(mode: TranscriptionMode): boolean` is exported
**And** types are properly defined using the existing `TranscriptionMode` type from `@/types/ai.types`

**Given** the features config exists
**When** I call `isAllowedMode('local')`
**Then** it returns `true`

**Given** the features config exists
**When** I call `isAllowedMode('api')` or `isAllowedMode('cloud')`
**Then** it returns `false`

---

### Story 1.4: Create Enterprise Theme Overrides

As a **developer**,
I want **a theme overrides module with Eloquio's color palette and typography**,
So that **the theme can be applied by extending the base Voquill theme without replacing it entirely**.

**Requirements:** FR4, AR6, AR7, AR8, AR9, AR10, AR11
**Files to create/modify:**
- `apps/desktop/src/enterprise/branding/theme.ts`
- `apps/desktop/src/enterprise/branding/colors.ts`
- `apps/desktop/src/enterprise/branding/index.ts`

**Acceptance Criteria:**

**Given** the enterprise branding module needs theme overrides
**When** I create `apps/desktop/src/enterprise/branding/colors.ts`
**Then** it exports the Eloquio color palette:
```typescript
export const ELOQUIO_COLORS = {
  // Primary palette (warm neutrals)
  creamBase: '#F4E6DA',
  warmWhite: '#F9F8F6',
  softGray: '#E4E2E0',
  mediumGray: '#757170',
  charcoal: '#1A1615',
  warmBrown: '#453F3D',

  // Accent (Sage Green)
  accent: {
    primary: '#A8C5A3',
    light: '#C8DCC4',
    dark: '#88A584',
  },

  // Semantic colors
  success: '#A8C5A3',
  warning: '#E8C9A0',
  error: '#D4A59A',
  info: '#A8B5C5',
};
```

**Given** the colors are defined
**When** I create `apps/desktop/src/enterprise/branding/theme.ts`
**Then** it exports `eloquioThemeOverrides` compatible with MUI v7 `createTheme()` structure
**And** it includes palette overrides for both light and dark modes
**And** it includes warm-toned shadow definitions: `rgba(69, 63, 61, 0.08)` for soft, `0.12` for medium, `0.16` for high elevation
**And** typography references Inter (400, 500, 600) and Clash Display (500, 600) fonts

**Given** the theme overrides exist
**When** they are merged with the base Voquill theme using spread operator
**Then** Eloquio colors and styles take precedence
**And** any unspecified values fall back to Voquill defaults

---

## Epic 2: Complete Desktop App Branding

**Goal:** Transform the desktop application's visual identity from Voquill to Eloquio across all surfaces—window title, logo, icons, theme colors, and UI text in all 12 supported languages.

### Story 2.1: Update Package Configuration Files

As a **developer**,
I want **all npm package.json files updated with Eloquio naming**,
So that **the project identity is consistent across build tools and package managers**.

**Requirements:** FR5, FR6
**Files to modify:**
- `package.json` (root)
- `apps/desktop/package.json`

**Acceptance Criteria:**

**Given** the root `package.json` exists
**When** I update the name field
**Then** `"name"` is changed from `"voquill"` to `"eloquio"`
**And** no other fields are modified unless they reference "Voquill"

**Given** `apps/desktop/package.json` exists
**When** I update the branding fields
**Then** `"name"` is set to `"eloquio"`
**And** `"productName"` is set to `"Eloquio"`
**And** `"description"` is updated to `"Enterprise voice-to-text for confidential workflows"`
**And** scripts remain unchanged (no logic modifications)

**Given** both package.json files are updated
**When** I run `npm install` from the root
**Then** the installation completes without errors
**And** the workspace resolves correctly

---

### Story 2.2: Update Tauri and Rust Configuration

As a **developer**,
I want **Tauri and Cargo configurations updated with Eloquio branding**,
So that **the built application displays "Eloquio" in window titles, bundle identifiers, and system integrations**.

**Requirements:** FR7, FR8, NFR12, NFR13
**Files to modify:**
- `apps/desktop/src-tauri/tauri.conf.json`
- `apps/desktop/src-tauri/Cargo.toml`

**Acceptance Criteria:**

**Given** `apps/desktop/src-tauri/tauri.conf.json` exists
**When** I update the branding fields
**Then** `productName` is set to `"Eloquio"`
**And** `identifier` is set to `"com.eloquio.app"`
**And** window `title` is set to `"Eloquio"`
**And** all other configuration (plugins, security, features) remains unchanged

**Given** `apps/desktop/src-tauri/Cargo.toml` exists
**When** I update the package metadata
**Then** `name` is set to `"eloquio"`
**And** `description` is set to `"Enterprise voice-to-text application"`
**And** `authors` includes `"Eloquio Team"`
**And** dependencies and features remain unchanged

**Given** both config files are updated
**When** I run `npm run build` from `apps/desktop`
**Then** the build produces an application named "Eloquio"
**And** the bundle identifier is `com.eloquio.app`

---

### Story 2.3: Update Project Documentation Branding

As a **developer**,
I want **CLAUDE.md and README.md updated with Eloquio branding**,
So that **AI agents and human readers understand this is the Eloquio project**.

**Requirements:** FR9, FR10
**Files to modify:**
- `CLAUDE.md`
- `README.md`

**Acceptance Criteria:**

**Given** `CLAUDE.md` exists with Voquill references
**When** I perform find-and-replace
**Then** all instances of "Voquill" are replaced with "Eloquio"
**And** all instances of "voquill" are replaced with "eloquio" (lowercase)
**And** the technical architecture descriptions remain accurate
**And** the project overview reflects enterprise voice-to-text focus

**Given** `README.md` exists
**When** I update the branding
**Then** the project name displays as "Eloquio"
**And** the description emphasizes local-first, enterprise capabilities
**And** URLs reference eloquio.com (where applicable)
**And** installation and development commands remain accurate

**Given** both documentation files are updated
**When** a developer reads them
**Then** they understand this is the Eloquio project (not Voquill)
**And** all technical instructions remain valid

---

### Story 2.4: Integrate Eloquio Visual Assets

As a **developer**,
I want **Eloquio logo and app icons integrated into the desktop application**,
So that **users see Eloquio branding in the app UI, taskbar, dock, and system tray**.

**Requirements:** FR11, FR12, FR13, NFR11
**Files to modify:**
- `apps/desktop/src/assets/app-logo.svg`
- `apps/desktop/src-tauri/icons/*` (all icon files)

**Prerequisite:** Eloquio visual assets must be prepared (logo SVG, icons PNG at all resolutions, .icns, .ico, tray icons)

**Acceptance Criteria:**

**Given** Eloquio logo SVG is available
**When** I replace `apps/desktop/src/assets/app-logo.svg`
**Then** the new logo is displayed in the app header/sidebar
**And** the logo works on both light and dark backgrounds
**And** the file size is reasonable (under 2KB for SVG)

**Given** Eloquio app icons are available at all resolutions
**When** I replace files in `apps/desktop/src-tauri/icons/`
**Then** the following files are updated:
  - `32x32.png`, `128x128.png`, `128x128@2x.png`, `icon.icns` (macOS)
  - `icon.ico` (Windows)
  - `icon.png` (Linux)
  - `tray-icon.png`, `tray-icon@2x.png` (system tray)
**And** existing filenames are preserved (no renaming)

**Given** the icons are replaced
**When** I build and run the app on macOS
**Then** the dock icon shows the Eloquio logo
**And** the menu bar tray icon is visible in both light and dark mode

**Given** the icons are replaced
**When** I build and run the app on Windows
**Then** the taskbar icon shows the Eloquio logo
**And** the system tray icon is visible

---

### Story 2.5: Apply Eloquio Theme to MUI

As a **developer**,
I want **the Eloquio color palette and typography applied to the MUI theme**,
So that **the entire app UI reflects Eloquio's warm, sophisticated visual identity**.

**Requirements:** FR14, NFR10, AR4
**Files to modify:**
- `apps/desktop/src/theme.ts`

**Acceptance Criteria:**

**Given** the enterprise theme overrides exist (from Story 1.4)
**When** I update `apps/desktop/src/theme.ts`
**Then** it imports `eloquioThemeOverrides` from `@/enterprise/branding`
**And** the base theme is extended with Eloquio overrides using spread operator
**And** the modification is minimal (~5-10 lines added)
**And** the original theme structure is preserved for upstream merge compatibility

**Given** the theme is applied
**When** I run the app in light mode
**Then** backgrounds use warm neutrals (Cream Base #F4E6DA, Warm White #F9F8F6)
**And** primary text uses Charcoal (#1A1615)
**And** accent elements use Sage Green (#A8C5A3)
**And** buttons and interactive elements reflect the new palette

**Given** the theme is applied
**When** I run the app in dark mode
**Then** the color scheme adapts appropriately
**And** contrast ratios meet accessibility standards
**And** Sage Green accent remains consistent

**Given** the theme is applied
**When** shadows are rendered on elevated surfaces
**Then** they use warm-toned values (`rgba(69, 63, 61, X)`) instead of gray

---

### Story 2.6: Update All Locale Files with Eloquio Branding

As a **developer**,
I want **all 12 locale JSON files updated to replace "Voquill" with "Eloquio"**,
So that **users see consistent Eloquio branding regardless of their language setting**.

**Requirements:** FR15-FR26, NFR9
**Files to modify:**
- `apps/desktop/src/i18n/locales/en.json`
- `apps/desktop/src/i18n/locales/fr.json`
- `apps/desktop/src/i18n/locales/es.json`
- `apps/desktop/src/i18n/locales/de.json`
- `apps/desktop/src/i18n/locales/it.json`
- `apps/desktop/src/i18n/locales/pt-BR.json`
- `apps/desktop/src/i18n/locales/pt-PT.json`
- `apps/desktop/src/i18n/locales/ja.json`
- `apps/desktop/src/i18n/locales/zh-CN.json`
- `apps/desktop/src/i18n/locales/zh-TW.json`
- `apps/desktop/src/i18n/locales/ru.json`
- `apps/desktop/src/i18n/locales/ko.json`

**Acceptance Criteria:**

**Given** the English locale file `en.json` exists
**When** I perform find-and-replace
**Then** all instances of "Voquill" are replaced with "Eloquio"
**And** message IDs are preserved (only values change)
**And** no other text is modified

**Given** all other locale files exist (fr, es, de, it, pt-BR, pt-PT, ja, zh-CN, zh-TW, ru, ko)
**When** I perform the same find-and-replace on each
**Then** "Voquill" becomes "Eloquio" in all files
**And** the structure of each JSON file is preserved

**Given** all locale files are updated
**When** I change the app language to French
**Then** UI strings show "Eloquio" (not "Voquill")
**And** all other localized text displays correctly

**Given** all locale files are updated
**When** I change the app language to Japanese
**Then** UI strings show "Eloquio" in appropriate contexts
**And** Japanese text renders correctly

**Given** all locale files are updated
**When** I run `npm run i18n:extract && npm run i18n:sync`
**Then** the i18n tooling completes without errors
**And** no message IDs are flagged as missing

---

## Epic 3: Local-Only Mode Experience

**Goal:** Streamline the settings interface to show only "Local" transcription mode, hiding API and Cloud options while preserving the underlying code for future enablement.

### Story 3.1: Analyze Settings Mode Selection Component

As a **developer**,
I want **to understand the current mode selection implementation in SettingsPage**,
So that **I can implement conditional rendering with minimal code changes**.

**Requirements:** FR27
**Files to analyze:**
- `apps/desktop/src/components/settings/SettingsPage.tsx`
- `apps/desktop/src/state/settings.state.ts`
- `apps/desktop/src/types/ai.types.ts`

**Acceptance Criteria:**

**Given** the SettingsPage component exists
**When** I analyze the mode selection UI
**Then** I identify the exact component/element rendering mode options (likely MUI Select or similar)
**And** I document the current structure in a code comment or tech note

**Given** the settings state exists
**When** I review `settings.state.ts`
**Then** I confirm the default mode value (should be 'local' or needs to be set)
**And** I understand how mode changes are persisted

**Given** the TranscriptionMode type exists in `ai.types.ts`
**When** I review the type definition
**Then** I confirm it includes: `'local' | 'api' | 'cloud'`
**And** I understand how the type is used throughout the codebase

---

### Story 3.2: Implement Conditional Mode Rendering

As a **developer**,
I want **the Settings page to show only "Local" mode option based on enterprise feature flags**,
So that **users see a focused interface without API/Cloud options**.

**Requirements:** FR28, AR3
**Files to modify:**
- `apps/desktop/src/components/settings/SettingsPage.tsx`

**Acceptance Criteria:**

**Given** the enterprise features config exists with `showApiMode: false` and `showCloudMode: false`
**When** I update SettingsPage.tsx
**Then** I import `ELOQUIO_FEATURES` from `@/enterprise/features`
**And** mode options are conditionally rendered:
```tsx
{ELOQUIO_FEATURES.transcriptionModes.includes('local') && (
  <MenuItem value="local">Local</MenuItem>
)}
{ELOQUIO_FEATURES.showApiMode && (
  <MenuItem value="api">API</MenuItem>
)}
{ELOQUIO_FEATURES.showCloudMode && (
  <MenuItem value="cloud">Cloud</MenuItem>
)}
```
**And** the modification is minimal (~10 lines changed)
**And** the underlying mode selection logic is unchanged

**Given** the conditional rendering is implemented
**When** I open the Settings page
**Then** only "Local" mode is visible
**And** API and Cloud options are not rendered in the DOM
**And** the mode selector may be hidden entirely if only one option exists

**Given** the conditional rendering is implemented
**When** I inspect the codebase
**Then** the API and Cloud mode implementation code is still present (not deleted)
**And** re-enabling modes only requires changing feature flags

---

### Story 3.3: Verify Local Mode Default and Create Validation Helper

As a **developer**,
I want **Local mode set as the default and a validation helper to prevent invalid mode selection**,
So that **new users start with Local mode and existing state can be validated**.

**Requirements:** FR29, FR30
**Files to modify/verify:**
- `apps/desktop/src/state/settings.state.ts`
- `apps/desktop/src/enterprise/features/flags.ts`

**Acceptance Criteria:**

**Given** the settings state has a default mode
**When** I verify `settings.state.ts`
**Then** the initial state has `mode: 'local'` as the default
**And** if it was different, I update it to 'local'

**Given** the enterprise features module exists
**When** I verify the `isAllowedMode()` function (from Story 1.3)
**Then** it correctly validates modes against `ELOQUIO_FEATURES.transcriptionModes`
**And** calling `isAllowedMode('api')` returns `false`
**And** calling `isAllowedMode('cloud')` returns `false`
**And** calling `isAllowedMode('local')` returns `true`

**Given** a user somehow has `mode: 'api'` in persisted state (from previous Voquill usage)
**When** the app loads with Eloquio enterprise features
**Then** the validation helper can be used to detect invalid mode
**And** (optionally) the mode can be reset to 'local' on load

**Given** all mode changes are implemented
**When** I run the existing test suite
**Then** tests pass (or are updated minimally to reflect new defaults)
**And** no regressions are introduced

---

## Epic 4: Marketing Site Launch

**Goal:** Completely rebrand and restructure the marketing site for enterprise positioning, emphasizing local-first security and replacing community features with B2B sales funnel.

**Key Changes from Voquill:**
- Security-first messaging (100% local, no data exchange)
- Remove Discord, add "Book a Call" CTA
- Add FAQ section
- Simplify pricing: Free Personal + Enterprise (contact us)
- Apply Eloquio visual identity (Cream/Sage palette)

### Story 4.1: Update Site Configuration and Apply Eloquio Theme

As a **developer**,
I want **site configuration updated and Eloquio visual identity applied**,
So that **the site reflects Eloquio branding from the foundation up**.

**Requirements:** FR31, FR32
**Files to modify:**
- `apps/web/package.json`
- `apps/web/index.html`
- `apps/web/src/styles/global.css`
- `apps/web/src/styles/page.module.css`

**Acceptance Criteria:**

**Given** `apps/web/package.json` exists
**When** I update the package identity
**Then** `"name"` is changed to `"eloquio-web"`
**And** `"description"` is "Enterprise voice-to-text. 100% local."

**Given** `index.html` exists
**When** I update the meta tags
**Then** `<title>` is "Eloquio"
**And** meta description is "Better AI prompts through voice. 100% local processing."
**And** canonical URL points to eloquio.com
**And** OG tags reference Eloquio branding

**Given** the CSS files exist
**When** I update the color variables
**Then** light mode uses Eloquio palette:
  - `--background: #F9F8F6` (Warm White)
  - `--foreground: #1A1615` (Charcoal)
  - `--level0: #F9F8F6`, `--level1: #F4E6DA` (Cream)
  - `--button-primary-bg: #A8C5A3` (Sage Green)
**And** dark mode adapts appropriately
**And** shadows use warm tones `rgba(69, 63, 61, X)`

---

### Story 4.2: Replace Site Branding Assets

As a **developer**,
I want **all visual assets replaced with Eloquio branding**,
So that **visitors see consistent Eloquio identity**.

**Requirements:** FR33
**Files to modify:**
- `apps/web/public/app-icon.svg`
- `apps/web/public/app-logo.svg`
- `apps/web/public/favicon.ico`
- `apps/web/public/social.jpg`

**Prerequisite:** Eloquio marketing assets must be prepared.

**Acceptance Criteria:**

**Given** Eloquio assets are available
**When** I replace files in `apps/web/public/`
**Then** favicon shows Eloquio icon
**And** logo files show Eloquio branding
**And** social.jpg shows Eloquio OG image for social sharing

**Given** the assets are replaced
**When** I view the site
**Then** browser tab shows Eloquio favicon
**And** social media previews show Eloquio branding

---

### Story 4.3: Rebuild Landing Page with Enterprise Messaging

As a **developer**,
I want **the landing page completely rebuilt with security-first enterprise messaging**,
So that **enterprises understand Eloquio's value proposition for secure AI workflows**.

**Requirements:** FR34, FR36
**Files to modify:**
- `apps/web/src/pages/HomePage.tsx` (or equivalent)
- `apps/web/src/components/hero/hero-section.tsx`
- `apps/web/src/components/privacy-showcase/` (enhance)
- `apps/web/src/components/video-section/` (keep YouTube embed)

**New Landing Page Structure:**
1. Hero Section (new messaging)
2. Video Section (keep YouTube - user will update later)
3. Speed Showcase (4x faster)
4. **Security Showcase (ENHANCED - primary focus)**
5. Use Cases (enterprise scenarios)
6. **FAQ Section (NEW)**
7. **Pricing Section (SIMPLIFIED)**
8. **Book a Call CTA (replaces Discord)**

**Acceptance Criteria:**

**Given** the hero section exists
**When** I update the content
**Then** headline emphasizes enterprise + security, e.g.:
  - "Your voice, your AI, your data."
  - "Better prompts. Zero data leaks."
**And** subheadline mentions: "100% local processing—we never see your data"
**And** primary CTA is "Download Free"
**And** secondary CTA is "Book a Demo"

**Given** the security showcase exists
**When** I enhance it
**Then** it prominently displays:
  - "100% Local Processing" headline
  - Explanation: "Your voice never leaves your device"
  - Benefits: No internet required, GDPR/HIPAA friendly, perfect for confidential work
**And** visual shows lock icon or local processing diagram

**Given** the video section exists
**When** I keep the YouTube embed
**Then** the embed structure is preserved (user will update video later)
**And** surrounding text references Eloquio

**Given** Discord section exists
**When** I replace it with Book a Call CTA
**Then** Discord link is removed
**And** new section has "Talk to Us" or "Book a Demo" heading
**And** CTA button links to Calendly/Cal.com booking page
**And** messaging targets enterprise buyers: "Let's discuss how Eloquio can help your team"

---

### Story 4.4: Add FAQ Section

As a **developer**,
I want **a new FAQ section added to the landing page**,
So that **visitors get answers to common questions about privacy and enterprise use**.

**Requirements:** FR36 (additional)
**Files to create/modify:**
- `apps/web/src/components/faq-section/` (NEW)
- `apps/web/src/pages/HomePage.tsx`

**Acceptance Criteria:**

**Given** the FAQ section needs to be created
**When** I create the component
**Then** it displays the following Q&As:

1. **"Is my data really private?"**
   > "Yes. Eloquio uses Whisper AI running entirely on your device. Your voice is transcribed locally—nothing is sent to external servers."

2. **"Do I need an internet connection?"**
   > "No. Core transcription works completely offline. Internet is only needed for downloading the app and optional updates."

3. **"What makes Eloquio different from other voice tools?"**
   > "Most voice tools send your audio to the cloud. Eloquio is 100% local, making it ideal for enterprises handling sensitive data."

4. **"Can I use Eloquio with any application?"**
   > "Yes. Eloquio works system-wide—type anywhere you can type: emails, documents, code editors, chat apps, and more."

5. **"Is there a free version?"**
   > "Yes. Personal use is free forever. Enterprise features require a subscription after a consultation call."

6. **"How do I get started with my team?"**
   > "Book a call with us and we'll help you deploy Eloquio across your organization."

**And** the FAQ uses accordion/expandable pattern
**And** styling matches Eloquio visual identity (Cream/Sage)

---

### Story 4.5: Simplify Pricing Section

As a **developer**,
I want **the pricing section simplified to Free Personal and Enterprise tiers**,
So that **enterprise leads are directed to book a call instead of self-serve checkout**.

**Requirements:** FR35
**Files to modify:**
- `apps/web/src/components/pricing-section/`

**Acceptance Criteria:**

**Given** the pricing section currently shows 3 tiers (Personal, Pro, Enterprise)
**When** I simplify to 2 tiers
**Then** the structure becomes:

| Plan | Price | Features | CTA |
|------|-------|----------|-----|
| **Personal** | Free | Local transcription, All languages, Unlimited use | "Download Free" |
| **Enterprise** | Contact Us | Priority support, Team deployment, Custom integration, Volume licensing | "Book a Call" |

**And** the Pro tier ($12/month) is removed
**And** the monthly/yearly toggle is removed (not needed)
**And** Enterprise CTA links to booking page (same as Story 4.3)

**Given** a visitor clicks "Book a Call"
**When** they are redirected
**Then** they arrive at a Calendly/Cal.com scheduling page

---

### Story 4.6: Update Navigation and Footer

As a **developer**,
I want **navigation and footer updated with Eloquio branding and correct links**,
So that **visitors can navigate the site with consistent branding**.

**Requirements:** FR37
**Files to modify:**
- `apps/web/src/components/site-header.tsx`
- `apps/web/src/components/site-footer.tsx`

**Acceptance Criteria:**

**Given** the header component exists
**When** I update it
**Then** logo text shows "Eloquio"
**And** navigation links are: Demo, Security, Pricing, FAQ
**And** GitHub button remains (if repo is public) or is removed
**And** primary CTA is "Download" button

**Given** the footer component exists
**When** I update it
**Then** copyright shows "Eloquio"
**And** Discord link is removed
**And** "Book a Demo" CTA is added
**And** legal links (Privacy, Terms) are preserved

**Given** navigation is updated
**When** I browse the site
**Then** all links work correctly
**And** FAQ anchor scrolls to FAQ section on homepage
**And** Security anchor scrolls to security showcase

---

## Epic 5: Documentation & Maintenance Readiness

**Goal:** Create comprehensive documentation enabling the development team to maintain Eloquio and confidently sync upstream Voquill changes.

### Story 5.1: Create White-Label Architecture Documentation

As a **developer**,
I want **documentation explaining the enterprise module architecture**,
So that **future developers understand how Eloquio customizations are isolated from Voquill core**.

**Requirements:** FR38
**Files to create:**
- `docs/eloquio-white-label.md`

**Acceptance Criteria:**

**Given** the enterprise module is implemented
**When** I create `docs/eloquio-white-label.md`
**Then** it documents:
  - Purpose of the `/src/enterprise/` module
  - Directory structure and file responsibilities
  - How to add new Eloquio-specific features
  - How theme overrides work
  - How feature flags control UI visibility
  - The principle of minimal core modifications

**Given** the documentation exists
**When** a new developer reads it
**Then** they understand where to add Eloquio-specific code
**And** they know NOT to modify core Voquill files unnecessarily

---

### Story 5.2: Create Upstream Sync Workflow Guide

As a **developer**,
I want **a step-by-step guide for syncing upstream Voquill changes**,
So that **the team can confidently pull updates without losing Eloquio customizations**.

**Requirements:** FR40, NFR6
**Files to create:**
- `docs/upstream-sync.md`

**Acceptance Criteria:**

**Given** the git branch strategy is established (main = upstream mirror, product/main = development)
**When** I create `docs/upstream-sync.md`
**Then** it documents:
  - Branch strategy explanation
  - Step-by-step upstream sync commands:
    ```bash
    git checkout main
    git fetch upstream
    git merge upstream/main
    git push origin main
    git checkout product/main
    git merge main
    # Resolve conflicts
    ```
  - Expected conflict zones (package.json, tauri.conf.json, Cargo.toml)
  - Conflict resolution strategy for each file
  - Post-merge testing checklist
  - Troubleshooting common issues

**Given** the documentation exists
**When** a developer follows it
**Then** they can successfully sync upstream changes
**And** Eloquio branding remains intact after merge

---

### Story 5.3: Update Existing Documentation and Create Environment Config

As a **developer**,
I want **existing docs updated with enterprise module references and optional env config created**,
So that **all documentation is consistent and development environments are easy to configure**.

**Requirements:** FR39, FR41, FR42
**Files to modify/create:**
- `docs/desktop-architecture.md`
- `AGENTS.md`
- `apps/desktop/.env.eloquio` (optional)

**Acceptance Criteria:**

**Given** `docs/desktop-architecture.md` exists
**When** I update it
**Then** a new section documents the enterprise module
**And** it references `docs/eloquio-white-label.md` for details
**And** existing architecture documentation remains accurate

**Given** `AGENTS.md` exists
**When** I update it
**Then** it includes Eloquio-specific conventions:
  - Use enterprise module for customizations
  - Don't modify core Voquill files
  - Follow upstream sync workflow for merges

**Given** environment configuration may be needed
**When** I create `apps/desktop/.env.eloquio` (if applicable)
**Then** it contains Eloquio-specific environment variables
**And** it's documented in the env.example or README
**And** it follows the existing flavor system (`getFlavor()`)

**Given** all documentation is updated
**When** I search the docs for "enterprise"
**Then** relevant information is findable
**And** the documentation is internally consistent
