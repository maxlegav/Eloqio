# Eloquio - UX & Targeting Strategy

**Generated:** 2026-01-29
**Status:** Approved by Max

---

## 1. USER TARGETING

### Primary Audience

**Enterprises integrating AI into their workflows**

| Segment | Description |
|---------|-------------|
| **Developers** | Teams using AI for code reviews, documentation, commit messages |
| **Knowledge Workers** | Managers, analysts, consultants creating reports and emails |
| **Creative Teams** | Writers, marketers crafting content with AI assistance |
| **All Industries** | Any business leveraging AI prompts in daily work |

### Core Insight

> "Aujourd'hui tout le monde utilise l'IA, tout le monde fait des prompts et tout le monde obtient de meilleurs prompts en parlant plutôt qu'en écrivant."

**Why voice beats typing for AI prompts:**
- **Plus clair** - Speaking naturally produces clearer instructions
- **Plus structuré** - Verbal explanations follow logical structure
- **Plus de détails** - People elaborate more when speaking
- **Plus rapide** - 4x faster than typing

### Value Proposition

**"Transform how your team talks to AI"**

Eloquio enables enterprises to:
1. Create better AI prompts through voice
2. Work faster without sacrificing quality
3. Keep all data 100% local and secure
4. Integrate seamlessly into existing workflows

---

## 2. DESKTOP APP UX

### Visual Overhaul Strategy

**Principle:** Complete visual transformation while keeping functionality intact.

#### What Changes (Visual)
- **Theme:** New warm palette (Cream Base, Sage Green accents)
- **Typography:** Inter + Clash Display fonts
- **Onboarding:** Completely redesigned UI flow
- **All screens:** Updated with Eloquio visual identity
- **Icons & Logo:** Full rebrand

#### What Stays (Functional)
- All 3 transcription modes remain in codebase (local/api/cloud)
- All features remain functional
- Only **Local mode visible in UI** for MVP
- Architecture unchanged for easy future enablement

### Mode Visibility Strategy

```
┌─────────────────────────────────────────┐
│  UI Layer (what users see)              │
│  ├─ Local Mode ✓ (visible, default)     │
│  ├─ API Mode ✗ (hidden, functional)     │
│  └─ Cloud Mode ✗ (hidden, functional)   │
└─────────────────────────────────────────┘
```

**Implementation:** Feature flags hide UI elements, code remains intact.

### Onboarding Redesign

**Current Voquill Onboarding:**
1. Welcome screen
2. Microphone permission (with video)
3. Accessibility permission (with video)
4. Setup complete

**Eloquio Onboarding (same steps, new visual style):**
1. Welcome to Eloquio (warm cream background, sage accents)
2. Microphone access (redesigned UI, same permission flow)
3. Accessibility access (redesigned UI, same permission flow)
4. Ready to go (enterprise-focused messaging)

**Key principle:** Same functionality, completely different look & feel.

### Design System Interchangeability

**Structure for easy style swapping:**

```
enterprise/branding/
├── theme.ts           # MUI theme overrides
├── colors.ts          # Color palette constants
├── typography.ts      # Font configurations
└── index.ts           # Central exports
```

**Usage in components:**
```typescript
// Import from enterprise module
import { eloquioTheme } from '@/enterprise/branding';

// Apply as override to base theme
const theme = createTheme(deepmerge(baseTheme, eloquioTheme));
```

**Benefit:** To change the entire look, update only the enterprise module.

---

## 3. MARKETING SITE UX

### Messaging Strategy

**Primary Message:**
> "Work faster with AI, keep everything secure"

**Key Points to Emphasize:**

1. **Speed:** Voice prompts are 4x faster and produce better results
2. **Security:** 100% local processing, no data leaves the device
3. **Privacy:** Eloquio never sees or stores what you say
4. **Enterprise-ready:** Built for teams who handle sensitive information

### Site Structure (Redesigned)

```
eloquio.com/
├── / (Home)
│   ├── Hero Section
│   ├── Video Demo (YouTube - placeholder)
│   ├── Speed Showcase
│   ├── Security Showcase (emphasize local)
│   ├── Use Cases (enterprise scenarios)
│   ├── FAQ Section (NEW)
│   ├── Pricing Section
│   └── CTA: Book a Call
├── /download
├── /privacy
└── /terms
```

### Hero Section

**Headline Options:**
- "Your voice, your AI, your data."
- "Better prompts. Zero data leaks."
- "Enterprise AI dictation. 100% local."

**Subheadline:**
> "Speak to AI 4x faster than typing. All processing happens on your device—we never see your data."

**CTAs:**
- Primary: "Download Free" (desktop platforms)
- Secondary: "Book a Demo" (for enterprises)

### Security Showcase (NEW - Emphasized)

**Visual:** Lock icon + local processing diagram

**Messaging:**
```
┌─────────────────────────────────────────────────────┐
│  🔒 100% Local Processing                           │
│                                                     │
│  "Your voice never leaves your device.              │
│   Eloquio processes everything locally using        │
│   Whisper AI. No cloud. No data transmission.       │
│   No risk."                                         │
│                                                     │
│  ✓ No internet required for transcription           │
│  ✓ GDPR/HIPAA friendly by design                   │
│  ✓ Perfect for confidential work                   │
└─────────────────────────────────────────────────────┘
```

### FAQ Section (NEW)

**Questions to include:**

1. **"Is my data really private?"**
   > Yes. Eloquio uses Whisper AI running entirely on your device. Your voice is transcribed locally—nothing is sent to external servers.

2. **"Do I need an internet connection?"**
   > No. Core transcription works completely offline. Internet is only needed for downloading the app and optional updates.

3. **"What makes Eloquio different from other voice tools?"**
   > Most voice tools send your audio to the cloud. Eloquio is 100% local, making it ideal for enterprises handling sensitive data.

4. **"Can I use Eloquio with any application?"**
   > Yes. Eloquio works system-wide—type anywhere you can type: emails, documents, code editors, chat apps, and more.

5. **"Is there a free version?"**
   > Yes. Personal use is free forever. Enterprise features require a subscription after a consultation call.

6. **"How do I get started with my team?"**
   > Book a call with us and we'll help you deploy Eloquio across your organization.

### Pricing Section (Simplified)

| Plan | Price | Features |
|------|-------|----------|
| **Personal** | Free | Local transcription, All languages, Unlimited use |
| **Enterprise** | Contact Us | Priority support, Team deployment, Custom integration, Volume licensing |

**Enterprise CTA:** "Book a Call" → Calendly/Cal.com link

### Removed Elements

- ❌ Discord community link
- ❌ Pro tier ($12/month)
- ❌ Open-source messaging (if not relevant)
- ❌ WisprFlow comparison

### Added Elements

- ✅ FAQ section
- ✅ Book a call CTA (replace Discord)
- ✅ Enterprise-focused use cases
- ✅ Security/privacy emphasis
- ✅ GDPR/HIPAA friendly messaging

---

## 4. VISUAL IDENTITY SUMMARY

### Color Palette

**Primary (Warm Neutrals):**
| Name | Hex | Usage |
|------|-----|-------|
| Cream Base | `#F4E6DA` | Primary backgrounds, cards |
| Warm White | `#F9F8F6` | Main app background |
| Soft Gray | `#E4E2E0` | Dividers, secondary backgrounds |
| Charcoal | `#1A1615` | Primary text |

**Accent (Sage Green):**
| Name | Hex | Usage |
|------|-----|-------|
| Sage Green | `#A8C5A3` | CTAs, links, primary accent |
| Sage Light | `#C8DCC4` | Hover states |
| Sage Dark | `#88A584` | Active states |

**Semantic:**
| Name | Hex | Usage |
|------|-----|-------|
| Success | `#A8C5A3` | Success messages |
| Warning | `#E8C9A0` | Warnings |
| Error | `#D4A59A` | Errors |
| Info | `#A8B5C5` | Information |

### Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 Hero | Clash Display | 64px | 600 |
| H2 Section | Clash Display | 48px | 600 |
| H3 Subsection | Clash Display | 32px | 600 |
| Body | Inter | 16px | 400 |
| Button | Inter | 16px | 600 |
| Caption | Inter | 12px | 500 |

### Shadows (Warm-toned)

```css
/* Soft elevation */
box-shadow: 0 4px 20px rgba(69, 63, 61, 0.08);

/* Medium elevation */
box-shadow: 0 8px 32px rgba(69, 63, 61, 0.12);

/* High elevation */
box-shadow: 0 16px 48px rgba(69, 63, 61, 0.16);
```

---

## 5. IMPLEMENTATION PRIORITIES

### Phase 1: Foundation (Epic 1)
- Enterprise module structure
- Theme system with new palette
- Feature flags for mode visibility

### Phase 2: Desktop Branding (Epic 2)
- Apply new theme across all screens
- Replace all assets with Eloquio branding
- Update all locale files

### Phase 3: Mode Hiding (Epic 3)
- Hide API/Cloud from UI
- Keep functionality intact

### Phase 4: Marketing Site (Epic 4)
- Complete visual redesign
- New messaging (enterprise, security)
- Add FAQ section
- Add booking CTA (replace Discord)
- Simplified pricing (Free / Enterprise)

### Phase 5: Documentation (Epic 5)
- Document all changes
- Upstream sync guide

---

## 6. KEY DECISIONS SUMMARY

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Target audience | Enterprises | B2B focus, higher value |
| Mode visibility | Local only in UI | Simplicity for MVP, others available later |
| Visual style | Warm palette (Cream/Sage) | Sophisticated, calming, enterprise-appropriate |
| Site messaging | Security-first | Differentiator for enterprise buyers |
| Pricing | Free + Enterprise (contact) | Qualify leads through calls |
| Community | Book a call (no Discord) | B2B sales funnel |
| Functionality | All modes preserved | Easy future enablement |
