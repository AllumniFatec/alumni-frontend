# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run start    # Run production server
npm run lint     # ESLint check
```

No test suite is configured.

## Architecture Overview

Next.js 15 App Router frontend for an alumni management system (FATEC Sorocaba). The backend runs separately at `http://localhost:3001` (configured via `NEXT_PUBLIC_API_BASE_URL`).

### Route Groups

- `src/app/(auth)/` — Public auth pages (`/sign-in`, `/sign-up`, `/forgot-password`, etc.)
- `src/app/(members)/` — Protected member area (`/members`, `/posts`, `/jobs`, `/events`, `/profile`, `/messages`, `/network`, `/admin`)

The middleware (`src/middleware.ts`) guards routes by checking for an `access_token` cookie — no token redirects to `/sign-in`, token on auth pages redirects to `/members`.

### API Layer

All HTTP calls go through a shared Axios instance (`src/lib/axiosInstance.ts`) with `withCredentials: true`. On 401, the interceptor calls `/auth/logout` and redirects to login. API classes live in `src/apis/` as static-method classes:

```typescript
// Pattern used throughout
static async getJobs(page = 1): Promise<JobsListResponse> {
  const response = await apiBase.get<JobsListResponse>("/job", { params: { page } });
  return response.data;
}
```

### State Management

- **Auth state** — `AuthContext` (`src/context/AuthContext.tsx`) exposed via `useAuth()`. Stores the current user fetched from `GET /auth/me`.
- **Server state** — TanStack React Query v5 for all data fetching, mutations, and cache invalidation. Infinite queries are used for paginated lists (posts, jobs, events).
- **Auth tokens** — Stored as httpOnly cookies by the backend; never managed on the client directly.

### Hooks Pattern

Custom hooks in `src/hooks/` wrap React Query calls for each domain:

```typescript
// Read
export function useJobs() {
  return useInfiniteQuery({ queryKey: ["jobs", "list"], ... });
}

// Write
export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: JobApi.createJob,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["jobs", "list"] }),
  });
}
```

Real-time features (`src/hooks/useChatSocket.ts`, `src/hooks/useNotificationSocket.ts`) use Socket.io with the origin from `src/lib/socketOrigin.ts`.

### Forms

react-hook-form + Zod everywhere. Schemas are defined inline with the form component using `zodResolver`.

### Styling

Tailwind CSS v4. Brand colors are defined as CSS variables in `src/app/globals.css` under `@theme` — use `text-primary`, `bg-secondary`, etc. UI primitives are Radix UI wrapped with Shadcn/ui in `src/components/ui/`. Icons from Lucide React (`lucide-react`) and React Icons (`react-icons`).

### Component Layout Shell

`MembersLayoutShell` (`src/components/MembersLayoutShell.tsx`) wraps all protected pages. It renders the `Header` and constrains content to `max-w-5xl` — except for `/admin` and `/messages` routes, which get full-width layouts.

### Key Config Files

- `src/config/routes.ts` — Typed route constants (`AuthRoutes`, `MembersRoutes`)
- `src/config/env.ts` — Typed env variable access (API base URL, app name/version)
- `src/models/` — TypeScript interfaces for all domain entities (User, Post, Job, Event, Chat, etc.)

### Images

User-uploaded images are hosted on Cloudinary. The Next.js image config allows `res.cloudinary.com` as a remote pattern.

### Path Alias

`@/*` maps to `src/*` — use it for all internal imports.
