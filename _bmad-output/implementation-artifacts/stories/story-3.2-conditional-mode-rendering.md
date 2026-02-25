# Story 3.2: Implement Conditional Mode Rendering

## Metadata
- **Epic:** 3 - Local-Only Mode Experience
- **Priority:** P0
- **Complexity:** Medium
- **Estimated effort:** 1 hour
- **Dependencies:** Story 1.3 (feature flags must exist)
- **Blocks:** None

## User Story
As a **developer**,
I want **the Settings page to show only "Local" mode option based on enterprise feature flags**,
So that **users see a focused interface without API/Cloud options**.

## Requirements Covered
- FR28: Implement conditional rendering for transcription modes
- AR3: Feature hiding via UI configuration - backend code remains intact

## Technical Specification

### Files to Modify

1. `apps/desktop/src/components/settings/AITranscriptionConfiguration.tsx`

### Current Implementation Analysis

Based on codebase analysis, the mode selection is in `AITranscriptionConfiguration.tsx` using a `SegmentedControl` component:

```typescript
// Current code (conceptual)
<SegmentedControl<TranscriptionMode>
  value={transcription.mode}
  onChange={handleModeChange}
  options={[
    { value: "cloud", label: "Voquill" },
    { value: "api", label: "API" },
    { value: "local", label: "Local" },
  ]}
/>
```

### Implementation Details

#### Update `apps/desktop/src/components/settings/AITranscriptionConfiguration.tsx`

**Add import:**
```typescript
import { ELOQUIO_FEATURES } from '@/enterprise/features';
```

**Update options array:**
```typescript
// Before
options={[
  { value: "cloud", label: "Voquill" },
  { value: "api", label: "API" },
  { value: "local", label: "Local" },
]}

// After
options={[
  // Cloud mode - hidden for Eloquio MVP
  ...(ELOQUIO_FEATURES.showCloudMode
    ? [{ value: "cloud" as const, label: "Eloquio" }]  // Renamed from "Voquill"
    : []),
  // API mode - hidden for Eloquio MVP
  ...(ELOQUIO_FEATURES.showApiMode
    ? [{ value: "api" as const, label: "API" }]
    : []),
  // Local mode - always visible
  { value: "local" as const, label: "Local" },
]}
```

**Alternative using filter:**
```typescript
const allModeOptions = [
  { value: "cloud" as const, label: "Eloquio", show: ELOQUIO_FEATURES.showCloudMode },
  { value: "api" as const, label: "API", show: ELOQUIO_FEATURES.showApiMode },
  { value: "local" as const, label: "Local", show: true },
];

const visibleOptions = allModeOptions
  .filter(opt => opt.show)
  .map(({ value, label }) => ({ value, label }));

// In JSX:
<SegmentedControl<TranscriptionMode>
  value={transcription.mode}
  onChange={handleModeChange}
  options={visibleOptions}
/>
```

### Hide Mode Selector When Only One Option

If only Local mode is visible, the selector is unnecessary:

```typescript
// Only show mode selector if multiple modes are available
{visibleOptions.length > 1 && (
  <Section title={formatMessage({ defaultMessage: "Transcription mode" })}>
    <SegmentedControl<TranscriptionMode>
      value={transcription.mode}
      onChange={handleModeChange}
      options={visibleOptions}
    />
  </Section>
)}
```

Or show as informational text:

```typescript
{visibleOptions.length === 1 ? (
  <Section title={formatMessage({ defaultMessage: "Transcription mode" })}>
    <Typography variant="body2" color="text.secondary">
      {formatMessage({ defaultMessage: "Local (on-device processing)" })}
    </Typography>
  </Section>
) : (
  <Section title={formatMessage({ defaultMessage: "Transcription mode" })}>
    <SegmentedControl ... />
  </Section>
)}
```

### Conditional Settings Sections

Also hide API/Cloud-specific settings sections:

```typescript
// API Key section - only show if API mode is visible
{ELOQUIO_FEATURES.showApiMode && transcription.mode === "api" && (
  <ApiKeyConfiguration />
)}

// Cloud account section - only show if Cloud mode is visible
{ELOQUIO_FEATURES.showCloudMode && transcription.mode === "cloud" && (
  <CloudAccountSettings />
)}

// Local settings - always show when in local mode
{transcription.mode === "local" && (
  <LocalModeSettings />
)}
```

## Acceptance Criteria

### AC1: Feature Flags Imported
```gherkin
Given Story 1.3 is complete (feature flags exist)
When I update AITranscriptionConfiguration.tsx
Then I import `ELOQUIO_FEATURES` from `@/enterprise/features`
And the import causes no TypeScript errors
```

### AC2: Mode Options Filtered
```gherkin
Given `ELOQUIO_FEATURES.showApiMode` is `false`
And `ELOQUIO_FEATURES.showCloudMode` is `false`
When I render the mode selection
Then only "Local" option is visible
And "API" and "Cloud" options are NOT rendered in the DOM
```

### AC3: Settings Page Shows Local Only
```gherkin
Given the conditional rendering is implemented
When I open the Settings page
Then I see only "Local" mode (or no mode selector if hidden)
And I do NOT see "API" or "Cloud" options
```

### AC4: Code Not Deleted
```gherkin
Given the conditional rendering is implemented
When I inspect the codebase
Then the API mode implementation code still exists
And the Cloud mode implementation code still exists
And re-enabling modes only requires changing feature flags to `true`
```

### AC5: Mode-Specific Settings Hidden
```gherkin
Given API and Cloud modes are hidden
When I view the Settings page
Then API key configuration section is NOT visible
And Cloud account section is NOT visible
And Local mode settings ARE visible
```

### AC6: TypeScript Compiles
```gherkin
Given all changes are made
When I run `npm run check-types`
Then compilation succeeds with no errors
```

## Verification Steps

```bash
# 1. Update the component
cd apps/desktop

# 2. Type check
npm run check-types

# 3. Run app
npm run dev:mac

# 4. Navigate to Settings
# - Verify only "Local" mode is shown (or mode selector hidden)
# - Verify no API key section
# - Verify no Cloud account section

# 5. Verify code intact
grep -r "CloudTranscribeAudioRepo" src/  # Should find matches
grep -r "GroqTranscribeAudioRepo" src/   # Should find matches
```

## Code Verification: Modes Still Work

To verify API/Cloud code is still functional (for development/testing):

```typescript
// Temporarily in browser console or test file:
import { produceAppState } from './store';

// Force API mode (bypasses UI restriction)
produceAppState((draft) => {
  draft.settings.aiTranscription.mode = 'api';
});

// Next recording will attempt to use API mode
// (Will fail gracefully if no API key configured)
```

## Merge Conflict Risk

**LOW** - This is a small, targeted change.

**Resolution strategy:**
- Keep the import statement
- Keep the conditional rendering pattern
- If upstream adds new mode options, add them to the condition

## Notes for Developer

- **Do NOT delete any code** - only add conditions
- The `as const` type assertion ensures TypeScript correctly narrows the type
- Consider accessibility: screen readers should not announce hidden elements
- If mode selector is hidden entirely, ensure Local mode settings still show
- Test that changing `showApiMode: true` in feature flags re-enables the option
