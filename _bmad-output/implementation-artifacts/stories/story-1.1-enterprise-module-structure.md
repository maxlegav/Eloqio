# Story 1.1: Create Enterprise Module Directory Structure

## Metadata
- **Epic:** 1 - Enterprise Architecture Foundation
- **Priority:** P0 (Blocker for all other stories)
- **Complexity:** Low
- **Estimated effort:** 30 minutes
- **Dependencies:** None (first story)
- **Blocks:** Stories 1.2, 1.3, 1.4, and all of Epic 2

## User Story
As a **developer**,
I want **a dedicated enterprise module directory with organized subdirectories**,
So that **all Eloquio-specific code is isolated from Voquill core, enabling clean upstream merges**.

## Requirements Covered
- FR1: Create enterprise module directory structure

## Technical Specification

### Files to Create

```
apps/desktop/src/enterprise/
├── index.ts              # Root barrel export
├── config/
│   └── index.ts          # Config barrel export
├── branding/
│   └── index.ts          # Branding barrel export
└── features/
    └── index.ts          # Features barrel export
```

### Implementation Details

#### 1. Create `apps/desktop/src/enterprise/index.ts`

```typescript
/**
 * Eloquio Enterprise Module
 *
 * This module contains all Eloquio-specific customizations isolated from
 * the Voquill core. This architecture enables clean upstream merges.
 *
 * IMPORTANT: All Eloquio customizations should be added here, not in core files.
 */

export * from './config';
export * from './branding';
export * from './features';
```

#### 2. Create `apps/desktop/src/enterprise/config/index.ts`

```typescript
/**
 * Eloquio Configuration
 * Brand values, URLs, identifiers
 */

// Will be populated in Story 1.2
export {};
```

#### 3. Create `apps/desktop/src/enterprise/branding/index.ts`

```typescript
/**
 * Eloquio Branding
 * Theme overrides, colors, typography
 */

// Will be populated in Story 1.4
export {};
```

#### 4. Create `apps/desktop/src/enterprise/features/index.ts`

```typescript
/**
 * Eloquio Feature Flags
 * Control visibility of transcription modes and features
 */

// Will be populated in Story 1.3
export {};
```

### TypeScript Path Alias

Verify that `@/enterprise` resolves correctly. Check `apps/desktop/tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

This means `@/enterprise` will resolve to `./src/enterprise` automatically.

## Acceptance Criteria

### AC1: Directory Structure Created
```gherkin
Given the repository is on `product/main` branch
When I create the enterprise module structure
Then the directory `apps/desktop/src/enterprise/` exists
And it contains subdirectories: `config/`, `branding/`, `features/`
And each subdirectory contains an `index.ts` barrel export file
And the root `enterprise/index.ts` re-exports all submodules
```

### AC2: No Core Files Modified
```gherkin
Given the enterprise module is created
When I run `git status`
Then only new files in `src/enterprise/` are shown
And no existing Voquill files are modified
```

### AC3: TypeScript Compilation
```gherkin
Given the enterprise module is created
When I run `npm run check-types` from `apps/desktop`
Then TypeScript compilation succeeds with no errors
```

### AC4: Import Works
```gherkin
Given the enterprise module is created
When I add `import '@/enterprise'` to any TypeScript file
Then the import resolves without errors
```

## Verification Steps

```bash
# 1. Navigate to desktop app
cd apps/desktop

# 2. Verify structure
ls -la src/enterprise/
ls -la src/enterprise/config/
ls -la src/enterprise/branding/
ls -la src/enterprise/features/

# 3. Type check
npm run check-types

# 4. Test import (add temporarily to any file)
# import '@/enterprise';
```

## Notes for Developer

- This is a **pure scaffolding task** - no logic yet
- Keep files minimal with just exports
- Use JSDoc comments to explain purpose
- This structure mirrors Voquill patterns (barrel exports)
