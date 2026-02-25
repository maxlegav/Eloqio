# Story 2.2: Update Tauri and Rust Configuration

## Metadata
- **Epic:** 2 - Complete Desktop App Branding
- **Priority:** P1
- **Complexity:** Low
- **Estimated effort:** 30 minutes
- **Dependencies:** Story 1.2 (for brand values reference)
- **Blocks:** None

## User Story
As a **developer**,
I want **Tauri and Cargo configurations updated with Eloquio branding**,
So that **the built application displays "Eloquio" in window titles, bundle identifiers, and system integrations**.

## Requirements Covered
- FR7: Update `tauri.conf.json` with productName, identifier, window title
- FR8: Update `Cargo.toml` with name, description, authors
- NFR12: Output app named "Eloquio" from build process
- NFR13: Package installer shows Eloquio name and icon

## Technical Specification

### Files to Modify

1. `apps/desktop/src-tauri/tauri.conf.json`
2. `apps/desktop/src-tauri/Cargo.toml`

### Implementation Details

#### 1. Update `apps/desktop/src-tauri/tauri.conf.json`

**Fields to change:**

```json
{
  "productName": "Eloquio",
  "identifier": "com.eloquio.app",
  "app": {
    "windows": [
      {
        "title": "Eloquio",
        ...
      }
    ]
  }
}
```

**Full diff (conceptual):**
```diff
{
-  "productName": "Voquill",
+  "productName": "Eloquio",
-  "identifier": "com.voquill.app",
+  "identifier": "com.eloquio.app",
   "app": {
     "windows": [
       {
-        "title": "Voquill",
+        "title": "Eloquio",
         ...
       }
     ]
   }
}
```

**Do NOT change:**
- `build` configuration
- `plugins` configuration
- `security` settings
- `bundle` settings (except identifier)
- Any paths or URLs

#### 2. Update `apps/desktop/src-tauri/Cargo.toml`

**Fields to change:**

```toml
[package]
name = "eloquio"
description = "Enterprise voice-to-text application"
authors = ["Eloquio Team"]
```

**Full diff (conceptual):**
```diff
[package]
-name = "voquill"
+name = "eloquio"
version = "1.0.0"
-description = "Superfast voice-to-text with Whisper AI"
+description = "Enterprise voice-to-text application"
-authors = ["Voquill Team"]
+authors = ["Eloquio Team"]
edition = "2021"
```

**Do NOT change:**
- `version` field
- `edition` field
- `[dependencies]` section
- `[features]` section
- `[build-dependencies]` section
- Any other configuration

## Acceptance Criteria

### AC1: tauri.conf.json Updated
```gherkin
Given `apps/desktop/src-tauri/tauri.conf.json` exists
When I update the branding fields
Then `productName` is set to "Eloquio"
And `identifier` is set to "com.eloquio.app"
And window `title` is set to "Eloquio"
And all other configuration remains unchanged
```

### AC2: Cargo.toml Updated
```gherkin
Given `apps/desktop/src-tauri/Cargo.toml` exists
When I update the package metadata
Then `name` is set to "eloquio"
And `description` is set to "Enterprise voice-to-text application"
And `authors` includes "Eloquio Team"
And dependencies and features remain unchanged
```

### AC3: Build Produces Eloquio App
```gherkin
Given both config files are updated
When I run `npm run build` from `apps/desktop`
Then the build completes successfully
And the output application is named "Eloquio"
```

### AC4: Window Title Shows Eloquio
```gherkin
Given the app is built with updated config
When I launch the application
Then the window title bar shows "Eloquio"
```

### AC5: Bundle Identifier Correct
```gherkin
Given the app is built with updated config
When I inspect the bundle on macOS
Then the bundle identifier is "com.eloquio.app"
```

## Verification Steps

```bash
# 1. Update files
cd apps/desktop/src-tauri

# 2. Verify JSON is valid
cat tauri.conf.json | python -m json.tool > /dev/null

# 3. Build the app
cd ..
npm run build

# 4. Check output (macOS)
ls dist/*.dmg  # Should contain "Eloquio"

# 5. Check bundle identifier (macOS)
# After installing, run:
# mdls -name kMDItemCFBundleIdentifier /Applications/Eloquio.app
```

## Merge Conflict Risk

**MEDIUM-HIGH** - These are core config files that may change upstream.

**Resolution strategy:**
1. `productName`, `identifier`, `title`: Always keep Eloquio values
2. Other fields: Accept upstream changes
3. New fields added by upstream: Accept them

## Platform-Specific Notes

### macOS
- Bundle identifier used for app sandboxing
- Shown in Activity Monitor
- Used for app data folder: `~/Library/Application Support/com.eloquio.app`

### Windows
- Product name shown in Task Manager
- Used for registry entries
- Installer shows "Eloquio" in Add/Remove Programs

### Linux
- App name used for .desktop file
- Shown in application menu

## Notes for Developer

- The identifier change affects where app data is stored
- Users migrating from Voquill will have separate data folders
- This is intentional for clean Eloquio installs
- If migration is needed later, it's a separate story
