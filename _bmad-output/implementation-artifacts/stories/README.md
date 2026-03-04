# Eloquio Implementation Stories

> **Dernière mise à jour :** 2026-02-26

## Légende statuts
| Icône | Statut |
|-------|--------|
| ✅ | Complété |
| 🔄 | Partiel / En cours |
| ⬜ | À faire |
| ➕ | Story ajoutée (hors plan initial) |

---

## Epic 1 — Enterprise Architecture Foundation ✅ COMPLET

| Story | Titre | Priorité | Complexité | Statut |
|-------|-------|----------|------------|--------|
| 1.1 | Create Enterprise Module Structure | P0 | Low | ✅ |
| 1.2 | Create Enterprise Config Module | P0 | Low | ✅ |
| 1.3 | Create Enterprise Features Config | P0 | Low | ✅ |
| 1.4 | Create Enterprise Theme Overrides | P0 | Medium | ✅ |

**Notes :** Module `/enterprise/` complet avec config, features, branding. ELOQUIO_CONFIG et ELOQUIO_FEATURES opérationnels.

---

## Epic 2 — Complete Desktop App Branding 🔄 PRESQUE COMPLET

| Story | Titre | Priorité | Complexité | Statut |
|-------|-------|----------|------------|--------|
| 2.1 | Update Package Configuration | P1 | Low | ✅ |
| 2.2 | Update Tauri/Rust Configuration | P1 | Low | ✅ |
| 2.3 | Update Project Documentation | P1 | Low | ⬜ |
| 2.4 | Integrate Visual Assets (icons) | P1 | Low | ⬜ |
| 2.5 | Apply Eloquio Theme to MUI | P1 | Low | ✅ |
| 2.6 | Update All Locale Files | P1 | Low | ✅ |
| 2.7 ➕ | Fix Binary Naming (Tauri flavor configs) | P1 | Low | ✅ |
| 2.8 ➕ | Fix Release Pipeline & Downloads | P1 | Medium | ✅ |

**Notes :**
- 2.5 : Fonts DM Sans + Playfair Display intégrées via @fontsource, h1-h5 en Playfair Display, logo en italic. Font-smoothing activé.
- 2.6 : 50 valeurs remplacées dans 10 fichiers (de, en, es, fr, it, ko, pt, pt-BR, zh-CN, zh-TW).
- 2.7 : 5 configs flavor mises à jour (prod, dev, local, gpu.prod, gpu.dev) → `Eloquio`, `com.eloquio.app.*`.
- 2.8 : `downloads.tsx` pointe sur `maxlegav/Eloqio`. `Voquill.entitlements` → `Eloquio.entitlements`. Workflow CI utilise `${{ github.repository }}` (auto).
- **2.3 restant :** Mettre à jour README.md et CLAUDE.md pour référencer Eloquio.
- **2.4 restant :** Intégrer les icônes Eloquio (`.icns`, `.ico`, `.png`) dans `src-tauri/icons/`.

---

## Epic 3 — Local-Only Mode Experience ✅ COMPLET

| Story | Titre | Priorité | Complexité | Statut |
|-------|-------|----------|------------|--------|
| 3.1 | Analyze Settings Mode Component | P0 | Low | ✅ |
| 3.2 | Implement Conditional Mode Rendering | P0 | Medium | ✅ |
| 3.3 | Verify Local Default & Validation | P1 | Low | ✅ |

**Notes :** `isAllowedMode` utilisé dans `AITranscriptionConfiguration.tsx`. `ELOQUIO_FEATURES.showApiMode: false`, `showCloudMode: false`. Seul le mode Local est visible.

---

## Epic 4 — Marketing Site Launch 🔄 PRESQUE COMPLET

| Story | Titre | Priorité | Complexité | Statut |
|-------|-------|----------|------------|--------|
| 4.1 | Update Site Config & Theme | P1 | Medium | ✅ |
| 4.2 | Replace Site Branding Assets | P1 | Low | ✅ |
| 4.3 | Rebuild Landing Page | P1 | High | ✅ |
| 4.4 | Add FAQ Section | P1 | Medium | ✅ |
| 4.5 | Simplify Pricing Section | P1 | Medium | ✅ |
| 4.6 | Update Navigation & Footer | P1 | Low | ✅ |

**Notes :**
- Section Discord retirée, lien GitHub Voquill supprimé du footer.
- `id="what-is-voquill"` → `id="what-is-eloquio"`.
- `ContactPage` title/description corrigés.
- Cal.com "Book a Call" CTA actif dans hero et pricing Enterprise.
- **Point d'attention :** La page de téléchargement affichera les releases du repo `maxlegav/Eloqio` — fonctionnel dès la première release CI.

---

## Epic 5 — Documentation & Maintenance ⬜ NON COMMENCÉ

| Story | Titre | Priorité | Complexité | Statut |
|-------|-------|----------|------------|--------|
| 5.1 | Create White-Label Docs | P2 | Low | ⬜ |
| 5.2 | Create Upstream Sync Guide | P2 | Medium | ⬜ |
| 5.3 | Update Existing Docs | P2 | Low | ⬜ |

---

## Epic 6 ➕ — Release & Déploiement ⬜ NON COMMENCÉ

Stories découvertes hors plan initial, nécessaires pour la mise en production.

| Story | Titre | Priorité | Complexité | Statut |
|-------|-------|----------|------------|--------|
| 6.1 ➕ | Configurer secrets GitHub Actions | P0 | Low | ⬜ |
| 6.2 ➕ | Déclencher et valider première release CI | P0 | Medium | ⬜ |
| 6.3 ➕ | Déployer le site web (Vercel) | P1 | Low | ⬜ |
| 6.4 ➕ | Valider téléchargement `Eloquio.dmg` end-to-end | P1 | Low | ⬜ |

**Notes :**
- **6.1 :** Ajouter dans `maxlegav/Eloqio` → Settings → Secrets : `TAURI_PRIVATE_KEY`, `TAURI_PRIVATE_KEY_PASSWORD`, `TAURI_UPDATER_PUBLIC_KEY`, plus les secrets Apple pour notarisation macOS.
- **6.2 :** Lancer le workflow `Release Desktop` en mode `dev` depuis GitHub Actions.
- **6.3 :** Le `vercel.json` est déjà configuré — lier le repo à un projet Vercel et déployer.
- **6.4 :** Vérifier que la page de téléchargement affiche bien `Eloquio.dmg`.

---

## Récapitulatif global

| Epic | Titre | Statut | Complété |
|------|-------|--------|----------|
| 1 | Enterprise Architecture Foundation | ✅ Complet | 4/4 |
| 2 | Desktop App Branding | 🔄 Presque | 6/8 |
| 3 | Local-Only Mode | ✅ Complet | 3/3 |
| 4 | Marketing Site | ✅ Complet | 6/6 |
| 5 | Documentation & Maintenance | ⬜ Non commencé | 0/3 |
| 6 | Release & Déploiement (nouveau) | ⬜ Non commencé | 0/4 |

**Total : 19/28 stories complétées (68%)**

---

## Stories restantes (prochaines actions)

### Priorité P0 — Bloquerait un lancement
1. **6.1** — Configurer secrets GitHub Actions (TAURI_PRIVATE_KEY, Apple certs)
2. **6.2** — Première release CI → valider `Eloquio.dmg`

### Priorité P1 — Avant lancement public
3. **2.4** — Intégrer les icônes Eloquio (`.icns`, `.ico`, `png`)
4. **6.3** — Déployer le site web sur Vercel
5. **6.4** — Valider téléchargement end-to-end
6. **2.3** — Mettre à jour README et CLAUDE.md

### Priorité P2 — Post-lancement
7. **5.1** — Docs white-label
8. **5.2** — Guide sync upstream
9. **5.3** — Mise à jour docs existantes

---

## Merge Conflict Risk Summary

| Niveau | Fichiers |
|--------|----------|
| **High** | `.env.prod`, `.env.dev`, `.firebaserc` |
| **Medium** | `package.json`, `tauri.conf.json`, `Cargo.toml` |
| **Low** | `theme.ts`, composants settings, fichiers locales |
| **None** | Tous les fichiers `enterprise/` (nouveaux) |
