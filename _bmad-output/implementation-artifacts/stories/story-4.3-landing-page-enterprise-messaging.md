# Story 4.3: Rebuild Landing Page with Enterprise Messaging

## Metadata
- **Epic:** 4 - Marketing Site Launch
- **Priority:** P1
- **Complexity:** High
- **Estimated effort:** 4-6 hours
- **Dependencies:** Story 4.1 (site config), Story 4.2 (assets)
- **Blocks:** None

## User Story
As a **developer**,
I want **the landing page completely rebuilt with security-first enterprise messaging**,
So that **enterprises understand Eloquio's value proposition for secure AI workflows**.

## Requirements Covered
- FR34: Update landing page with Eloquio hero section, taglines, and messaging
- FR36: Update all content pages with Eloquio branding

## Technical Specification

### Files to Modify

```
apps/web/src/
├── pages/
│   └── HomePage.tsx (or index.astro)
├── components/
│   ├── hero/
│   │   └── hero-section.tsx
│   ├── privacy-showcase/
│   │   └── (enhance existing)
│   ├── video-section/
│   │   └── (keep YouTube embed structure)
│   ├── faq-section/
│   │   └── (NEW - Story 4.4)
│   ├── pricing-section/
│   │   └── (modify - Story 4.5)
│   └── cta-section/
│       └── (NEW - Book a Call)
```

### New Page Structure

```
┌────────────────────────────────────────────┐
│  HEADER (nav with Eloquio logo)            │
├────────────────────────────────────────────┤
│  1. HERO SECTION                           │
│     - Headline: Security-first messaging   │
│     - Subheadline: 100% local processing   │
│     - CTAs: Download Free / Book a Demo    │
├────────────────────────────────────────────┤
│  2. VIDEO SECTION                          │
│     - YouTube embed (placeholder for now)  │
├────────────────────────────────────────────┤
│  3. SPEED SHOWCASE                         │
│     - "4x faster than typing"              │
│     - Keep existing structure              │
├────────────────────────────────────────────┤
│  4. SECURITY SHOWCASE (ENHANCED)           │
│     - "100% Local Processing"              │
│     - Lock icon / diagram                  │
│     - Key benefits list                    │
├────────────────────────────────────────────┤
│  5. USE CASES                              │
│     - Enterprise scenarios                 │
│     - Developers, Legal, Healthcare, etc.  │
├────────────────────────────────────────────┤
│  6. FAQ SECTION (NEW - Story 4.4)          │
├────────────────────────────────────────────┤
│  7. PRICING (SIMPLIFIED - Story 4.5)       │
│     - Free Personal                        │
│     - Enterprise (Contact Us)              │
├────────────────────────────────────────────┤
│  8. BOOK A CALL CTA (replaces Discord)     │
│     - "Let's discuss your team's needs"    │
│     - Calendar booking link                │
├────────────────────────────────────────────┤
│  FOOTER                                    │
└────────────────────────────────────────────┘
```

### Implementation Details

#### 1. Hero Section Content

```tsx
// apps/web/src/components/hero/hero-section.tsx

export const HeroSection = () => {
  return (
    <section className={styles.hero}>
      {/* Badge */}
      <div className={styles.badge}>
        Enterprise Voice-to-Text
      </div>

      {/* Headline - Security First */}
      <h1 className={styles.headline}>
        Your voice, your AI,<br />
        <span className={styles.accent}>your data.</span>
      </h1>

      {/* Alternative headlines to test:
        - "Better prompts. Zero data leaks."
        - "Enterprise AI dictation. 100% local."
        - "Speak to AI. Keep your secrets."
      */}

      {/* Subheadline */}
      <p className={styles.subheadline}>
        Speak to AI 4x faster than typing. All processing happens
        on your device—we never see your data.
      </p>

      {/* CTAs */}
      <div className={styles.ctas}>
        <a href="/download" className={styles.primaryCta}>
          Download Free
        </a>
        <a href="https://cal.com/eloquio/demo" className={styles.secondaryCta}>
          Book a Demo
        </a>
      </div>

      {/* Trust indicators */}
      <div className={styles.trust}>
        <span>✓ 100% Local</span>
        <span>✓ No Account Required</span>
        <span>✓ macOS · Windows · Linux</span>
      </div>
    </section>
  );
};
```

#### 2. Security Showcase (Enhanced)

```tsx
// apps/web/src/components/security-showcase/security-showcase.tsx

export const SecurityShowcase = () => {
  return (
    <section className={styles.security}>
      {/* Icon */}
      <div className={styles.icon}>
        🔒
      </div>

      {/* Headline */}
      <h2 className={styles.headline}>
        100% Local Processing
      </h2>

      {/* Explanation */}
      <p className={styles.description}>
        Your voice never leaves your device. Eloquio processes everything
        locally using Whisper AI. No cloud. No data transmission. No risk.
      </p>

      {/* Benefits Grid */}
      <div className={styles.benefits}>
        <div className={styles.benefit}>
          <span className={styles.checkmark}>✓</span>
          <div>
            <strong>No internet required</strong>
            <p>Works completely offline after installation</p>
          </div>
        </div>

        <div className={styles.benefit}>
          <span className={styles.checkmark}>✓</span>
          <div>
            <strong>GDPR/HIPAA friendly</strong>
            <p>Data never leaves your control</p>
          </div>
        </div>

        <div className={styles.benefit}>
          <span className={styles.checkmark}>✓</span>
          <div>
            <strong>Perfect for confidential work</strong>
            <p>Legal, medical, financial—all protected</p>
          </div>
        </div>
      </div>

      {/* Visual diagram (optional) */}
      <div className={styles.diagram}>
        {/* Simple illustration showing:
            [Your Voice] → [Your Device] → [Your Text]
            with "No Cloud" crossed out */}
      </div>
    </section>
  );
};
```

#### 3. Book a Call CTA (Replaces Discord)

```tsx
// apps/web/src/components/cta-section/book-call-section.tsx

export const BookCallSection = () => {
  return (
    <section className={styles.bookCall}>
      <h2 className={styles.headline}>
        Ready to bring Eloquio to your team?
      </h2>

      <p className={styles.description}>
        Let's discuss how Eloquio can help your organization
        work faster while keeping data secure.
      </p>

      <a
        href="https://cal.com/eloquio/demo"
        className={styles.cta}
        target="_blank"
        rel="noopener noreferrer"
      >
        Book a Call
      </a>

      <p className={styles.note}>
        Free consultation · No commitment · 15 minutes
      </p>
    </section>
  );
};
```

#### 4. Remove Discord References

**Search and remove:**
```bash
grep -r "discord" apps/web/src/
```

Replace any Discord links/buttons with "Book a Call" CTA.

### Content Changes Summary

| Section | Before (Voquill) | After (Eloquio) |
|---------|------------------|-----------------|
| **Badge** | "Open Source" | "Enterprise Voice-to-Text" |
| **Headline** | Speed-focused | Security-focused |
| **Subheadline** | Feature list | Privacy promise |
| **Primary CTA** | "Get Started" | "Download Free" |
| **Secondary CTA** | "View on GitHub" | "Book a Demo" |
| **Community** | Discord link | Book a Call |
| **Trust indicators** | Star count | Local · No Account · Platforms |

## Acceptance Criteria

### AC1: Hero Updated
```gherkin
Given the hero section exists
When I update the content
Then headline emphasizes security (e.g., "Your voice, your AI, your data")
And subheadline mentions "100% local processing"
And primary CTA is "Download Free"
And secondary CTA is "Book a Demo" linking to booking page
```

### AC2: Security Showcase Enhanced
```gherkin
Given the privacy/security section exists
When I enhance it
Then it prominently displays "100% Local Processing"
And lists benefits: No internet required, GDPR/HIPAA friendly, Confidential work
And includes a visual element (icon or diagram)
```

### AC3: Discord Removed
```gherkin
Given Discord links exist
When I replace them with Book a Call
Then no Discord references remain on the site
And "Book a Call" links to the booking page
And messaging is enterprise-focused
```

### AC4: Video Section Preserved
```gherkin
Given the video section exists
When I update surrounding content
Then the YouTube embed structure is preserved
And surrounding text references "Eloquio" (not "Voquill")
And the user can update the video later without code changes
```

### AC5: Visual Identity Applied
```gherkin
Given the Eloquio color palette is defined
When I view the landing page
Then backgrounds use warm neutrals (Cream, Warm White)
And accent color is Sage Green
And typography is clean and enterprise-appropriate
```

## Verification Steps

```bash
# 1. Make changes
cd apps/web

# 2. Run dev server
npm run dev

# 3. Visual inspection checklist:
# - [ ] Hero shows security-focused messaging
# - [ ] "Download Free" and "Book a Demo" CTAs visible
# - [ ] Security showcase prominent with benefits
# - [ ] No Discord links anywhere
# - [ ] "Book a Call" CTA at bottom
# - [ ] Colors match Eloquio palette
# - [ ] Video section intact (YouTube embed works)

# 4. Check for Discord references
grep -ri "discord" src/
# Should return empty
```

## Content Guidelines

### Tone
- Professional, not playful
- Confident, not boastful
- Clear, not jargon-heavy
- Security-conscious, not fear-mongering

### Keywords to Use
- "Local processing"
- "On your device"
- "100% private"
- "Enterprise-grade"
- "Confidential"
- "Secure"

### Keywords to Avoid
- "Cloud" (except to say "No cloud")
- "Free trial" (it's free forever for personal)
- "Open source" (unless relevant to Eloquio)
- "Community" (enterprise focus)

## Notes for Developer

- The video section can keep a placeholder or existing Voquill video for now
- User will update with Eloquio video later
- Booking URL (cal.com/eloquio/demo) is placeholder - update when ready
- Mobile responsiveness important for landing page
- Test all CTAs link correctly before deployment
