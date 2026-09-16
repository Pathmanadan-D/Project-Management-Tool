# Opero — Project Context

---

## Project Overview

Opero is a modern SaaS project management and team collaboration platform.
Its purpose is to help teams manage projects, tasks, sprints, files, deadlines, reporting, and collaboration inside one unified workspace.

Main inspiration:
- Jira
- Asana
- Trello
- Linear

Opero combines:
- project tracking
- task management
- sprint planning
- team collaboration
- reporting
- productivity workflows
- AI-powered assistance

inside one system.

---

## Product Goal

Users should be able to:
- create workspace
- invite teammates
- create projects
- create tasks
- manage sprint workflow
- assign work to team members
- upload files
- collaborate through comments
- track project progress
- monitor deadlines
- view reports and analytics
- manage work from a clean dashboard
- use AI features inside the platform

---

## Core Modules

### 1. Authentication
Includes:
- register
- login
- logout
- password reset
- email verification

Auth Strategy:
- Supabase Auth is used for all authentication
- Auth session is managed via Supabase middleware in Next.js
- Protected routes are handled using Next.js middleware (`middleware.ts`)
- Unauthenticated users are redirected to `/login`

### 2. Workspace Management
Includes:
- create workspace
- workspace switcher
- workspace settings
- invite members
- manage roles and permissions

Roles:
- Admin
- Project Manager
- Member

### 3. Dashboard
Dashboard is the main overview page after login.

Purpose:
Provide quick visibility into workspace, project, and task health.

Shows:
- total tasks
- in progress tasks
- overdue tasks
- due this week
- recent projects
- task progress overview
- upcoming deadlines
- recent activity feed

Dashboard is summary-focused and navigation-focused.

### 4. Project Management
Users can:
- create project
- edit project
- archive project
- assign project members
- track project progress

Each project may contain:
- project details
- task list
- sprint information
- project files
- activity history

### 5. Task Management
Tasks include:
- title
- description
- assignee
- due date
- status
- priority
- labels
- attachments
- comments
- activity log

Task Status:
- To Do
- In Progress
- Review
- Done

Priority:
- Low
- Medium
- High

### 6. Project Views
Projects may support multiple views depending on context.

Views include:
- Board View
- List View
- Calendar View
- Sprint View
- Files View

### 7. Sprint Management
Includes:
- sprint backlog
- active sprint
- move task into sprint
- sprint progress tracking
- sprint completion workflow

### 8. Reports & Analytics
Includes:
- task progress reports
- completion charts
- overdue reporting
- project analytics
- sprint reporting

### 9. Team Collaboration
Includes:
- comments
- mentions
- activity logs
- notifications
- file collaboration

### 10. AI Features
AI may assist with:
- task description generation
- project summary generation
- productivity suggestions
- writing assistance

Powered by Gemini API.

Gemini API is always called server-side via a Next.js Server Action or API route.
Never call Gemini directly from the client.
API keys must never be exposed to the browser.

---

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ShadCN UI

### Backend
Supabase — used for:
- PostgreSQL database
- authentication
- storage
- realtime features

### Supabase Usage Pattern
- Supabase client for server components and server actions: `createServerClient` from `@supabase/ssr`
- Supabase client for client components: `createBrowserClient` from `@supabase/ssr`
- All database queries and mutations happen inside Server Actions or Route Handlers
- Never query Supabase directly inside client components
- Server Actions are the preferred pattern for form submissions and mutations

### Rich Text Editor
TipTap — used in:
- task descriptions
- comments
- notes

### Charts
Chart.js — used in:
- dashboard
- reports
- analytics

### Email
Email.js — used for:
- invite emails
- contact forms
- notification emails

### AI
Gemini API
- Always called server-side
- Never from client components

### Deployment
Vercel

### Version Control
- Git
- GitHub

### Development Tool
Cursor AI

---

### Storage
Supabase Storage is used for all file and image uploads.

Buckets:
- `avatars` — user profile pictures
- `project-files` — project file attachments
- `task-attachments` — task-level file and image uploads

Storage Rules:
- All uploads happen server-side via Server Actions
- Never upload directly from client to Supabase Storage
- Always return the public URL after upload and save it to the database
- Use Supabase Storage public URLs for displaying images
- Images are served via Supabase CDN URL

Profile/Avatar: stored in `avatars` bucket
Project cover images: stored in `project-files` bucket  
Task attachments (images/files): stored in `task-attachments` bucket

---

## Project Folder Structure

Follow this folder structure consistently across the entire codebase:

```
/app                    → Next.js App Router pages and layouts
  /(auth)               → Auth routes (login, register, reset)
  /(dashboard)          → Protected app routes
    /dashboard          → Main dashboard page
    /projects           → Project pages
    /tasks              → Task pages
    /sprints            → Sprint pages
    /reports            → Reports and analytics
    /settings           → Workspace and user settings
  /api                  → Next.js API route handlers

/components             → Shared reusable UI components
  /ui                   → ShadCN base components (do not modify directly)
  /shared               → Custom shared components used across features

/features               → Feature-specific components and logic
  /auth                 → Auth feature components
  /workspace            → Workspace feature components
  /projects             → Project feature components
  /tasks                → Task feature components
  /sprints              → Sprint feature components
  /dashboard            → Dashboard feature components
  /reports              → Reports feature components

/hooks                  → Custom React hooks

/lib                    → Supabase client setup, utility libraries
  /supabase             → Supabase client helpers (server, browser)

/services               → Business logic and data access functions
  /supabase             → Supabase query functions per domain

/actions                → Next.js Server Actions (mutations and form handling)

/types                  → Global TypeScript type definitions

/constants              → Shared constants and enums

/utils                  → Pure utility/helper functions
```

---

## UI Design System

### Design Direction
Opero should feel like a modern professional SaaS platform.
Inspired by Jira and Linear.

Design should feel:
- clean
- structured
- minimal
- premium
- professional
- fast
- productivity-focused
- responsive
- modern
- consistent spacing

Use:
- soft rounded corners
- generous spacing
- subtle borders
- lightweight shadows
- clean layouts

Avoid unnecessary visual complexity.
Design should feel lightweight but powerful.

### Theme Support
Support:
- Light mode
- Dark mode

Theme must remain visually consistent across all modules.

---

## Theme & Color System

### Brand Color
Primary Blue: `#3B82F6`
Primary Blue Hover: `#2563EB`

Use blue for:
- primary buttons
- active navigation states
- links
- selected tabs
- focus rings
- key highlights
- important actions

### Light Theme
- Background: `#FFFFFF`
- Secondary Background: `#F8FAFC`
- Card Background: `#FFFFFF`
- Border: `#E2E8F0`
- Primary Text: `#111827`
- Secondary Text: `#6B7280`

Light theme should feel: bright, clean, spacious, professional, modern SaaS.

Use:
- soft shadows
- subtle borders
- generous whitespace
- rounded corners
- clean layouts

### Dark Theme
- Background: `#0F172A`
- Secondary Background: `#111827`
- Card Background: `#1E293B`
- Border: `#334155`
- Primary Text: `#F9FAFB`
- Secondary Text: `#CBD5E1`

Dark theme should feel: premium, modern, focused, elegant.

Use:
- dark navy surfaces
- brighter blue accents
- soft contrast
- readable typography
- subtle shadows

Avoid pure black backgrounds.
Use dark navy surfaces and blue accents.

---

## UI Rules

### Buttons
Primary CTA:
- blue background
- white text

Secondary Button:
- neutral background
- subtle border

Hover:
- slightly darker
- smooth transition

### Cards
Cards should have:
- rounded corners
- soft shadows
- subtle borders
- clear spacing

Avoid heavy borders or overly colorful cards.

### Typography
Preferred font: Inter
Fallback: sans-serif

Typography should feel:
- clean
- modern
- readable
- clear in dense workspace layouts

### Motion & Interaction
Use subtle motion only where it improves usability.

Prefer:
- soft transitions
- elegant hover feedback
- smooth interactions
- lightweight motion

Avoid:
- dramatic animations
- excessive movement
- distracting effects

Motion should support usability and clarity.

### UI Effects
Use carefully where needed:
- glassmorphism effect for hero/dashboard preview cards
- backdrop blur
- soft shadows
- hover animations
- smooth transitions
- consistent border radius
- clean card layouts

Avoid over-design.
Keep UI productivity focused.

---

## Responsive Layout
Desktop-first responsive design preferred.

Primary experience:
- Desktop
- Laptop

Secondary:
- Tablet

Basic support:
- Mobile

Mobile usability should be supported, but core experience is optimized for desktop workflows.

---

## UI Development Workflow

### Level 1 — Functional UI
Purpose: Build fast and validate functionality.

Focus on:
- backend connectivity
- API integration
- routing
- state management
- data rendering
- business logic

UI should be:
- simple
- clean
- readable
- minimal

This level exists to verify that the feature works correctly.
Visual polish is not required here.

### Level 2 — Final Working UI
Purpose: Convert feature into intended product UI.

Focus on:
- layout
- spacing
- typography
- color usage
- overall page quality
- visual consistency
- reusable components where appropriate

This should be treated as current final UI during development.
Reuse existing components when suitable.
Create new components when necessary.
If some areas are not visually perfect yet, it is acceptable to continue development and improve later.
Do not spend excessive time polishing small UI details during feature development.
Prioritize feature completion and overall product progress.

### UI Polish During Development
Deep UI polish is not required during active feature development.

Minor imperfections are acceptable if:
- functionality works
- layout is stable
- UI feels clear
- user experience is usable

Avoid spending excessive time polishing small UI details while building features.
A dedicated UI polish pass will happen after major feature development is complete.

Until then: Level 2 UI should be treated as target implementation quality.

---

## UI Consistency

The entire platform must maintain one consistent design language across all pages, modules, and future sprint development.
Consistency is a core product requirement.
All UI should feel like one unified modern SaaS product.

### Consistency Requirements
Every new page, feature, and component must match the existing UI system.

Consistency applies to:
- layout
- spacing
- typography
- buttons
- cards
- inputs
- tables
- modals
- tabs
- navigation
- icons
- colors
- border radius
- shadows
- hover states
- interaction behavior

### Component Reuse Rule
Before creating a new component, check whether a similar component already exists in the project.

Reuse existing components only when:
- visual style matches closely
- behavior matches
- size or layout matches
- minimal overrides are needed

If major structural overrides are required, prefer creating a local component instead of forcing reuse.
Prefer practical reuse over forced reuse.

For common UI patterns such as buttons, inputs, cards, badges, modals, tables, dropdowns:
- if differences are only color, size, state, or icon placement → extend existing components using props or variants
- if structure differs significantly → create a separate component

Do not automatically extract reusable components during first implementation.
Build locally first.
Reuse after repeated usage becomes clear.
Avoid over-abstraction too early.

---

## AI Development Rule
When generating UI with Cursor AI or other AI-assisted tools:
all generated code must follow the existing platform design language.
AI should not introduce a different visual style per page, sprint, or module.
Every feature should feel like part of the same product.

Goal: one product → one design system → one consistent experience

---

## Data Architecture Principles
Use Supabase as the single source of truth for application data.

Database structure should remain:
- scalable
- clean
- maintainable
- relational where appropriate

Avoid duplicated data unless needed for performance optimization.

Separate responsibilities clearly between:
- UI layer
- business logic
- API/server actions
- database access

Keep data flow predictable and maintainable.

---

## Code Organization
Follow consistent project structure across the codebase.
Prefer organization by feature or domain where appropriate.

Keep:
- reusable UI components isolated
- business logic separated from UI
- API/server actions separated from presentation layer
- utilities inside shared utility folders
- reusable constants centralized

Avoid:
- deeply nested folders
- duplicated logic
- messy styling
- hardcoded repeated values
- unnecessary complexity
- over-engineering

---

## Development Principles
Always aim for:
- clean architecture
- modular code
- readable code
- scalable code
- maintainable structure
- practical solutions
- fast iteration
- feature completion

Prioritize:
- consistency
- usability
- maintainability
- product progress

When unsure: prefer practical implementation over unnecessary complexity.

---

## Product Feel
Opero should feel like:
- Jira's structure
- Asana's usability
- Linear's speed

Overall product feeling: clean, fast, focused, modern, premium, professional