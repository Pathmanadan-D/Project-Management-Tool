# Opero — Sprint 1 Authentication
# Main Task Control File

---

## How to Use With Cursor

For every task use this prompt:
"Start [Task X.X] from sprint-1-auth.md. Read sprint-1-details.md for full task details."

After task is done — mark [x] and move to next task.
Never skip a priority. Never combine tasks into one prompt.

---

## Dependency Gates

| Priority | Gate Type | Rule |
|---|---|---|
| Priority 1–3 | Hard Dependency Gate | 100% complete before moving forward |
| Priority 4–10 | Functionally Complete Gate | Core must work — minor UI bugs do not block next priority |
| Priority 11 | Testing Gate | All priorities functionally complete before testing |

---

## Priority 1 — Project Foundation

- [ ] Task 1.1 — Create Next.js project with TypeScript and App Router
- [ ] Task 1.2 — Configure Tailwind CSS and verify it works
- [ ] Task 1.3 — Install and initialise ShadCN UI. Add base components
- [ ] Task 1.4 — Create Supabase project. Get project URL and anon key
- [ ] Task 1.5 — Install Supabase packages
- [ ] Task 1.6 — Create `.env.local` with Supabase credentials
- [ ] Task 1.7 — Create Supabase server client and browser client
- [ ] Task 1.8 — Verify Supabase connection works

---

## Foundation Verification

[ ] Task F1 - Audit Foundation Setup Against Sprint 1 Requirements

---

## Priority 2 — Authentication Database

- [ ] Task 2.1 — Enable Supabase Auth in dashboard
- [ ] Task 2.2 — Configure email verification settings
- [ ] Task 2.3 — Configure Google OAuth provider
- [ ] Task 2.4 — Create `profiles` table
- [ ] Task 2.5 — Enable RLS on profiles table
- [ ] Task 2.6 — Create RLS policy — select own profile
- [ ] Task 2.7 — Create RLS policy — insert own profile
- [ ] Task 2.8 — Create RLS policy — update own profile
- [ ] Task 2.9 — Create auto-insert trigger
- [ ] Task 2.10 — Test database structure

---

## Priority 3 — Project Architecture

- [ ] Task 3.1 — Create App Router folder structure
- [ ] Task 3.2 — Create all route folders
- [ ] Task 3.3 — Create dashboard placeholder page
- [ ] Task 3.4 — Create shared Auth Layout
- [ ] Task 3.5 — Add basic page.tsx placeholder in every route folder
- [ ] Task 3.6 — Create skeleton middleware.ts
- [ ] Task 3.7 — Create skeleton protected route logic
- [ ] Task 3.8 — Create auth helper functions
- [ ] Task 3.9 — Verify all routes resolve in browser

---

## Priority 4 — Registration Module

- [ ] Task 4.1 — Build Register form UI
- [ ] Task 4.2 — Add password strength bar
- [ ] Task 4.3 — Add confirm password match indicator
- [ ] Task 4.4 — Add client-side validation
- [ ] Task 4.5 — Create signUp server action
- [ ] Task 4.6 — Connect Register form to server action
- [ ] Task 4.7 — Build Check Inbox state
- [ ] Task 4.8 — Build Resend Email button with cooldown timer
- [ ] Task 4.9 — Add "Use a different email" link
- [ ] Task 4.10 — Implement Google OAuth registration
- [ ] Task 4.11 — Test full registration flow
- [ ] Task 4.12 — Extract reusable auth components

---

## Priority 5 — Login Module

- [ ] Task 5.1 — Build Login form UI
- [ ] Task 5.2 — Add client-side validation
- [ ] Task 5.3 — Create signIn server action
- [ ] Task 5.4 — Connect Login form to server action
- [ ] Task 5.5 — Configure Remember Me behaviour
- [ ] Task 5.6 — Handle all error states
- [ ] Task 5.7 — Verify session cookie is created correctly
- [ ] Task 5.8 — Implement Google Login
- [ ] Task 5.9 — Redirect to /dashboard on successful login
- [ ] Task 5.10 — Test full login flow
- [ ] Task 5.11 — Refactor login page to reuse shared auth components

---

## Priority 6 — Forgot Password Module

- [ ] Task 6.1 — Build Forgot Password UI
- [ ] Task 6.2 — Create resetPasswordRequest server action
- [ ] Task 6.3 — Connect form to server action
- [ ] Task 6.4 — Build Check Inbox state
- [ ] Task 6.5 — Add Resend Reset Email button
- [ ] Task 6.6 — Handle Google OAuth user edge case
- [ ] Task 6.7 — Test forgot password flow

---

## Priority 7 — Reset Password Module

- [ ] Task 7.1 — Build Reset Password UI
- [ ] Task 7.2 — Add client-side validation
- [ ] Task 7.3 — Create updatePassword server action
- [ ] Task 7.4 — Connect form to server action
- [ ] Task 7.5 — Show success message and auto redirect
- [ ] Task 7.6 — Build expired token state UI
- [ ] Task 7.7 — Build invalid token state UI
- [ ] Task 7.8 — Test reset password flow

---

## Priority 8 — Verify Email Module
> ⚠️ CONDITIONAL — Complete Task 8.1 first before planning remaining tasks.
> Scope of this phase depends on Task 8.1 result.

- [ ] Task 8.1 — ⚠️ CONFIRM FIRST: Test Supabase email verification redirect behaviour
- [ ] Task 8.2 — Build Verify Email page shell
- [ ] Task 8.3 — Build Success state UI
- [ ] Task 8.4 — Build Already Used state UI
- [ ] Task 8.5 — Build Expired state UI
- [ ] Task 8.6 — Build Invalid state UI
- [ ] Task 8.7 — Wire token validation to Supabase
- [ ] Task 8.8 — Test all token states

---

## Priority 9 — Placeholder Pages

- [ ] Task 9.1 — Build Privacy Policy static page
- [ ] Task 9.2 — Build Terms of Service static page

---

## Priority 10 — Session & Security

- [ ] Task 10.1 — Harden middleware.ts
- [ ] Task 10.2 — Redirect unauthenticated users to /login
- [ ] Task 10.3 — Redirect authenticated users away from /login and /register
- [ ] Task 10.4 — Implement session refresh
- [ ] Task 10.5 — Implement Logout
- [ ] Task 10.6 — Verify httpOnly cookie and JWT security
- [ ] Task 10.7 — Test middleware behaviour

---

## Priority 11 — Testing

- [ ] Task 11.1 — Full Register flow test
- [ ] Task 11.2 — Email verification test
- [ ] Task 11.3 — Full Login test
- [ ] Task 11.4 — Google OAuth test
- [ ] Task 11.5 — Forgot Password test
- [ ] Task 11.6 — Reset Password test
- [ ] Task 11.7 — Session expiry test
- [ ] Task 11.8 — Logout test

---

## Sprint 1 Progress

| Phase | Tasks | Done | Status |
|---|---|---|---|
| Priority 1 — Project Foundation | 10 | 0 | ⬜ Not Started |
| Priority 2 — Authentication Database | 10 | 0 | ⬜ Not Started |
| Priority 3 — Project Architecture | 9 | 0 | ⬜ Not Started |
| Priority 4 — Registration Module | 12 | 0 | ⬜ Not Started |
| Priority 5 — Login Module | 11 | 0 | ⬜ Not Started |
| Priority 6 — Forgot Password Module | 7 | 0 | ⬜ Not Started |
| Priority 7 — Reset Password Module | 8 | 0 | ⬜ Not Started |
| Priority 8 — Verify Email Module | 8 | 0 | ⬜ Conditional |
| Priority 9 — Placeholder Pages | 2 | 0 | ⬜ Not Started |
| Priority 10 — Session & Security | 7 | 0 | ⬜ Not Started |
| Priority 11 — Testing | 8 | 0 | ⬜ Not Started |
| **Total** | **92** | **0** | |

---

## Development Rule

```
Foundation → Database → Architecture → Register → Login → Forgot Password → Reset Password → Verify Email → Placeholder Pages → Security → Testing
```