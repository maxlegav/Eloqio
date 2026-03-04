# Eloquio MVP — Sprint Plan

> **Dernière mise à jour :** 2026-02-26
> **Statut global :** 19/28 stories complétées (68%)

## Sprint Goal
Transformer Voquill en Eloquio avec branding complet, mode local uniquement, site marketing enterprise, et distribution via GitHub Releases.

---

## ✅ PHASE 1 — Foundation & Core Branding (TERMINÉE)

| Story | Tâche | Statut |
|-------|-------|--------|
| 1.1 | Créer structure module enterprise | ✅ |
| 1.2 | Créer config module (ELOQUIO_CONFIG) | ✅ |
| 1.3 | Créer features config (ELOQUIO_FEATURES) | ✅ |
| 1.4 | Créer theme overrides (colors, typography, shadows) | ✅ |
| 2.1 | Mettre à jour package.json | ✅ |
| 2.2 | Mettre à jour tauri.conf.json et Cargo.toml | ✅ |
| 2.5 | Appliquer thème Eloquio à MUI | ✅ |
| 2.7 | Corriger noms binaires (5 configs flavor) | ✅ |

**Milestone :** Enterprise module opérationnel. App se build en "Eloquio". Couleurs et fonts appliquées.

---

## ✅ PHASE 2 — Mode Hiding & Locales (TERMINÉE)

| Story | Tâche | Statut |
|-------|-------|--------|
| 3.1 | Analyser le composant settings | ✅ |
| 3.2 | Implémenter conditional rendering (mode local only) | ✅ |
| 3.3 | Vérifier défaut local + validation | ✅ |
| 2.6 | Mettre à jour 10 fichiers de locales (50 valeurs) | ✅ |

**Milestone :** Settings affiche uniquement le mode Local. Tous les textes affichent "Eloquio".

---

## ✅ PHASE 3 — Fonts & Design System (TERMINÉE)

| Story | Tâche | Statut |
|-------|-------|--------|
| 2.5+ | Remplacer Roboto par DM Sans + Playfair Display | ✅ |
| 2.5+ | h1-h5 en Playfair Display, logo en italic | ✅ |
| 2.5+ | Font-smoothing + WebKit antialiasing | ✅ |

**Milestone :** App desktop visuellement alignée avec le site web (Playfair Display pour les titres, DM Sans pour le corps).

---

## ✅ PHASE 4 — Marketing Site (TERMINÉE)

| Story | Tâche | Statut |
|-------|-------|--------|
| 4.1 | Config site + thème Eloquio | ✅ |
| 4.2 | Assets branding (logo-mark, app-icon) | ✅ |
| 4.3 | Landing page enterprise (hero, security, speed) | ✅ |
| 4.4 | Section FAQ | ✅ |
| 4.5 | Section Pricing (Free + Pro + Enterprise) | ✅ |
| 4.6 | Nav + Footer nettoyés (Discord retiré, GitHub Voquill supprimé) | ✅ |
| 4.6+ | ContactPage titre/description corrigés | ✅ |
| 4.6+ | `id="what-is-voquill"` → `id="what-is-eloquio"` | ✅ |

**Milestone :** Site marketing 100% Eloquio. CTA "Book a Call" actif. Aucune référence Voquill visible.

---

## ✅ PHASE 5 — Release Pipeline (TERMINÉE)

| Story | Tâche | Statut |
|-------|-------|--------|
| 2.8 | Corriger `downloads.tsx` → `maxlegav/Eloqio` | ✅ |
| 2.8 | Renommer `Voquill.entitlements` → `Eloquio.entitlements` | ✅ |
| 2.8 | Mettre à jour la référence dans `tauri.conf.json` | ✅ |
| 2.8 | Endpoints updater → `maxlegav/Eloqio` dans 5 configs | ✅ |

**Milestone :** Pipeline CI prêt à publier `Eloquio.dmg` sur `maxlegav/Eloqio`.

---

## 🔴 PHASE 6 — Première Release (À FAIRE — PRIORITÉ P0)

> **Bloque le lancement.** Sans cette phase, aucun utilisateur ne peut télécharger l'app.

| Story | Tâche | Statut | Notes |
|-------|-------|--------|-------|
| 6.1 | Configurer secrets GitHub Actions | ⬜ | Voir liste ci-dessous |
| 6.2 | Déclencher première release CI (mode `dev`) | ⬜ | GitHub → Actions → Release Desktop |
| 6.4 | Valider téléchargement `Eloquio.dmg` end-to-end | ⬜ | Vérifier page de téléchargement |

### Secrets à configurer dans `maxlegav/Eloqio` → Settings → Secrets

**Obligatoires (signature Tauri) :**
- `TAURI_PRIVATE_KEY`
- `TAURI_PRIVATE_KEY_PASSWORD`
- `TAURI_UPDATER_PUBLIC_KEY`

**macOS (notarisation Apple) :**
- `APPLE_CERTIFICATE` (base64)
- `APPLE_CERTIFICATE_PASSWORD`
- `APPLE_API_KEY_BASE64`
- `APPLE_API_KEY_ID`
- `APPLE_API_ISSUER`
- `APPLE_TEAM_ID`
- `APPLE_SIGNING_IDENTITY`
- `KEYCHAIN_PASSWORD`

---

## 🟡 PHASE 7 — Finalisation (À FAIRE — PRIORITÉ P1)

| Story | Tâche | Statut | Notes |
|-------|-------|--------|-------|
| 2.4 | Intégrer icônes Eloquio | ⬜ | Remplacer `src-tauri/icons/` (.icns, .ico, .png) |
| 6.3 | Déployer site web sur Vercel | ⬜ | `vercel.json` déjà configuré, lier le projet |
| 2.3 | Mettre à jour README.md et CLAUDE.md | ⬜ | Références Voquill → Eloquio dans la doc |

---

## 🔵 PHASE 8 — Documentation (À FAIRE — PRIORITÉ P2)

| Story | Tâche | Statut |
|-------|-------|--------|
| 5.1 | Créer docs architecture white-label | ⬜ |
| 5.2 | Créer guide sync upstream Voquill | ⬜ |
| 5.3 | Mettre à jour docs existantes | ⬜ |

---

## Récapitulatif des phases

| Phase | Description | Statut | Stories |
|-------|-------------|--------|---------|
| 1 | Foundation & Core Branding | ✅ Terminée | 8/8 |
| 2 | Mode Hiding & Locales | ✅ Terminée | 4/4 |
| 3 | Fonts & Design System | ✅ Terminée | 3/3 |
| 4 | Marketing Site | ✅ Terminée | 8/8 |
| 5 | Release Pipeline | ✅ Terminée | 4/4 |
| 6 | Première Release | 🔴 **BLOQUANT** | 0/3 |
| 7 | Finalisation | 🟡 P1 | 0/3 |
| 8 | Documentation | 🔵 P2 | 0/3 |

**Total : 27/31 tâches terminées (87%)**

---

## Definition of Done

Une story est complète quand :
1. ✅ Code correspond à la spec technique
2. ✅ Tous les critères d'acceptance passent
3. ✅ `npx tsc --noEmit` passe sans erreurs
4. ✅ `npm run build` réussit
5. ✅ Vérification visuelle faite (si changement UI)
6. ✅ Changements commités sur `product/main`

---

## Checklist de lancement

- [x] `npm run build` produit une app "Eloquio"
- [x] Couleurs et fonts Eloquio visibles (DM Sans + Playfair Display)
- [x] Settings affiche uniquement le mode "Local"
- [x] 10 fichiers de locales affichent "Eloquio"
- [x] Site marketing sans références Voquill
- [x] "Book a Call" CTA fonctionnel
- [x] Pipeline CI configuré pour `maxlegav/Eloqio`
- [ ] Secrets GitHub Actions configurés
- [ ] Première release publiée (`Eloquio.dmg`, `Eloquio.msi`)
- [ ] Page de téléchargement affiche les releases Eloquio
- [ ] Icônes Eloquio intégrées (`.icns`, `.ico`)
- [ ] Site web déployé sur Vercel
- [ ] Aucune trace de Voquill dans l'app installée
