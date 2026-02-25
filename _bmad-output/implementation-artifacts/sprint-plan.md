# Eloquio MVP - Sprint Plan

## Sprint Goal
Transform Voquill into Eloquio with complete branding, local-only mode visibility, and enterprise-focused marketing site.

## Sprint Duration
5 working days (adjustable based on team size)

---

## Day 1: Foundation & Core Branding

### Morning (4h)
| Story | Task | Owner | Status |
|-------|------|-------|--------|
| 1.1 | Create enterprise module structure | - | ⬜ |
| 1.2 | Create config module with brand values | - | ⬜ |
| 1.3 | Create features config with mode flags | - | ⬜ |
| 1.4 | Create theme overrides (colors, typography) | - | ⬜ |

### Afternoon (4h)
| Story | Task | Owner | Status |
|-------|------|-------|--------|
| 2.1 | Update package.json files | - | ⬜ |
| 2.2 | Update tauri.conf.json and Cargo.toml | - | ⬜ |
| 2.5 | Apply theme to MUI (merge overrides) | - | ⬜ |

### Day 1 Milestone
✅ Enterprise module exists with config, features, and theme
✅ App builds as "Eloquio"
✅ Theme colors visible in dev mode

---

## Day 2: Mode Hiding & Locale Updates

### Morning (4h)
| Story | Task | Owner | Status |
|-------|------|-------|--------|
| 3.1 | Analyze settings mode component | - | ⬜ |
| 3.2 | Implement conditional mode rendering | - | ⬜ |
| 3.3 | Verify local default, add validation | - | ⬜ |

### Afternoon (4h)
| Story | Task | Owner | Status |
|-------|------|-------|--------|
| 2.6 | Update all 12 locale files | - | ⬜ |
| 2.3 | Update CLAUDE.md and README.md | - | ⬜ |

### Day 2 Milestone
✅ Settings shows only "Local" mode
✅ All locales show "Eloquio"
✅ Documentation references Eloquio

---

## Day 3: Visual Assets & Site Foundation

### Morning (4h)
| Story | Task | Owner | Status |
|-------|------|-------|--------|
| 2.4 | Integrate Eloquio logo and icons | - | ⬜ |
| - | Create/obtain Eloquio assets if needed | - | ⬜ |

### Afternoon (4h)
| Story | Task | Owner | Status |
|-------|------|-------|--------|
| 4.1 | Update site config and apply theme | - | ⬜ |
| 4.2 | Replace site branding assets | - | ⬜ |

### Day 3 Milestone
✅ Desktop app shows Eloquio icons everywhere
✅ Marketing site has Eloquio styling foundation

---

## Day 4: Marketing Site Content

### Full Day (8h)
| Story | Task | Owner | Status |
|-------|------|-------|--------|
| 4.3 | Rebuild landing page with enterprise messaging | - | ⬜ |
| 4.4 | Add FAQ section | - | ⬜ |
| 4.5 | Simplify pricing (Free + Enterprise) | - | ⬜ |
| 4.6 | Update navigation and footer | - | ⬜ |

### Day 4 Milestone
✅ Landing page is security-focused
✅ FAQ section answers common questions
✅ Pricing shows Free Personal + Enterprise
✅ "Book a Call" replaces Discord

---

## Day 5: Documentation & Polish

### Morning (4h)
| Story | Task | Owner | Status |
|-------|------|-------|--------|
| 5.1 | Create white-label architecture docs | - | ⬜ |
| 5.2 | Create upstream sync workflow guide | - | ⬜ |
| 5.3 | Update existing docs with enterprise refs | - | ⬜ |

### Afternoon (4h)
| Task | Owner | Status |
|------|-------|--------|
| Full app testing on macOS | - | ⬜ |
| Full app testing on Windows | - | ⬜ |
| Marketing site review | - | ⬜ |
| Fix any issues found | - | ⬜ |

### Day 5 Milestone
✅ Documentation complete
✅ App tested on all platforms
✅ Ready for deployment

---

## Pre-Sprint Checklist

Before starting, ensure:

- [ ] Git branch `product/main` created from `main`
- [ ] Upstream remote configured: `git remote add upstream <voquill-repo-url>`
- [ ] Node.js and Rust toolchain installed
- [ ] `npm install` successful at root
- [ ] `npm run dev:mac` (or platform) launches Voquill
- [ ] Eloquio visual assets ready (logo, icons) OR placeholder plan

---

## Definition of Done

A story is complete when:

1. ✅ Code changes match technical specification
2. ✅ All acceptance criteria pass
3. ✅ `npm run check-types` passes
4. ✅ `npm run build` succeeds
5. ✅ Visual verification done (if UI change)
6. ✅ Changes committed to `product/main`

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Missing Eloquio assets | Use placeholder, mark as TODO |
| Merge conflicts | Follow conflict resolution guide |
| Theme breaks existing UI | Test thoroughly, use spread merge |
| i18n tooling fails | Manual edit as fallback |

---

## Post-Sprint

After sprint completion:

1. **Build release candidates** for all platforms
2. **Deploy marketing site** to staging
3. **User acceptance testing** with stakeholders
4. **Fix critical issues** found in UAT
5. **Production deployment**

---

## Story File References

Detailed implementation guides:

- [Story 1.1: Enterprise Module Structure](./stories/story-1.1-enterprise-module-structure.md)
- [Story 1.2: Enterprise Config Module](./stories/story-1.2-enterprise-config-module.md)
- [Story 1.3: Enterprise Features Config](./stories/story-1.3-enterprise-features-config.md)
- [Story 1.4: Enterprise Theme Overrides](./stories/story-1.4-enterprise-theme-overrides.md)
- [Story 2.1: Package Configuration](./stories/story-2.1-package-configuration.md)
- [Story 2.2: Tauri/Rust Configuration](./stories/story-2.2-tauri-rust-configuration.md)
- [Story 2.5: Apply Eloquio Theme](./stories/story-2.5-apply-eloquio-theme.md)
- [Story 2.6: Update Locale Files](./stories/story-2.6-update-locale-files.md)
- [Story 3.2: Conditional Mode Rendering](./stories/story-3.2-conditional-mode-rendering.md)
- [Story 4.3: Landing Page Enterprise Messaging](./stories/story-4.3-landing-page-enterprise-messaging.md)

Full epic breakdown: [epics.md](../planning-artifacts/epics.md)
