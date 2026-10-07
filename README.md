# Website prototypes

Each website lives in its own folder under `sites/` and is a self-contained project.

| Site | Folder | Preview |
| --- | --- | --- |
| Healthcare clinic | `sites/healthcare` | https://grualek.github.io/claude-websites/healthcare/ |
| Real estate & property management | `sites/real-estate` | https://grualek.github.io/claude-websites/real-estate/ |

The landing page at https://grualek.github.io/claude-websites/ (from `portal/index.html`) links to every site.

## Work on a site locally

```bash
cd sites/healthcare
npm install
npm run dev
```

## Publishing

`.github/workflows/deploy-pages.yml` builds every folder in `sites/` and publishes it to
`https://grualek.github.io/claude-websites/<folder-name>/`. One-time setup:
**Settings → Pages → Source: GitHub Actions**.

## Adding a new site

1. Create `sites/<name>/` with its own `package.json` whose `build` script outputs to `dist/`, using relative
   asset paths (Vite: `base: './'`).
2. Add a link to it in `portal/index.html`.
