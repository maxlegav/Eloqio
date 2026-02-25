# Story 1.3: Create Enterprise Features Config

## Metadata
- **Epic:** 1 - Enterprise Architecture Foundation
- **Priority:** P0
- **Complexity:** Low
- **Estimated effort:** 45 minutes
- **Dependencies:** Story 1.1
- **Blocks:** Story 3.2, 3.3

## User Story
As a **developer**,
I want **a feature flags module that controls which transcription modes are visible**,
So that **we can hide API and Cloud modes from the UI while keeping the code intact for future enablement**.

## Requirements Covered
- FR3: Create enterprise features config controlling transcription mode visibility
- FR30: Create mode validation helper function `isAllowedMode()`

## Technical Specification

### Files to Create/Modify

```
apps/desktop/src/enterprise/features/
├── flags.ts              # NEW - Feature flags
├── types.ts              # NEW - TypeScript interfaces
└── index.ts              # MODIFY - Add exports
```

### Implementation Details

#### 1. Create `apps/desktop/src/enterprise/features/types.ts`

```typescript
/**
 * Type definitions for Eloquio feature flags
 */

// Import the existing type from Voquill
import type { TranscriptionMode } from '@/types/ai.types';

export type { TranscriptionMode };

export interface EloquioFeatures {
  /** Allowed transcription modes (others hidden from UI) */
  transcriptionModes: readonly TranscriptionMode[];

  /** Show API mode in settings */
  showApiMode: boolean;

  /** Show Cloud mode in settings */
  showCloudMode: boolean;

  /** Enable post-processing with LLM */
  enablePostProcessing: boolean;

  /** Enable dictionary/glossary feature */
  enableDictionary: boolean;

  /** Enable tones feature */
  enableTones: boolean;
}
```

#### 2. Create `apps/desktop/src/enterprise/features/flags.ts`

```typescript
import type { EloquioFeatures, TranscriptionMode } from './types';

/**
 * Eloquio Feature Flags
 *
 * Controls which features are visible/enabled in the UI.
 * The underlying code remains intact - only UI visibility is affected.
 *
 * To re-enable a mode later, simply change the flag to `true`.
 */
export const ELOQUIO_FEATURES: EloquioFeatures = {
  // Only LOCAL mode visible for MVP
  transcriptionModes: ['local'] as const,
  showApiMode: false,
  showCloudMode: false,

  // These features remain enabled
  enablePostProcessing: true,
  enableDictionary: true,
  enableTones: true,
};

/**
 * Check if a transcription mode is allowed in Eloquio
 *
 * @param mode - The mode to check ('local' | 'api' | 'cloud')
 * @returns true if the mode is allowed, false otherwise
 *
 * @example
 * isAllowedMode('local') // true
 * isAllowedMode('api')   // false
 * isAllowedMode('cloud') // false
 */
export const isAllowedMode = (mode: TranscriptionMode): boolean => {
  return ELOQUIO_FEATURES.transcriptionModes.includes(mode);
};

/**
 * Get the default transcription mode for new users
 * Always returns the first allowed mode
 */
export const getDefaultMode = (): TranscriptionMode => {
  return ELOQUIO_FEATURES.transcriptionModes[0];
};

/**
 * Validate and potentially correct a mode setting
 * Useful for migrating users from Voquill who had API/Cloud selected
 *
 * @param mode - The mode to validate
 * @returns The mode if allowed, or the default mode if not
 */
export const validateMode = (mode: TranscriptionMode): TranscriptionMode => {
  return isAllowedMode(mode) ? mode : getDefaultMode();
};
```

#### 3. Update `apps/desktop/src/enterprise/features/index.ts`

```typescript
/**
 * Eloquio Feature Flags Module
 * Control visibility of features without removing code
 */

export * from './types';
export * from './flags';
```

### Usage Example

```typescript
// In Settings component:
import { ELOQUIO_FEATURES, isAllowedMode } from '@/enterprise/features';

// Conditional rendering in JSX
{ELOQUIO_FEATURES.showApiMode && (
  <MenuItem value="api">API</MenuItem>
)}

// Validation
if (!isAllowedMode(userSelectedMode)) {
  // Reset to default
}
```

## Acceptance Criteria

### AC1: Feature Flags Object
```gherkin
Given Story 1.1 is complete
When I create `apps/desktop/src/enterprise/features/flags.ts`
Then it exports an `ELOQUIO_FEATURES` object with:
  | Property             | Value   |
  | transcriptionModes   | ['local'] |
  | showApiMode          | false   |
  | showCloudMode        | false   |
  | enablePostProcessing | true    |
  | enableDictionary     | true    |
  | enableTones          | true    |
```

### AC2: isAllowedMode Helper - Local
```gherkin
Given the features config exists
When I call `isAllowedMode('local')`
Then it returns `true`
```

### AC3: isAllowedMode Helper - API
```gherkin
Given the features config exists
When I call `isAllowedMode('api')`
Then it returns `false`
```

### AC4: isAllowedMode Helper - Cloud
```gherkin
Given the features config exists
When I call `isAllowedMode('cloud')`
Then it returns `false`
```

### AC5: getDefaultMode Helper
```gherkin
Given the features config exists
When I call `getDefaultMode()`
Then it returns `'local'`
```

### AC6: validateMode Helper
```gherkin
Given the features config exists
When I call `validateMode('api')`
Then it returns `'local'` (the default, since 'api' is not allowed)

When I call `validateMode('local')`
Then it returns `'local'` (unchanged, since it's allowed)
```

### AC7: Types Import
```gherkin
Given the features module exists
When I import `TranscriptionMode` from `@/enterprise/features`
Then it matches the type from `@/types/ai.types`
```

## Verification Steps

```bash
# 1. Type check
cd apps/desktop
npm run check-types

# 2. Create a test file to verify (then delete)
# test-features.ts:
# import { isAllowedMode, getDefaultMode, validateMode } from '@/enterprise/features';
# console.log(isAllowedMode('local'));  // true
# console.log(isAllowedMode('api'));    // false
# console.log(getDefaultMode());        // 'local'
# console.log(validateMode('cloud'));   // 'local'
```

## Notes for Developer

- The `TranscriptionMode` type comes from `@/types/ai.types` - re-export it for convenience
- These flags only control **UI visibility**, not functionality
- Code for API/Cloud modes remains fully functional
- To enable API mode later: `showApiMode: true, transcriptionModes: ['local', 'api']`
- The `validateMode` helper will be useful in Story 3.3 for migrating existing users
