# Eloqio Codebase Analysis

**Generated:** 2026-01-28
**Purpose:** Deep understanding of Voquill codebase for white-label to Eloquio

---

## 1. MONOREPO STRUCTURE

### Root Configuration

```
Eloqio/
├── package.json          # name: "voquill", workspaces config
├── turbo.json            # Turborepo: concurrency 15, task caching
├── apps/
│   ├── desktop/          # Tauri app (main product)
│   ├── web/              # React SPA marketing site
│   └── firebase/         # Cloud Functions backend
├── packages/             # 9 shared packages
├── docs/                 # Architecture documentation
├── CLAUDE.md             # AI agent instructions
└── AGENTS.md             # Development conventions
```

### Shared Packages

| Package | Purpose | Key Exports |
|---------|---------|-------------|
| `@repo/types` | Domain models | `TranscriptionMode`, `User`, `Transcription`, `Tone`, `Term` |
| `@repo/voice-ai` | AI transcription | Groq, OpenAI, Azure, Gemini clients |
| `@repo/functions` | Firebase helpers | Callable function utilities |
| `@repo/utilities` | Shared utils | Pure functions |
| `@repo/ui` | React components | Shared UI components |
| `@repo/firemix` | Firebase wrapper | Firestore utilities |
| `@repo/pricing` | Pricing logic | Tier calculations |

### Key Type Definitions

```typescript
// From @repo/types/src/common.types.ts
type TranscriptionMode = "local" | "api" | "cloud";
type PostProcessingMode = "none" | "api" | "cloud";
type AgentMode = "none" | "api" | "cloud";

// Defaults (from apps/desktop/src/types/ai.types.ts)
DEFAULT_TRANSCRIPTION_MODE = "local"
DEFAULT_POST_PROCESSING_MODE = "none"
DEFAULT_AGENT_MODE = "none"
DEFAULT_MODEL_SIZE = "base"
```

---

## 2. DESKTOP APP FRONTEND

### Directory Structure

```
apps/desktop/src/
├── main.tsx              # Entry point (Firebase, theme, i18n init)
├── router.tsx            # React Router v6 config
├── theme.ts              # MUI v6 theme (337 lines)
├── actions/              # Business logic orchestration (18 files)
├── repos/                # Data access abstraction (18 files)
├── store/index.ts        # Zustand setup with Immer
├── state/                # State slices (12 files)
├── components/           # React components (19 folders)
├── utils/                # Pure functions (36+ files)
├── types/                # App-specific types (16 files)
├── i18n/                 # Internationalization
│   ├── config.ts         # 10 supported locales
│   ├── intl.ts           # react-intl setup
│   └── locales/          # JSON translation files
└── assets/               # Logo, videos, icons
```

### Component Organization

| Folder | Purpose | Key Files |
|--------|---------|-----------|
| `/settings/` | Settings pages (18 components) | `SettingsPage.tsx`, `AITranscriptionConfiguration.tsx` |
| `/home/` | Main dashboard | `HomePage.tsx` |
| `/overlay/` | Recording overlay | `UnifiedOverlayRoot.tsx`, `WaveformSection.tsx` |
| `/onboarding/` | First-run flow (11 components) | Welcome, permissions, setup |
| `/common/` | Reusable components (35+) | `SegmentedControl`, `ListTile`, `Section` |
| `/transcriptions/` | History list | Transcription display |
| `/dictionary/` | Term management | Glossary and replacements |
| `/tones/` | Prompt templates | Tone editor |

### Settings Architecture (CRITICAL FOR MODE HIDING)

**File:** `components/settings/AITranscriptionConfiguration.tsx`

```tsx
// Current mode selection uses SegmentedControl
<SegmentedControl<TranscriptionMode>
  value={transcription.mode}
  onChange={handleModeChange}
  options={[
    { value: "cloud", label: "Voquill" },  // <-- To hide
    { value: "api", label: "API" },         // <-- To hide
    { value: "local", label: "Local" },     // <-- Keep visible
  ]}
/>
```

**Pattern:** Uses `maybeArrayElements()` helper for conditional rendering:
```typescript
maybeArrayElements<SegmentedControlOption>(
  !hideCloudOption,
  [{ value: "cloud", label: "Voquill" }]
)
```

### Theme System

**File:** `apps/desktop/src/theme.ts`

**Architecture:**
- MUI v6 with CSS Variables (`cssVarPrefix: "app"`)
- Light and Dark modes
- Custom button variants: `flat`, `blue`
- Roboto font family
- No shadows (all "none")
- Border radius: 12px

**Current Color Palette:**

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| `primary.main` | `#12151C` | `#FFFFFF` |
| `blue` | `#1b8af8` | `#3198ff` |
| `level0` (bg) | `#FFFFFF` | `#121212` |
| `level1` (surface) | `#F5F5F5` | `#1C1C1C` |
| `level2` | `#E0E0E0` | `#2D2D2D` |

**Eloquio Target Palette:**

| Token | Value | CSS Variable |
|-------|-------|--------------|
| Cream Base | `#F4E6DA` | `--eloquio-cream` |
| Warm White | `#F9F8F6` | `--eloquio-white` |
| Sage Green | `#A8C5A3` | `--eloquio-accent` |
| Charcoal | `#1A1615` | `--eloquio-text` |

### State Management

**File:** `apps/desktop/src/store/index.ts`

```typescript
// Zustand with Immer
import { createWithEqualityFn } from 'zustand/traditional';
import { isEqual } from 'lodash-es';

const useAppStore = createWithEqualityFn<AppState>(() => INITIAL_APP_STATE, isEqual);
export { useAppStore, produceAppState, setAppState, getAppState };
```

**Root State Structure:**
```typescript
AppState = {
  // Session
  initialized: boolean;
  auth: Nullable<AuthUser>;
  overlayPhase: "idle" | "listening" | "processing";

  // Entity Maps (normalized)
  userById: Record<string, User>;
  transcriptionById: Record<string, Transcription>;
  toneById: Record<string, Tone>;
  termById: Record<string, Term>;
  apiKeyById: Record<string, ApiKey>;
  hotkeyById: Record<string, Hotkey>;

  // Feature Slices
  settings: SettingsState;      // <-- Mode selection lives here
  onboarding: OnboardingState;
  transcriptions: TranscriptionsState;
  // ... 9 more slices
}
```

**Settings State (key for mode hiding):**
```typescript
SettingsState = {
  aiTranscription: {
    mode: TranscriptionMode;           // "local" | "api" | "cloud"
    modelSize: string;                 // "tiny" | "base" | "small" | "medium"
    device: string;                    // "cpu" or "gpu-{index}"
    selectedApiKeyId: string | null;
  };
  aiPostProcessing: {
    mode: PostProcessingMode;          // "none" | "api" | "cloud"
    selectedApiKeyId: string | null;
  };
  agentMode: {
    mode: AgentMode;                   // "none" | "api" | "cloud"
    selectedApiKeyId: string | null;
  };
}
```

### Internationalization

**Supported Locales:** 10
- en (English) - Default
- es, fr, de, it, pt, pt-BR (European)
- zh-TW, zh-CN, ko (Asian)

**"Voquill" References in en.json (sample):**
```json
"voquill_cloud": "Voquill Cloud",
"use_voquill_cloud": "Use Voquill Cloud",
"voquill_version": "Voquill {version}",
"voquill_is_an_ai_dictation_tool_it_needs_microphone_and_acce": "Voquill is an AI dictation tool...",
"allows_voquill_to_capture_audio_from_your_microphone": "Allows Voquill to capture audio...",
"a_voquill_update": "A Voquill update"
```

**i18n Pattern:**
```tsx
<FormattedMessage defaultMessage="Your text here" />
// No ID prop - messages auto-extract via babel plugin
```

### Assets

```
assets/
├── app-logo.svg         # Voquill logo (686 bytes)
├── discord.svg          # Discord icon
├── enable-a11y.mp4      # Accessibility permission video
├── enable-mic.mp4       # Microphone permission video
└── react.svg            # Dev reference
```

---

## 3. TAURI BACKEND (RUST)

### Configuration Files

**5 Environment Configs:**

| File | Product Name | Identifier | Use Case |
|------|--------------|------------|----------|
| `tauri.conf.json` | Voquill | com.voquill.desktop | Base config |
| `tauri.prod.conf.json` | Voquill | com.voquill.desktop | Production |
| `tauri.dev.conf.json` | Voquill (dev) | com.voquill.desktop.dev | Development |
| `tauri.local.conf.json` | Voquill (local) | com.voquill.desktop.local | Local testing |
| `tauri.gpu.prod.conf.json` | Voquill GPU | com.voquill.desktop.gpu | GPU production |

**Key Settings in tauri.conf.json:**
```json
{
  "productName": "Voquill",
  "identifier": "com.voquill.desktop",
  "build": { "frontendDist": "../dist" },
  "app": {
    "windows": [{ "title": "Voquill", "width": 900, "height": 610 }]
  },
  "plugins": {
    "sql": { "preload": ["sqlite:voquill.db"] }
  }
}
```

**Cargo.toml:**
```toml
[package]
name = "Voquill"
version = "0.1.0"
description = "AI voice dictation"
authors = ["you"]
edition = "2021"

[lib]
name = "desktop_lib"  # Prevents Windows naming conflicts
```

### Icons Directory

**Total: 50 icon files**

| Category | Files | Formats |
|----------|-------|---------|
| Standard | 7 | icon.png, icon.icns, icon.ico, 32x32, 64x64, 128x128, 128x128@2x |
| Windows Store | 14 | Square30x30 to Square310x310, StoreLogo |
| Android | 18 | mipmap folders (mdpi to xxxhdpi) |
| iOS | 16 | AppIcon 20x20 to 512@2x |
| Tray | 1 | menu-item-36.png |

### Hardcoded Branding in Rust

| File | String | Location |
|------|--------|----------|
| `main.rs:28` | "=== Voquill Startup ===" | Startup log |
| `diagnostics.rs:18` | "=== Voquill Startup Diagnostics ===" | Diagnostics |
| `tray.rs:18` | "Quit Voquill" | Tray menu |
| `tray.rs:32` | "Voquill" | Tray tooltip |

### Tauri Commands (50+)

**Settings-Related:**
- `user_preferences_get(user_id)` / `user_preferences_set(preferences)`
- `app_target_upsert()` / `app_target_list()`

**Transcription:**
- `transcribe_audio()` - Local Whisper inference
- `transcription_create()` / `transcription_list()` / `transcription_update()`

**System:**
- `start_recording()` / `stop_recording()`
- `list_microphones()` / `list_gpus()`
- `check_microphone_permission()` / `request_microphone_permission()`
- `set_tray_title(title: Option<String>)` - Dynamic tray title

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `VOQUILL_DESKTOP_PLATFORM` | Override platform detection |
| `VOQUILL_WHISPER_DISABLE_GPU` | Force CPU-only inference |
| `VOQUILL_ENABLE_DEVTOOLS` | Auto-open DevTools |
| `VOQUILL_API_KEY_SECRET` | HMAC-SHA256 for key encryption |
| `VOQUILL_GOOGLE_CLIENT_ID` | OAuth configuration |

---

## 4. MARKETING SITE (apps/web)

### Tech Stack

- **Framework:** React 19.1 + React Router v6
- **Build:** Vite
- **Styling:** CSS Modules (no Tailwind)
- **Font:** Geist Variable Font
- **Analytics:** Mixpanel
- **i18n:** React Intl (10 locales)

### Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `HomePage.tsx` | Landing with 8 sections |
| `/download` | `DownloadPage.tsx` | Multi-platform downloads |
| `/privacy` | `PrivacyPage.tsx` | Privacy policy |
| `/terms` | `TermsPage.tsx` | Terms of service |

### Landing Page Sections

1. **HeroSection** - "Your keyboard is holding you back"
2. **VideoSection** - YouTube demo embed
3. **AppsCarousel** - 30+ compatible apps showcase
4. **SpeedShowcase** - 4x faster typing claim
5. **PrivacyShowcase** - Local-first messaging
6. **TextCleanupShowcase** - AI cleanup animation
7. **OfflineShowcase** - Offline capability
8. **PricingSection** - Personal (free), Pro ($12/mo), Enterprise
9. **DiscordSection** - Community CTA

### Key Components

**Navigation (`site-header.tsx`):**
- Logo: "Voquill"
- Links: Demo, Purpose, Security, Pricing
- CTAs: GitHub button, Download button

**Download Button (`download-button.tsx`):**
- Platform auto-detection (macOS/Windows/Linux)
- Fetches latest from GitHub API
- Supports GPU variants
- Mobile: "iOS/Android coming soon"

### Assets (public/)

```
public/
├── app-icon.svg          # Main app icon
├── app-logo.svg          # Logo variant
├── favicon.ico           # Browser favicon
├── social.jpg            # OG image (101KB)
├── apple.svg, windows.svg, ubuntu.svg  # Platform icons
├── docs.png, notion.png, slack.png, vscode.png  # App screenshots
└── fonts/GeistVF.woff    # Variable font
```

### Styling

**Color Variables (CSS Modules):**
```css
/* Light mode */
--background: #ffffff;
--foreground: #12151c;
--level0: #ffffff;
--level1: #f5f5f5;
--text-strong: #12151c;
--button-primary-bg: #12151c;

/* Dark mode */
--background: #121212;
--foreground: #ffffff;
--level0: #121212;
--level1: #1c1c1c;
```

### "Voquill" References

1. HTML `<title>Voquill</title>`
2. Meta description: "Type four times faster..."
3. Logo text in header
4. Hero: "Voquill is the open-source alternative to WisprFlow"
5. Pricing: "Full power with cloud transcription"
6. Contact: hello@voquill.com
7. GitHub: github.com/josiahsrc/voquill

---

## 5. BRANDING TOUCHPOINTS SUMMARY

### Files Requiring Changes

**Configuration (will conflict on upstream merge):**
- `package.json` (root) - name field
- `apps/desktop/package.json` - name, productName
- `apps/desktop/src-tauri/tauri.conf.json` - productName, identifier, title
- `apps/desktop/src-tauri/Cargo.toml` - name, description
- `apps/web/package.json` - name

**Theme/Styling:**
- `apps/desktop/src/theme.ts` - Color palette
- `apps/web/src/styles/global.css` - CSS variables
- `apps/web/src/styles/page.module.css` - Theme tokens

**Assets (binary replacement):**
- `apps/desktop/src/assets/app-logo.svg`
- `apps/desktop/src-tauri/icons/*` (50 files)
- `apps/web/public/*` (logos, favicon, social)

**Localization (10 files):**
- `apps/desktop/src/i18n/locales/*.json`

**Documentation:**
- `CLAUDE.md`
- `README.md`
- `docs/desktop-architecture.md`

**Rust Hardcoded (4 locations):**
- `main.rs` - Startup log
- `diagnostics.rs` - Diagnostics header
- `tray.rs` - Menu item and tooltip

### Enterprise Module Location

**Proposed:** `apps/desktop/src/enterprise/`

This directory doesn't exist in upstream, so all files here will never conflict.

---

## 6. DATA FLOW ARCHITECTURE

```
User Action (click, hotkey)
    ↓
React Component (event handler)
    ↓
Action Function (actions/*.ts)
    ↓
Repository (repos/*.ts)
    ├── LocalXxxRepo → invoke("tauri_command") → Rust → SQLite
    └── CloudXxxRepo → Firebase SDK → Firestore
    ↓
State Update (produceAppState)
    ↓
React Re-render (useAppStore selector)
```

**Key Insight:** All business logic is in TypeScript. Rust only provides native APIs.

---

## 7. MODE HIDING STRATEGY

### Current Implementation

**File:** `components/settings/AITranscriptionConfiguration.tsx`

The mode selector uses `SegmentedControl` with 3 options.
The `hideCloudOption` prop already exists for onboarding context.

### Proposed Change

1. Create `enterprise/features/flags.ts`:
```typescript
export const ELOQUIO_FEATURES = {
  showCloudMode: false,
  showApiMode: false,
  transcriptionModes: ['local'] as const,
};
```

2. Modify `AITranscriptionConfiguration.tsx`:
```typescript
import { ELOQUIO_FEATURES } from '@/enterprise/features';

const options = [
  ...maybeArrayElements(!ELOQUIO_FEATURES.showCloudMode, [
    { value: "cloud", label: "Eloquio" }
  ]),
  ...maybeArrayElements(!ELOQUIO_FEATURES.showApiMode, [
    { value: "api", label: "API" }
  ]),
  { value: "local", label: "Local" },
];
```

**Lines changed:** ~5-10 in one file (minimal core modification).
