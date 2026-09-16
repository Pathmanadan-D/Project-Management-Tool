# Opero — Development Rules

---

## Purpose

This file defines the coding, UI, architecture, and development rules for Opero.

These rules must be followed across the entire codebase to keep the product clean, scalable, maintainable, and visually consistent.

These rules apply to:
- all pages
- all components
- all modules
- all new features
- all refactoring
- all AI-generated code
- all future development

---

## 1. General Development Principles

Always prioritize:
- clean architecture
- readability
- maintainability
- scalability
- consistency
- reusability
- simplicity
- fast iteration

Prefer practical implementation over unnecessary complexity.
Avoid over-engineering.
Build for long-term maintainability.

---

## 2. TypeScript Rules

Always use explicit TypeScript types throughout the codebase.

### Strict Rules
- Never use `any` type — ever
- Always define prop types for every component
- Always define return types for functions when not immediately obvious
- Use TypeScript `interface` for object shapes and component props
- Use TypeScript `type` for unions, intersections, and utility types
- All global types go inside `/types` folder
- Feature-specific types can live inside their feature folder

### Examples

Prefer:
```ts
interface Task {
  id: string
  title: string
  status: TaskStatus
  priority: Priority
  assigneeId: string | null
  dueDate: string | null
}

type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done'
type Priority = 'low' | 'medium' | 'high'
```

Avoid:
```ts
const task: any = {}
function getTask(id: any): any {}
```

---


## Image & File Handling Rules

### Upload Rules
- All file and image uploads go through Supabase Storage
- Uploads always happen inside a Server Action — never directly from client
- Always validate file type and size before uploading
- Accepted image types: jpg, jpeg, png, webp
- Max image size: 5MB (unless specified otherwise per feature)
- After upload, always save the returned public URL to the database

### Displaying Images
- Always use Next.js `<Image />` component — never a raw `<img>` tag
- Always provide `width`, `height`, and `alt` props
- For unknown dimensions use `fill` with a positioned parent container
- Add Supabase Storage domain to `next.config.js` under `images.remotePatterns`

### next.config.js pattern
Always add this for Supabase image domains:
```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '*.supabase.co',
      pathname: '/storage/v1/object/public/**',
    },
  ],
}
```

### Naming & Path Rules
- Use unique file names on upload: `{userId}-{timestamp}-{originalName}`
- Never use the original filename directly — prevents collisions
- Folder structure inside buckets mirrors the app domain:
  - `avatars/{userId}/avatar.webp`
  - `project-files/{projectId}/{fileName}`
  - `task-attachments/{taskId}/{fileName}`

### Cleanup Rules
- When a record is deleted, delete its associated storage files too
- Never leave orphaned files in storage

---


## 3. Import Rules

Use absolute imports consistently across the entire codebase.

Always use `@/` path alias — never relative `../../../` paths.

### Correct
```ts
import { TaskCard } from '@/features/tasks/components/TaskCard'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/utils/date'
import type { Task } from '@/types/task'
```

### Avoid
```ts
import { TaskCard } from '../../../features/tasks/components/TaskCard'
import { createClient } from '../../lib/supabase/server'
```

Ensure `tsconfig.json` has the `@/` path alias configured:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 4. Next.js App Router Rules

### Server vs Client Components

Default to Server Components for everything.
Only add `'use client'` when strictly required.

Add `'use client'` only when the component needs:
- React state (`useState`, `useReducer`)
- React effects (`useEffect`)
- Browser APIs (`window`, `localStorage`, etc.)
- Event listeners
- Client-side interactivity

If a component only fetches data or renders UI without interactivity:
keep it a Server Component.

### Correct
```tsx
// Server Component — no 'use client' needed
export default async function ProjectList() {
  const projects = await getProjects()
  return <div>{projects.map(p => <ProjectCard key={p.id} project={p} />)}</div>
}
```

```tsx
'use client'
// Client Component — needs state
export function TaskStatusToggle({ taskId }: { taskId: string }) {
  const [status, setStatus] = useState<TaskStatus>('todo')
  ...
}
```

### Data Fetching Rules
- Fetch data in Server Components whenever possible
- Use Server Actions for all mutations (create, update, delete)
- Use Route Handlers (`/app/api/`) only when a REST endpoint is explicitly needed (e.g. webhooks, external integrations)
- Never fetch Supabase data directly inside Client Components
- Pass fetched data down as props from Server to Client Components when needed

### Server Actions
- All Server Actions live inside `/actions` folder
- Server Actions handle all form submissions and data mutations
- Always validate inputs inside Server Actions before database operations
- Return structured responses: `{ success: true, data }` or `{ success: false, error: string }`

---

## 5. Code Structure Rules

Code should always be:
- neat
- structured
- readable
- predictable
- easy to maintain

Avoid messy files.
Avoid giant components doing too many things.
Keep responsibilities separated.

### Preferred Folder Structure
```
/app                    → Next.js App Router pages and layouts
/components             → Shared reusable UI components
  /ui                   → ShadCN base components
  /shared               → Custom shared components
/features               → Feature-specific components and logic
/hooks                  → Custom React hooks
/lib                    → Supabase client setup, utility libraries
/services               → Business logic and data access functions
/actions                → Next.js Server Actions
/types                  → Global TypeScript types
/constants              → Shared constants and enums
/utils                  → Pure utility/helper functions
```

---

## 6. Component Rules

Build reusable components whenever reuse makes sense.

Before creating a component, ask:
- does this already exist?
- can an existing component be reused?
- can this be shared elsewhere?

If yes → reuse existing component.
If no → create a new reusable component.

### Component Guidelines
Components should be:
- small
- focused
- reusable
- easy to understand
- easy to modify

Each component should have one clear responsibility.
Avoid oversized components.
Split when needed.

---

## 7. UI Consistency Rules

Consistency is mandatory.
Every page should feel like part of one unified product.
Never design each page differently.

### Keep Consistent
Maintain consistency in:
- spacing
- padding
- margin
- typography
- buttons
- cards
- forms
- modals
- dropdowns
- tables
- tabs
- colors
- border radius
- shadows
- icon sizing
- hover states
- empty states
- loading states

---

## 8. Styling Rules

Use Tailwind CSS consistently.
Prefer utility classes over scattered custom CSS.
Avoid random one-off styling unless necessary.

### Prefer
- reusable utility patterns
- consistent spacing scale
- shared layout containers
- design tokens
- centralized color usage

### Avoid
- duplicated styles
- inconsistent spacing
- random padding values
- multiple button styles for the same purpose
- unnecessary visual noise

---

## 9. Naming Rules

Use clear, readable naming.
Names should explain purpose immediately.

### Variables
Prefer:
```ts
projectList
taskStatus
workspaceMembers
activeSprint
isLoading
hasError
```

Avoid:
```ts
data
item
value
temp
test
x
flag
```

### Components
Prefer:
```tsx
TaskCard
ProjectHeader
WorkspaceSwitcher
SprintBoard
ProjectStatsCard
TaskStatusBadge
```

### Functions
Prefer:
```ts
createTask()
updateProjectStatus()
deleteWorkspaceMember()
getProjectAnalytics()
fetchActiveSprint()
```

### Server Actions
Prefix with verb, be explicit:
```ts
createTaskAction()
updateTaskStatusAction()
deleteProjectAction()
inviteMemberAction()
```

---

## 10. Comment Rules

Use comments where they improve clarity.
Comments should explain **why**, not obvious code behavior.

Good:
```ts
// Group tasks by status for Kanban column rendering
// Filter out archived projects from the workspace view
// Gemini prompt is sent server-side to avoid exposing API key
```

Avoid:
```ts
// increment i
i++
// set loading to true
setIsLoading(true)
```

Use comments especially for:
- complex business logic
- database query logic
- edge cases
- permission checks
- filtering logic
- AI integration logic

---

## 11. Reusability Rules

Avoid duplication whenever possible.

If logic repeats → extract it.

Can be extracted into:
- component
- custom hook
- utility function
- shared constant
- service helper

Prefer reuse over copy-paste.

---

## 12. State Management Rules

Keep state close to where it is needed.
Avoid unnecessary global state.
Prefer simple state first.
Use shared/global state only when truly required.
Avoid deeply nested prop drilling when component sharing becomes difficult.

### State Hierarchy
1. Local component state (`useState`) — always try this first
2. Shared parent state (lift state up) — when siblings need it
3. React Context — when many components across a subtree need it
4. Global state library — only if Context becomes insufficient

---

## 13. Error Handling Rules

Always handle all three states for every major feature:
- loading state
- empty state
- error state

### User-Facing Errors
- Use ShadCN toast notifications (via Sonner) for user-facing success and error messages
- Keep toast messages short and clear
- Success: green/neutral tone
- Error: destructive/red tone

### Server-Side Errors
- Log server errors to console during development
- Return structured error responses from Server Actions: `{ success: false, error: 'message' }`
- Never expose raw database or system error messages to the client

### Example Pattern
```ts
// Server Action
export async function createTaskAction(data: CreateTaskInput) {
  try {
    const task = await insertTask(data)
    return { success: true, data: task }
  } catch (error) {
    console.error('createTaskAction error:', error)
    return { success: false, error: 'Failed to create task. Please try again.' }
  }
}
```

```tsx
// Client Component
const result = await createTaskAction(formData)
if (!result.success) {
  toast.error(result.error)
  return
}
toast.success('Task created successfully')
```

Never leave blank or broken UI when an error occurs.

---

## 14. Database & Data Rules

Supabase is the single source of truth.

Keep database structure:
- clean
- relational
- scalable
- maintainable

Avoid duplicate records unless needed for performance.
Use clear table relationships.
Keep queries predictable.

### Supabase Query Rules
- All Supabase queries go inside `/services` or `/actions` — never inside components
- Use `createServerClient` for server-side queries (Server Components, Server Actions, Route Handlers)
- Use `createBrowserClient` for client-side subscriptions only (realtime features)
- Always handle Supabase errors: check `error` from every query response

```ts
const { data, error } = await supabase.from('tasks').select('*')
if (error) {
  console.error('fetchTasks error:', error)
  throw new Error('Failed to fetch tasks')
}
```

---

## 15. API & Business Logic Rules

Business logic must not be mixed inside UI components.

Separate clearly:
- UI rendering → `/features` and `/components`
- business logic → `/services`
- database access → `/services` and `/lib`
- mutations → `/actions` (Server Actions)
- utility functions → `/utils`

UI should stay presentation-focused.
Logic should stay in services and actions.

---

## 16. AI Integration Rules

Gemini API is always called server-side.

Rules:
- Never call Gemini from a Client Component
- All Gemini calls happen inside Server Actions or Route Handlers
- Never expose the Gemini API key to the browser
- Keep AI prompts inside `/services/ai` or `/actions`
- Always handle AI errors gracefully — show a user-friendly message if generation fails
- AI responses should be treated as untrusted input — validate and sanitize before storing

---

## 17. Responsive Rules

Primary focus:
- desktop
- laptop

Secondary:
- tablet

Basic support:
- mobile

Even if mobile is simplified, it must remain usable.
Avoid breaking layouts on smaller screens even if mobile is not the primary target.

---

## 18. Performance Rules

Prefer efficient rendering.

Avoid:
- unnecessary re-renders
- unnecessary database calls
- duplicated fetching
- deeply nested heavy components

Optimize only when useful.
Avoid premature optimization.

Use `React.memo`, `useMemo`, `useCallback` only when a real performance issue is identified — not by default.

---

## 19. Cursor AI Generation Rules

All AI-generated code must follow the existing project structure and design system.

Cursor must NOT:
- invent new UI styles per page
- use inconsistent spacing
- introduce different card styles
- create random button patterns
- generate duplicate components unnecessarily
- add `any` types
- use relative imports instead of `@/` absolute imports
- add `'use client'` unnecessarily to Server Components
- call Supabase or Gemini directly from Client Components

Every generated feature must match the existing Opero design language and code architecture.

### AI Output Goal
Every generated screen should feel like:
- same product
- same team
- same design system
- same code architecture

---

## 20. Bug Fixing Rules

When fixing bugs:
always identify the root cause first before editing code.

Only modify files directly related to the issue.

Avoid touching unrelated files, components, styles, logic, or working features.

Do not refactor unrelated working code while fixing a bug.
Do not rewrite stable code unless required for the bug fix.

Prefer the smallest safe fix possible.
Preserve existing working behavior.

If a file is already working correctly: leave it unchanged.

Bug fixing should be:
- minimal
- targeted
- isolated
- safe

Goal: fix the issue without breaking existing functionality elsewhere.

---

## 21. Maintainability Rules

Future developers should be able to understand code quickly.

Write code that is easy to:
- read
- debug
- extend
- refactor

Prioritize clarity over cleverness.

Readable > clever.

---

## Summary of Key Rules

| Rule | Standard |
|---|---|
| TypeScript | Always explicit types. Never `any`. |
| Imports | Always use `@/` absolute imports. |
| Components | Default to Server Components. Use `'use client'` only when needed. |
| Data fetching | Server Components and Server Actions only. Never in Client Components. |
| Supabase | `createServerClient` server-side. `createBrowserClient` client-side realtime only. |
| Gemini AI | Server-side only. Never from client. |
| Errors | Always handle loading, empty, error states. Use Sonner toasts for user feedback. |
| Naming | Explicit, descriptive names. No `data`, `item`, `any`. |
| Styling | Tailwind utility classes. Consistent spacing. No random one-off styles. |
| Bug fixes | Minimal, targeted, isolated. Never touch unrelated code. |