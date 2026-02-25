# Story 2.6: Update All Locale Files with Eloquio Branding

## Metadata
- **Epic:** 2 - Complete Desktop App Branding
- **Priority:** P1
- **Complexity:** Low (repetitive)
- **Estimated effort:** 1 hour
- **Dependencies:** None
- **Blocks:** None

## User Story
As a **developer**,
I want **all 12 locale JSON files updated to replace "Voquill" with "Eloquio"**,
So that **users see consistent Eloquio branding regardless of their language setting**.

## Requirements Covered
- FR15-FR26: Update all locale files
- NFR9: Support all 12 existing languages for branding consistency

## Technical Specification

### Files to Modify

```
apps/desktop/src/i18n/locales/
├── en.json      # English
├── fr.json      # French
├── es.json      # Spanish
├── de.json      # German
├── it.json      # Italian
├── pt-BR.json   # Portuguese (Brazil)
├── pt-PT.json   # Portuguese (Portugal)
├── ja.json      # Japanese
├── zh-CN.json   # Chinese (Simplified)
├── zh-TW.json   # Chinese (Traditional)
├── ru.json      # Russian
└── ko.json      # Korean
```

### Implementation Details

#### Automated Approach (Recommended)

Use sed or a script to replace all instances:

```bash
cd apps/desktop/src/i18n/locales

# Replace "Voquill" with "Eloquio" in all JSON files
for file in *.json; do
  sed -i '' 's/Voquill/Eloquio/g' "$file"
done

# Verify changes
grep -l "Voquill" *.json  # Should return nothing
grep -l "Eloquio" *.json  # Should return all files that had Voquill
```

#### Manual Verification

After automated replacement, manually verify:
1. No broken JSON syntax
2. No unintended replacements
3. Brand name appears in expected places

#### Common Occurrences to Replace

Typical strings containing "Voquill":

```json
{
  "app.name": "Voquill",           // → "Eloquio"
  "welcome.title": "Welcome to Voquill",  // → "Welcome to Eloquio"
  "about.description": "Voquill is a...", // → "Eloquio is a..."
  "cloud.mode.label": "Voquill",   // → "Eloquio" (Cloud mode label)
  "support.email": "support@voquill.com"  // → Check if needs changing
}
```

#### Language-Specific Considerations

| Language | Notes |
|----------|-------|
| **en.json** | Primary source, most occurrences |
| **ja.json** | "Voquill" likely unchanged (brand name) |
| **zh-CN/TW** | "Voquill" likely unchanged (brand name) |
| **ko.json** | "Voquill" likely unchanged (brand name) |
| **ru.json** | "Voquill" likely unchanged (brand name) |
| **Others** | May have localized descriptions |

In CJK languages, brand names are typically kept in English/Latin script.

### Internationalization Tooling

After changes, run the i18n sync to verify:

```bash
npm run i18n:extract   # Extract messages from code
npm run i18n:sync      # Sync with locale files
```

This ensures no message IDs are broken.

## Acceptance Criteria

### AC1: English Locale Updated
```gherkin
Given the English locale file `en.json` exists
When I perform find-and-replace
Then all instances of "Voquill" are replaced with "Eloquio"
And message IDs are preserved (only values change)
And JSON syntax remains valid
```

### AC2: All Other Locales Updated
```gherkin
Given all 11 other locale files exist
When I perform find-and-replace on each
Then "Voquill" becomes "Eloquio" in all files
And the structure of each JSON file is preserved
And all files remain valid JSON
```

### AC3: French Locale Verification
```gherkin
Given the French locale is updated
When I change the app language to French
Then UI strings show "Eloquio" (not "Voquill")
And all other localized text displays correctly in French
```

### AC4: Japanese Locale Verification
```gherkin
Given the Japanese locale is updated
When I change the app language to Japanese
Then UI strings show "Eloquio" in appropriate contexts
And Japanese text renders correctly
And no mojibake (garbled characters) appears
```

### AC5: i18n Tooling Passes
```gherkin
Given all locale files are updated
When I run `npm run i18n:extract && npm run i18n:sync`
Then the tooling completes without errors
And no message IDs are flagged as missing
And no unexpected changes are made
```

### AC6: No Voquill References Remain
```gherkin
Given all locale files are updated
When I search for "Voquill" in all locale files
Then zero matches are found
```

## Verification Steps

```bash
# 1. Navigate to locales directory
cd apps/desktop/src/i18n/locales

# 2. Count occurrences before
grep -c "Voquill" *.json

# 3. Run replacement
for file in *.json; do
  sed -i '' 's/Voquill/Eloquio/g' "$file"
done

# 4. Verify no Voquill remains
grep -c "Voquill" *.json  # All should be 0

# 5. Verify Eloquio exists
grep -c "Eloquio" *.json  # Should match previous Voquill counts

# 6. Validate JSON syntax
for file in *.json; do
  python -m json.tool "$file" > /dev/null && echo "$file: OK" || echo "$file: INVALID"
done

# 7. Run i18n tools
cd ../../../
npm run i18n:extract
npm run i18n:sync

# 8. Run app and test language switching
npm run dev:mac
# Change language in settings, verify "Eloquio" appears
```

## Merge Conflict Risk

**LOW** - Locale files change infrequently for brand names.

**Resolution strategy:**
- Accept upstream changes for new messages
- Keep Eloquio for any Voquill references
- Run automated replacement again after merge if needed

## Notes for Developer

- Brand names like "Eloquio" typically stay unchanged across languages
- Don't translate the brand name - "Eloquio" should remain "Eloquio"
- Watch for contextual text like "Powered by Voquill" → "Powered by Eloquio"
- The Cloud mode label "Voquill" should become "Eloquio" (even though mode is hidden)
- Keep a backup before making changes: `cp -r locales locales.backup`
