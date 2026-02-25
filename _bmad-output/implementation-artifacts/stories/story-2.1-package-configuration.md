# Story 2.1: Update Package Configuration Files

## Metadata
- **Epic:** 2 - Complete Desktop App Branding
- **Priority:** P1
- **Complexity:** Low
- **Estimated effort:** 20 minutes
- **Dependencies:** None
- **Blocks:** None (parallel with other 2.x stories)

## User Story
As a **developer**,
I want **all npm package.json files updated with Eloquio naming**,
So that **the project identity is consistent across build tools and package managers**.

## Requirements Covered
- FR5: Update root `package.json` name field
- FR6: Update `apps/desktop/package.json` with name, productName, description

## Technical Specification

### Files to Modify

1. `package.json` (root)
2. `apps/desktop/package.json`

### Implementation Details

#### 1. Update Root `package.json`

**Current (Voquill):**
```json
{
  "name": "voquill",
  ...
}
```

**Target (Eloquio):**
```json
{
  "name": "eloquio",
  ...
}
```

**Only change the `name` field.** All other fields remain unchanged.

#### 2. Update `apps/desktop/package.json`

**Current (Voquill):**
```json
{
  "name": "voquill",
  "productName": "Voquill",
  "description": "Superfast voice-to-text with Whisper AI. Works offline.",
  ...
}
```

**Target (Eloquio):**
```json
{
  "name": "eloquio",
  "productName": "Eloquio",
  "description": "Enterprise voice-to-text for confidential workflows",
  ...
}
```

**Only change these 3 fields.** All scripts, dependencies, and other fields remain unchanged.

## Acceptance Criteria

### AC1: Root package.json Updated
```gherkin
Given the root `package.json` exists
When I update the name field
Then `"name"` is changed from `"voquill"` to `"eloquio"`
And no other fields are modified
```

### AC2: Desktop package.json Updated
```gherkin
Given `apps/desktop/package.json` exists
When I update the branding fields
Then `"name"` is set to `"eloquio"`
And `"productName"` is set to `"Eloquio"`
And `"description"` is set to "Enterprise voice-to-text for confidential workflows"
And all scripts remain unchanged
And all dependencies remain unchanged
```

### AC3: npm install Works
```gherkin
Given both package.json files are updated
When I run `npm install` from the root
Then the installation completes without errors
And the workspace resolves correctly
```

## Verification Steps

```bash
# 1. Update files
# (edit manually or with sed)

# 2. Verify changes
grep '"name"' package.json
grep '"name"' apps/desktop/package.json
grep '"productName"' apps/desktop/package.json
grep '"description"' apps/desktop/package.json

# 3. Test install
rm -rf node_modules
npm install

# 4. Verify workspace
npm run build --workspace apps/desktop -- --help
```

## Merge Conflict Risk

**MEDIUM** - These files change frequently upstream.

**Resolution strategy:** Always keep Eloquio values for `name`, `productName`, `description`. Accept upstream changes for everything else.

## Notes for Developer

- This is a minimal change - do NOT modify scripts or dependencies
- The `productName` field is used by electron-builder/tauri for installers
- Verify npm workspace still resolves after changes
