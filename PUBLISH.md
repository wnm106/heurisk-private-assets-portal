# Private Assets Portal - Publish Guide

## Quick Publish (One Command)

```bash
npm run publish:private-assets
```

This single command handles the entire workflow:
1. ✅ Git commit and push to GitHub
2. ✅ Apply any schema migrations to the database
3. ✅ Push local files to the Heurisk production database

## What Gets Published

- **Component template** (`src/components/app/template.html`) → versioned in database
- **Entities** (`src/data/entities.json`) → synced to database
- **Environments** (`src/data/environments.json`) → connector overrides synced
- **Git repository** → pushed to `github.com/wnm106/heurisk-private-assets-portal`

## Advanced Options

### Skip Git (if already committed)
```bash
.\scripts\publish-private-assets.ps1 -SkipGit
```

### Skip Migrations (if no schema changes)
```bash
.\scripts\publish-private-assets.ps1 -SkipMigrations
```

### Custom Workspace Path
```bash
.\scripts\publish-private-assets.ps1 -Workspace "C:\path\to\workspace"
```

## Manual Steps (if needed)

If the automated script fails, you can run steps manually:

```bash
# 1. Git push
cd ..\heurisk-private-assets-portal
git add -A
git commit -m "Sync from Heurisk database"
git push origin main

# 2. Apply migrations (if schema changed)
cd ..\heurisk\heurisk
npm run repo:apply-migrations -- --workspace ..\heurisk-private-assets-portal --app-id 149578be-1e3b-43a2-ba05-77a8ab5342c5 --apply

# 3. Push to database
npm run repo:push -- --workspace ..\heurisk-private-assets-portal --app-id 149578be-1e3b-43a2-ba05-77a8ab5342c5 --apply
```

## Configuration

- **App ID**: `149578be-1e3b-43a2-ba05-77a8ab5342c5`
- **Tenant ID**: `722ff48c-02c9-42a9-9d3b-69811bc46c59`
- **Workspace**: `c:\Users\billm\heurisk-private-assets-portal`
- **Database**: `https://heurisk.vercel.app`
- **Source of Truth**: Database (manual sync mode)

## Troubleshooting

### "Contract proposals must be applied"
Run migrations first:
```bash
npm run repo:apply-migrations -- --workspace ..\heurisk-private-assets-portal --app-id 149578be-1e3b-43a2-ba05-77a8ab5342c5 --apply
```

### "Unknown field" validation errors
The validator reads `entities.json` to check field names. Ensure all fields used in `template.html` are defined in `entities.json`.

### Git push says "Everything up-to-date" but database not updated
Git and database are separate. Run the full publish script to sync both.
