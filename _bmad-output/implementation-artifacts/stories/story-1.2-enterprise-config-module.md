# Story 1.2: Create Enterprise Config Module

## Metadata
- **Epic:** 1 - Enterprise Architecture Foundation
- **Priority:** P0
- **Complexity:** Low
- **Estimated effort:** 30 minutes
- **Dependencies:** Story 1.1
- **Blocks:** Stories 2.2, 2.3

## User Story
As a **developer**,
I want **a centralized configuration module with all Eloquio brand values**,
So that **branding changes require editing only one file and all references stay consistent**.

## Requirements Covered
- FR2: Create enterprise config module exporting Eloquio brand values

## Technical Specification

### Files to Create/Modify

```
apps/desktop/src/enterprise/config/
├── brand.ts              # NEW - Brand configuration
├── types.ts              # NEW - TypeScript interfaces
└── index.ts              # MODIFY - Add exports
```

### Implementation Details

#### 1. Create `apps/desktop/src/enterprise/config/types.ts`

```typescript
/**
 * Type definitions for Eloquio configuration
 */

export interface EloquioConfig {
  /** Application name displayed in UI */
  appName: string;

  /** Product name for installers and system */
  productName: string;

  /** macOS/iOS bundle identifier */
  bundleIdentifier: string;

  /** Marketing website URL */
  website: string;

  /** Support email address */
  supportEmail: string;

  /** Company/team name for credits */
  companyName: string;

  /** Short product description */
  description: string;

  /** Booking URL for enterprise demos */
  bookingUrl: string;
}
```

#### 2. Create `apps/desktop/src/enterprise/config/brand.ts`

```typescript
import type { EloquioConfig } from './types';

/**
 * Eloquio Brand Configuration
 *
 * SINGLE SOURCE OF TRUTH for all brand values.
 * Update this file to change branding across the entire application.
 */
export const ELOQUIO_CONFIG: EloquioConfig = {
  appName: 'Eloquio',
  productName: 'Eloquio',
  bundleIdentifier: 'com.eloquio.app',
  website: 'https://eloquio.com',
  supportEmail: 'support@eloquio.com',
  companyName: 'Eloquio Team',
  description: 'Enterprise voice-to-text for confidential workflows',
  bookingUrl: 'https://cal.com/eloquio/demo', // Update with actual URL
};

/**
 * Helper to get full app title with optional suffix
 * @example getAppTitle() => "Eloquio"
 * @example getAppTitle("Settings") => "Eloquio - Settings"
 */
export const getAppTitle = (suffix?: string): string => {
  if (suffix) {
    return `${ELOQUIO_CONFIG.appName} - ${suffix}`;
  }
  return ELOQUIO_CONFIG.appName;
};
```

#### 3. Update `apps/desktop/src/enterprise/config/index.ts`

```typescript
/**
 * Eloquio Configuration Module
 * Centralized brand values and helpers
 */

export * from './types';
export * from './brand';
```

### Usage Example

```typescript
// In any component or file:
import { ELOQUIO_CONFIG, getAppTitle } from '@/enterprise/config';

// Access brand values
console.log(ELOQUIO_CONFIG.appName);        // "Eloquio"
console.log(ELOQUIO_CONFIG.supportEmail);   // "support@eloquio.com"

// Generate window title
document.title = getAppTitle('Settings');   // "Eloquio - Settings"
```

## Acceptance Criteria

### AC1: Config File Created
```gherkin
Given Story 1.1 is complete
When I create `apps/desktop/src/enterprise/config/brand.ts`
Then it exports a `ELOQUIO_CONFIG` object with all required properties:
  | Property         | Value                                          |
  | appName          | Eloquio                                        |
  | productName      | Eloquio                                        |
  | bundleIdentifier | com.eloquio.app                                |
  | website          | https://eloquio.com                            |
  | supportEmail     | support@eloquio.com                            |
  | companyName      | Eloquio Team                                   |
  | description      | Enterprise voice-to-text for confidential...  |
  | bookingUrl       | https://cal.com/eloquio/demo                   |
```

### AC2: TypeScript Types
```gherkin
Given the config module exists
When I import `ELOQUIO_CONFIG` from `@/enterprise/config`
Then TypeScript provides proper autocomplete for all properties
And accessing a non-existent property causes a compile error
```

### AC3: Helper Function
```gherkin
Given the config module exists
When I call `getAppTitle()`
Then it returns "Eloquio"

When I call `getAppTitle("Settings")`
Then it returns "Eloquio - Settings"
```

### AC4: Re-export Works
```gherkin
Given the config module exists
When I import from `@/enterprise/config`
Then `ELOQUIO_CONFIG`, `getAppTitle`, and `EloquioConfig` type are available
```

## Verification Steps

```bash
# 1. Type check
cd apps/desktop
npm run check-types

# 2. Verify exports (add to a test file temporarily)
# import { ELOQUIO_CONFIG, getAppTitle, EloquioConfig } from '@/enterprise/config';
# console.log(ELOQUIO_CONFIG.appName); // Should log "Eloquio"
```

## Notes for Developer

- This config will be used by Stories 2.2 and 2.3 for branding
- The `bookingUrl` should be updated once you have a real Calendly/Cal.com link
- Keep the config flat (no nested objects) for easy access
- All values are readonly - do not mutate at runtime
