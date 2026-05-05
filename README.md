# Scalable React Admin Dashboard

A production-style admin dashboard built with Next.js App Router for browsing users with search, pagination, and detail views.

## Live Demo

- Add deployed URL here after Vercel/Netlify deployment: `https://dashboard-vert-phi-45.vercel.app/dashboard?page=1`

## Features Implemented

- User listing dashboard in table format
- User detail page (`/dashboard/[id]`)
- Search with debouncing (400ms) to reduce unnecessary requests
- Pagination with URL-based state (`page`, `search`)
- API integration via `dummyjson` users endpoints
- Loading states (`loading.tsx` + in-component loading UI)
- Error handling (`dashboard/error.tsx`, `global-error.tsx`)
- Responsive table layout with horizontal overflow support
- Route/component level code splitting

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- TanStack React Query

## Project Structure

```text
app/
  components/
    DashboardClient.tsx
    SearchBar.tsx
    UserTable.tsx
  dashboard/
    [id]/
      loading.tsx
      page.tsx
    error.tsx
    loading.tsx
    layout.tsx
    page.tsx
  lib/
    api/
      users.tsx
  global-error.tsx
  layout.tsx
  page.tsx
  providers.tsx
```

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run development server:

   ```bash
   npm run dev
   ```

3. Open:

   [http://localhost:3000](http://localhost:3000)

4. Build for production:

   ```bash
   npm run build
   npm run start
   ```

## Architecture Decisions

- **App Router + route segments:** Keeps listing and detail pages isolated and scalable.
- **API layer in `app/lib/api`:** Prevents inline API calls inside UI components and centralizes fetch logic.
- **URL as filter state source:** Search and pagination are encoded in query params, enabling deep links and shareable views.
- **Client dashboard shell:** Query-driven client component for responsive filtering/pagination while keeping route conventions clean.

## State Management Approach

TanStack React Query is used for server-state management on the dashboard listing page.

Why React Query:

- Handles async loading/error/data states in a structured way.
- Gives cache-based query keys (`["users", page, search]`) for predictable refetch behavior.
- Scales better than custom `useEffect` data fetching as feature complexity grows.

## Performance Considerations

- **Debounced search:** Reduces API calls during typing.
- **Code splitting:** Dashboard table is lazy loaded with dynamic import.
- **Query key caching:** Avoids redundant network fetches for the same state.
- **Narrow payload per request:** Uses `limit` and `skip` to avoid loading large datasets.

## Error Handling Strategy

- API layer throws explicit errors for failed responses.
- Route-level boundary at `app/dashboard/error.tsx` handles dashboard failures.
- Global boundary at `app/global-error.tsx` prevents full app crashes.
- User-facing fallback UI with retry action (`unstable_retry`) for recovery.

## Assumptions and Trade-offs

- Used pagination instead of infinite scrolling for simpler UX and URL-driven navigation.
- Server data source is public API (`dummyjson`) with no auth requirements.
- Minimal design system is used; focus is on usability and architecture over aesthetics.

## Deployment Notes

- Deploy on Vercel or Netlify.
- For this Next.js App Router setup, routing works correctly on refresh by default on Vercel.
- After deployment, update the **Live Demo** section with the final URL.
