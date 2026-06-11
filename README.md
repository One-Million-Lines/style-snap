# SnapStyle

## Project Name

SnapStyle (`style-snap`)

## What it does

SnapStyle is a frontend prototype for a template-led photo transformation app. Users can browse style categories, upload an image, pick a template, view simulated results, and build a share card.

## Why it exists

This project focuses on the product experience for an image transformation workflow before wiring in a real generation backend.

## Features

- Home page with featured template sections
- Template collections for portraits, viral/social trends, and business use cases
- Photo upload via drag and drop or file picker
- Style selection from local template data
- Simulated result gallery with before/after mode
- Favorite toggles and local download action
- Sharecard builder with multiple layouts and background colors
- Page metadata managed with `react-helmet-async`

## How it works

1. Template definitions live in `src/data/templates.ts`.
2. The upload page stores the chosen image and template in `sessionStorage`.
3. The results page reads that session data and renders six simulated variations.
4. Sharecard creation is handled entirely in the browser.

There is currently no backend image generation service in this repo.

## Tech stack

- Vite
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- TanStack Query
- `react-helmet-async`

## Project structure

```text
style-snap/
├── src/
│   ├── components/   # marketing, template, and sharecard UI
│   ├── data/         # local template dataset
│   ├── pages/        # landing, category, upload, results pages
│   └── lib/          # shared helpers
└── public/           # static assets
```

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:5304`.

## Configuration

No project-specific environment variables are required.

## Usage

1. Browse templates from the homepage or category pages.
2. Go to the upload flow.
3. Upload an image and select a template.
4. Generate the demo results view.
5. Compare before/after, download, or open the sharecard builder.

## Development

- `npm run dev` — start Vite
- `npm run build` — create a production build
- `npm run lint` — run ESLint
- `npm run preview` — preview the built app

## Roadmap

- Replace simulated results with a real generation pipeline
- Persist generations and favorites
- Add template search and filtering
- Export richer share assets

## Contributing

Contributions are welcome. See `CONTRIBUTING.md`.

## License

MIT. See `LICENSE`.
