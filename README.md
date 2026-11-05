# Leegality Product Listing App

Amazon-style product listing and detail pages built with React, Vite, and the [DummyJSON Products API](https://dummyjson.com/docs/products).

## Setup

```bash
pnpm install
pnpm dev
```

App runs at `http://localhost:5173`.

```bash
pnpm build
pnpm preview
```

## Features

- Product listing with category, price range, and brand filters
- Header search via `/products/search`
- Client-side pagination
- Product detail page with description and reviews
- Filter state kept in the URL so Back restores previous filters

## Assumptions

- Category is single-select (DummyJSON category endpoint accepts one category)
- Brands are multi-select and derived from the currently fetched product set
- Price filtering is client-side (API has no min/max price params)
- When search is active, products come from search; category/price/brand still apply client-side
- Without search, category uses `/products/category/{category}`; otherwise all products are fetched with `limit=0`

## Architecture

- `services/` — API calls with `fetch`
- `hooks/` — data fetching and URL-backed filter state
- `components/common` — shared UI (Header, Pagination, Loader, etc.)
- `components/product` — listing-specific UI
- `pages/` — route-level screens
- `routes/` — React Router config

No Redux or UI framework — local state + URL search params only.

## Improvements with more time

- Debounced live search
- Server-side pagination when not using client filters
- Image gallery on the detail page
- Skeleton loaders
- Unit tests for filter utilities and hooks
