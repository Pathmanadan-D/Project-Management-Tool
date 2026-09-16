# Opero — Sprint 1 Authentication
# Task Details File

---

## How to Use

This file contains full details for every task in sprint-1-auth.md.
When starting a task in Cursor, say:
"Start [Task X.X] from sprint-1-auth.md. Read sprint-1-details.md for full task details."

---

## Priority 1 — Project Foundation

---

### Task 1.1 — Create Next.js project with TypeScript and App Router

Goal:
Initialise the Opero Next.js project with correct configuration.

Requirements:
- Use `create-next-app` with TypeScript enabled
- Use App Router (not Pages Router)
- Project name: opero
- No src/ directory
- Tailwind selected during setup
- ESLint enabled

Output:
Working Next.js project that runs locally on localhost:3000

---

### Task 1.2 — Configure Tailwind CSS and verify it works

Goal:
Confirm Tailwind CSS is correctly configured and working.

Requirements:
- Verify `tailwind.config.ts` exists and covers `/app` and `/components` paths
- Verify `globals.css` has Tailwind directives: base, components, utilities
- Add a test class to the home page to confirm Tailwind is rendering
- Remove test class after confirming

Output:
Tailwind utility classes apply correctly to elements

---

### Task 1.3 — Install and initialise ShadCN UI. Add base components

Goal:
Set up ShadCN UI component library for the project.

Requirements:
- Initialise ShadCN using `npx shadcn@latest init`
- Style: Default
- Base color: Neutral
- Add these components: button, input, label, card
- Verify components appear under `/components/ui`

Output:
ShadCN components available and importable in the project

---

### Task 1.4 — Create Supabase project. Get project URL and anon key

Goal:
Create the Supabase backend project for Opero.

Requirements:
- Go to supabase.com and create a new project
- Project name: opero
- Save the Project URL
- Save the anon public key
- Save the service role key (keep this secret — never expose to client)

Output:
Supabase project exists with credentials ready for next task

---

### Task 1.5 — Install Supabase packages

Goal:
Add Supabase dependencies to the Next.js project.

Requirements:
- Install `@supabase/supabase-js`
- Install `@supabase/ssr`

Output:
Both packages present in package.json

---

### Task 1.6 — Create .env.local with Supabase credentials

Goal:
Store Supabase credentials as environment variables.

Requirements:
- Create `.env.local` in project root
- Add: `NEXT_PUBLIC_SUPABASE_URL`
- Add: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Add `NEXT_PUBLIC_SITE_URL= http://localhost:3000`
- Add: `SUPABASE_SERVICE_ROLE_KEY` (server only — never expose to client)
- Confirm `.env.local` is in `.gitignore`

Output:
Environment variables available to the application. Credentials not committed to Git.

---

### Task 1.7 — Create Supabase server client and browser client

Goal:
Set up reusable Supabase client helpers following the correct SSR pattern.

Requirements:
- Create `/lib/supabase/server.ts` — uses `createServerClient` from `@supabase/ssr`
- Create `/lib/supabase/client.ts` — uses `createBrowserClient` from `@supabase/ssr`
- Server client reads cookies from Next.js headers
- Browser client uses public env variables only
- Follow `@supabase/ssr` documentation patterns exactly

Output:
Two reusable Supabase client helpers ready to import across the project

---

### Task 1.8 — Verify Supabase connection works

Goal:
Confirm the Supabase connection is working correctly.

Requirements:
- In a temporary server component or server action, call a simple Supabase query
- Example: fetch from `profiles` table or call `supabase.auth.getSession()`
- Confirm no connection errors in terminal
- Remove test code after confirming

Output:
Supabase connection confirmed working. No errors.

---

## Task F1 - Audit Foundation Setup Against Sprint 1 Requirements

Goal:
Verify that all Foundation tasks (1.1 - 1.10) have been completed correctly and follow the Sprint 1 architecture requirements.

Requirements:
- Review project structure
- Review package.json
- Review Next.js configuration
- Review Tailwind configuration
- Review ShadCN setup
- Review Supabase setup
- Verify @supabase/ssr is installed
- Verify SSR client structure exists:
  /lib/supabase/client.ts
  /lib/supabase/server.ts
- Verify environment variables
- Verify GitHub repository
- Verify Vercel deployment

Output:
A checklist report showing:
✅ Correctly completed tasks
⚠️ Tasks needing correction
❌ Missing tasks

Acceptance Criteria:
All Foundation requirements are verified before Priority 2 begins.

---

## Priority 2 — Authentication Database

---

### Task 2.1 — Enable Supabase Auth in dashboard

Goal:
Confirm Supabase Auth is active and ready to use.

Requirements:
- Go to Supabase Dashboard → Authentication → Settings
- Confirm Auth is enabled
- Set Site URL to: `http://localhost:3000` for development
- Note: Update Site URL to production Vercel URL before going live
- Add http://localhost:3000/auth/callback to Redirect URLs in Supabase Auth settings

Output:
Supabase Auth is active and configured for the project

---

### Task 2.2 — Configure email verification settings

Goal:
Enable email confirmation so users must verify their email before logging in.

Requirements:
- Go to Supabase Dashboard → Authentication → Settings
- Enable "Confirm email" option
- Set email redirect URL according to Supabase SSR confirmation flow (confirm correct URL during Task 8.1 — do not hardcode /verify-email yet)
- Set verification token expiry to: 24 hours
- Customise verification email template if needed

Output:
Email verification is active. New registrations require email confirmation before login.

---

### Task 2.3 — Configure Google OAuth provider

Goal:
Enable Google Sign-In for registration and login.

Requirements:
- Go to Supabase Dashboard → Authentication → Providers → Google
- Enable Google provider
- Create Google OAuth credentials in Google Cloud Console
- Add Client ID and Client Secret to Supabase
- Add authorised redirect URI in Google Console: `https://<your-supabase-project>.supabase.co/auth/v1/callback`
- Add authorised redirect URI for local: `http://localhost:3000/auth/callback`
- Add http://localhost:3000/auth/callback as authorised redirect URI for local development
- Add https://your-vercel-url.vercel.app/auth/callback as authorised redirect URI for production

Output:
Google OAuth is enabled and configured. Ready to use in registration and login.

---

### Task 2.4 — Create profiles table

Goal:
Create the profiles table that extends Supabase auth.users with app-specific data.

Requirements:
Create table with these columns:
- `id` — UUID, primary key, references auth.users(id) on delete cascade
- `full_name` — text, not null
- `avatar_url` — text, nullable
- `role` — text, not null, default 'Member'
- `created_at` — timestamptz, default now()
- `updated_at` — timestamptz, default now()

Run in Supabase SQL Editor:
```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  avatar_url text,
  role text not null default 'Member',
  created_at timestamptz default now(),
  updated_at timestamptz default now() not null
);
```
Auto-update trigger for updated_at:

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
before update on profiles
for each row
execute function update_updated_at_column();

Output:
profiles table exists in Supabase database

---

### Task 2.5 — Enable RLS on profiles table

Goal:
Enable Row Level Security so users can only access their own profile data.

Requirements:
Run in Supabase SQL Editor:
```sql
alter table profiles enable row level security;
```
Note: No DELETE policy is added in Sprint 1. This is intentional.

Output:
RLS is active on profiles table. No data is accessible without an explicit policy.

---

### Task 2.6 — Create RLS policy — select own profile

Goal:
Allow users to read only their own profile row.

Requirements:
```sql
create policy "Users can view own profile"
on profiles
for select
using (auth.uid() = id);
```

Output:
Users can only SELECT their own profile. Other profiles are not accessible.

---

### Task 2.7 — Create RLS policy — insert own profile

Goal:
Allow users to insert only their own profile row.

Requirements:
```sql
create policy "Users can insert own profile"
on profiles
for insert
with check (auth.uid() = id);
```

Output:
Users can only INSERT a profile row matching their own auth ID.

---

### Task 2.8 — Create RLS policy — update own profile

Goal:
Allow users to update only their own profile row.

Requirements:
```sql
create policy "Users can update own profile"
on profiles
for update
using (auth.uid() = id);
```

Output:
Users can only UPDATE their own profile. Other profiles are protected.

---

### Task 2.9 — Create auto-insert trigger

Goal:
Automatically create a profiles row whenever a new user registers via Supabase Auth.

Requirements:
```sql
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

Output:
Every new Supabase Auth user automatically gets a corresponding profiles row created.

---

### Task 2.10 — Test database structure

Goal:
Confirm the full database setup works correctly end to end.

Test Cases:
1. Email registration → profiles row auto-created with correct full_name
2. Google registration → profiles row auto-created with name and avatar_url
3. Auto profile creation → confirm trigger fired and row exists in profiles table
4. Profile read access → user can read their own profile
5. Profile update access → user can update their own profile
6. Cross-user access blocked → user cannot read or update another user's profile

Output:
Database structure confirmed working. Auto-trigger works. RLS is enforced.

---

## Priority 3 — Project Architecture

---

### Task 3.1 — Create App Router folder structure

Goal:
Set up the top-level folder structure for the Next.js App Router.

Requirements:
Create these folders inside `/app`:
- `/(auth)` — all auth routes grouped here
- `/(dashboard)` — all protected app routes grouped here
- `/api` — API route handlers

Output:
Folder structure exists and matches the Opero project architecture

---

### Task 3.2 — Create all route folders

Goal:
Create every route folder needed for Sprint 1.

Requirements:
Create these route folders:
- `/app/(auth)/login`
- `/app/(auth)/register`
- `/app/(auth)/forgot-password`
- `/app/(auth)/reset-password`
- `/app/(auth)/verify-email`
- `/app/(dashboard)/dashboard`
- `/app/privacy-policy`
- `/app/terms-of-service`

Output:
All route folders exist in correct locations

---

### Task 3.3 — Create dashboard placeholder page

Goal:
Create a working dashboard placeholder so auth flows have a valid redirect target.
This must exist before any auth pages are built.

Requirements:
- Create `/app/(dashboard)/dashboard/page.tsx`
- Simple page — no real dashboard content yet
- Show: "Dashboard — Coming in Sprint 2"
- Create /app/(dashboard)/dashboard/page.tsx
- Show: "Dashboard — Coming in Sprint 2"
- Add a visible Logout button placeholder (no logic yet)
- No session logic at this stage
- User email display will be added during the Login/Session module
- Add a visible Logout button (wired up properly in Priority 10 — for now just show the button)

Output:
`/dashboard` route loads without errors. Auth flows can redirect here successfully.

---

#### Task 3.4 — Create Shared Auth Layout

Goal:
Create a single shared layout used by all auth pages to prevent duplicated structure.

Requirements:
- Create `/app/(auth)/layout.tsx`
- Centered card layout
- Opero logo at top of every auth page
- Logo click → navigates to `/` (landing page)
- Clean white/dark background consistent with Opero design system

Visual Design:
- Include subtle background illustration or gradient pattern
- Illustration must not distract from the form
- Maintain professional SaaS appearance
- Works in both light and dark mode
- Auth card remains the primary focus
- Responsive design (illustration may be hidden or simplified on mobile)

This layout wraps:
- login
- register
- forgot-password
- reset-password
- verify-email

Output:
All auth pages share one consistent layout. No duplicated page structure.
---

### Task 3.5 — Add basic page.tsx placeholder in every route folder

Goal:
Ensure every route returns a valid response so nothing throws a 404 during development.

Requirements:
Add a minimal `page.tsx` to every route that does not yet have one:
- `/app/(auth)/login/page.tsx` — "Login Page"
- `/app/(auth)/register/page.tsx` — "Register Page"
- `/app/(auth)/forgot-password/page.tsx` — "Forgot Password Page"
- `/app/(auth)/reset-password/page.tsx` — "Reset Password Page"
- `/app/(auth)/verify-email/page.tsx` — "Verify Email Page"
- `/app/privacy-policy/page.tsx` — "Privacy Policy"
- `/app/terms-of-service/page.tsx` — "Terms of Service"

Output:
Every route loads without a 404. Ready to be replaced with real pages.

---

### Task 3.6 — Create skeleton middleware.ts

Goal:
Create the middleware file in the correct location with basic structure.
No logic yet — just the skeleton so the file exists and is recognised by Next.js.

Requirements:
- Create `middleware.ts` in project root (same level as `/app`)
- Export a basic middleware function and config matcher
- No redirect logic yet — just pass through all requests
- Include a comment: "// Auth logic added in Priority 10"

Output:
`middleware.ts` exists and Next.js recognises it without errors

---

### Task 3.7 — Create skeleton protected route logic

Goal:
Create the structure for protected route handling without enforcing it yet.

Requirements:
- Create `/lib/supabase/middleware.ts` helper
- Function accepts request and checks for session
- Returns session or null
- No redirect enforcement yet — logic only
- Comment: "// Enforcement added in Priority 10"

Output:
Protected route helper exists as a function. Ready to be wired into middleware in Priority 10.

---

### Task 3.8 — Create auth helper functions

Goal:
Create reusable server-side helpers for reading auth session and user data.

Requirements:
Create `/lib/supabase/auth-helpers.ts` with these functions:
- `getSession()` — returns current session from Supabase server client
- `getUser()` — returns current user from Supabase server client
- Both functions use `createServerClient` from `/lib/supabase/server.ts`
- Both return null if no session exists (no throwing errors)
- Use explicit TypeScript return types

Output:
Auth helper functions available for use in server components and server actions

---

### Task 3.9 — Verify all routes resolve in browser

Goal:
Confirm every route works before building real page content.

Requirements:
- Visit every route in the browser:
  - `/login`
  - `/register`
  - `/forgot-password`
  - `/reset-password`
  - `/verify-email`
  - `/dashboard`
  - `/privacy-policy`
  - `/terms-of-service`
- Confirm no 404 errors
- Confirm no build errors in terminal
- Confirm shared Auth Layout renders correctly on all auth routes
- Confirm dashboard placeholder renders correctly
- Confirm no console errors in browser on any route

Output:
All routes load successfully. Project architecture is solid.

---

## Priority 4 — Registration Module

---

### Task 4.1 — Build Register form UI

Goal:
Build the visual register form. No backend connection yet.

Requirements:
Fields:
- Full Name input
- Email Address input
- Password input with eye toggle (show/hide)
- Confirm Password input with eye toggle
- Terms of Service checkbox
- Create Account button (disabled until checkbox is ticked)

Additional:
- OR divider
- Continue with Google button
- Bottom link: "Already have an account? Sign In" → `/login`
- Logo at top via shared Auth Layout

Design:
- Use ShadCN components: Input, Button, Label, Card
- Follow Opero design system (clean, minimal, professional)
- Button is grey/disabled when checkbox unchecked
- Button turns blue/active when checkbox is checked

Output:
Register form renders correctly. All fields visible. No backend connection yet.

---

### Task 4.2 — Add password strength bar

Goal:
Show real-time password strength feedback as the user types.

Requirements:
Strength levels:
- Weak (red) — less than 6 characters
- Medium (yellow) — 6+ characters, missing uppercase or number or special character
- Strong (green) — 8+ characters, has uppercase, number, and special character

Behaviour:
- Bar updates in real time as user types — no submit needed
- Color changes: red → yellow → green
- Label shows: "Weak" / "Medium" / "Strong"

Output:
Password strength bar renders and updates correctly as user types

---

### Task 4.3 — Add confirm password match indicator

Goal:
Show real-time feedback on whether the confirm password field matches.

Requirements:
- Updates in real time as user types in either password field
- Match: green checkmark + "Passwords match"
- No match: red X + "Passwords don't match"
- No indicator shown until user starts typing in confirm field

Output:
Match indicator renders and updates correctly in real time

---

### Task 4.4 — Add client-side validation

Goal:
Validate all fields before allowing form submission.

Requirements:
Validate on submit:
- Full name: not empty
- Email: not empty, valid format (must contain @ and domain)
- Password: not empty, must meet minimum strength (medium or above)
- Confirm password: must match password
- Terms checkbox: must be checked

Error display:
- Red border on invalid field
- Error message below the field
- All errors shown at once on submit attempt
- Errors clear when user corrects the field

Output:
Form validates correctly. Invalid submissions are blocked with clear error messages.

---

### Task 4.5 — Create signUp server action

Goal:
Create the server action that handles user registration with Supabase Auth.

Requirements:
- Create `/actions/auth/sign-up.ts`
- Accept: full_name, email, password
- Call `supabase.auth.signUp()` with email, password, and full_name in metadata
- Return `{ success: true }` on success
- Return `{ success: false, error: string }` on failure
- Handle: email already registered error
- Use explicit TypeScript types — no `any`
- Never expose raw Supabase error messages to the client
- After successful signup,set emailRedirectTo to: ${process.env.NEXT_PUBLIC_SITE_URL}/verify-email

Output:
signUp server action exists and handles registration correctly

---

### Task 4.6 — Connect Register form to server action

Goal:
Wire the register form to the signUp server action.

Requirements:
- Call signUp action on form submit (after client-side validation passes)
- Loading state: button text changes to "Creating account..." and is disabled
- On success: swap card to Check Inbox state (Task 4.7)
- On error: show error message below the button
- Error: "An account with this email already exists" if email is taken

Output:
Register form submits to Supabase. Loading state works. Errors display correctly.

---

### Task 4.7 — Build Check Inbox state

Goal:
After successful registration, swap the card content to the Check Inbox screen.

Requirements:
- No page navigation — card content swaps in place
- Show: envelope icon
- Show: "Check your inbox!" title
- Show: "We sent a verification link to:" + email address in bold
- Show: "Click the link in the email to continue setting up your account"
- Show: "Link expires in 24 hours"
- Show: Resend Email button (Task 4.8)
- Show: "Use a different email" link (Task 4.9)

Output:
Card swaps to Check Inbox state after successful form submission

---

### Task 4.8 — Build Resend Email button with cooldown timer

Goal:
Allow users to resend the verification email with a 60 second cooldown.

Requirements:
- Button shows: "Resend Email"
- After clicking: button is disabled, countdown shows "Resend available in 60s"
- Countdown ticks down each second: 60s → 59s → ... → 0s
- At 0: button becomes active again showing "Resend Email"
- On resend click: calls Supabase resend verification email
- Show success feedback: "Email sent!" after resend

Output:
Resend button works with 60 second cooldown. Countdown displays correctly.

---

### Task 4.9 — Add "Use a different email" link

Goal:
Allow the user to go back to the registration form from the Check Inbox state.

Requirements:
- Link text: "← Use a different email"
- Click → swaps card back to the registration form (State 1)
- Form is reset (all fields cleared)
- No page navigation

Output:
User can return to the registration form from the Check Inbox state

---

### Task 4.10 — Implement Google OAuth registration

Goal:
Allow users to register using their Google account.

Requirements:
- "Continue with Google" button triggers Supabase OAuth flow
- Call `supabase.auth.signInWithOAuth({ provider: 'google' })`
- On success: Supabase creates auth.users row and trigger creates profiles row
- Redirect to `/dashboard` after successful Google registration
- Handle errors: show toast if OAuth fails

Output:
Users can register with Google. Account is created. Redirect to dashboard works.

---

### Task 4.11 — Test full registration flow

Goal:
Confirm the complete registration flow works end to end.

Test cases:
- Register with valid details → Check Inbox state appears
- Verification email arrives in inbox
- Click verification link → account verified
- Login with registered credentials → redirects to dashboard
- Register with already used email → correct error shown
- Submit empty form → validation errors shown
- Google registration → account created → dashboard

Output:
All registration test cases pass. Flow works correctly end to end.

---

### Task 4.12 — Extract reusable auth components

Goal:
Identify and extract components that will be reused across Login, Forgot Password, and Reset Password pages.

Requirements:
Review the completed Register page and extract:
- Password input with eye toggle → `PasswordInput` component
- Password strength bar → `PasswordStrengthBar` component
- Auth card wrapper → `AuthCard` component (if not already in layout)
- Any other repeated patterns found during development

Place extracted components in `/features/auth/components/`

Output:
Reusable auth components extracted and importable. Register page refactored to use them.

---

## Priority 5 — Login Module

---

### Task 5.1 — Build Login form UI

Goal:
Build the visual login form. No backend connection yet.

Requirements:
Fields:
- Email Address input
- Password input with eye toggle
- Remember me checkbox (unchecked by default)
- Sign In button
- "Forgot Password?" link → `/forgot-password` (right aligned)

Additional:
- OR divider
- Sign in with Google button
- Bottom link: "Don't have an account? Sign Up" → `/register`
- Bottom links: "Privacy Policy · Terms of Service"
- Logo at top via shared Auth Layout

Design:
- Reuse PasswordInput component from Task 4.12
- Follow Opero design system
- "Forgot Password?" is small, right-aligned text link

Output:
Login form renders correctly. All elements visible. No backend connection yet.

---

### Task 5.2 — Add client-side validation

Goal:
Validate login fields before submission.

Requirements:
Validate on submit:
- Email: not empty, valid format
- Password: not empty

Error display:
- Red border on invalid field
- Error message below the field
- Errors clear when user corrects the field

Output:
Login form validates correctly before submission attempt

---

### Task 5.3 — Create signIn server action

Goal:
Create the server action that handles login with Supabase Auth.

Requirements:
- Create `/actions/auth/sign-in.ts`
- Accept: email, password
- Call `supabase.auth.signInWithPassword()`
- Return `{ success: true }` on success
- Return `{ success: false, error: string }` on failure
- Handle these errors:
  - Wrong credentials (wrong password or non-existent email): "Invalid email or password. Please try again."
  - Email not verified: "Please verify your email before signing in."
- Security rule: wrong password and non-existent email always return the same message — never reveal which one failed
- Use explicit TypeScript types — no `any`

Output:
signIn server action exists and handles all login cases correctly

---

### Task 5.4 — Connect Login form to server action

Goal:
Wire the login form to the signIn server action.

Requirements:
- Call signIn action on form submit (after validation passes)
- Loading state: button text changes to "Signing in..." and is disabled
- On success: redirect to `/dashboard`
- On error: show error message below the Sign In button
- Error message styled in red

Output:
Login form submits to Supabase. Loading state works. Errors display correctly.

---

### Task 5.5 — Configure Remember Me behaviour using Supabase session persistence

Goal:
Implement Remember Me so session duration reflects the user's choice.

- Remember Me unchecked (default): session ends when browser session ends
- Remember Me checked: session persists across browser restarts
- Use Supabase session persistence setting to control this behaviour
- Do not attempt custom JWT expiry durations in Sprint 1

Output:
Remember Me affects session duration correctly. Supabase handles refresh automatically.

---

### Task 5.6 — Handle all error states

Goal:
Ensure all login error cases are handled with correct user-facing messages.

Requirements:
Error messages:
- Wrong credentials: "Invalid email or password. Please try again."
- Unverified email: "Please verify your email before signing in."
- Network/unexpected error: "Something went wrong. Please try again."

Display:
- Error shown below the Sign In button
- Red styling
- Error clears on next submission attempt

Output:
All error states display the correct message. No raw Supabase errors shown to users.

---

### Task 5.7 — Verify session cookie is created correctly by Supabase SSR

Goal:
Confirm Supabase SSR is storing the session in an httpOnly cookie correctly.

Requirements:
- After successful login, open browser DevTools → Application → Cookies
- Confirm the Supabase session cookie exists
- Confirm the cookie is httpOnly (not accessible via JavaScript)
- Confirm the cookie is set on the correct domain
- No JWT visible in localStorage or sessionStorage

Output:
Session is confirmed stored in httpOnly cookie. JWT not exposed to client JavaScript.

---

### Task 5.8 — Implement Google Login

Goal:
Allow users to log in using their existing Google account.

Requirements:
- "Sign in with Google" button triggers Supabase OAuth flow
- If account exists → log in → redirect to `/dashboard`
- If account does not exist → create account → redirect to `/dashboard`
- If email already exists from a previous Google login, use the existing account — do not create a duplicate
- Disable Google button and show loading state while OAuth flow is starting — prevents spam clicking
- Handle errors: show toast if OAuth fails

Output:
Google login works for both existing and new users. Redirect to dashboard works.

---

### Task 5.9 — Redirect to /dashboard on successful login

Goal:
Confirm all successful login paths redirect to the dashboard correctly.

Requirements:
- Manual login success → `/dashboard`
- Google login success → `/dashboard`
- Redirect happens immediately after session is created
- If authenticated user visits /login → redirect to /dashboard
- If authenticated user visits /register → redirect to /dashboard

Output:
All successful login paths redirect to `/dashboard` correctly.

---

### Task 5.10 — Test full login flow

Goal:
Confirm the complete login flow works end to end.

Test cases:
- Login with correct credentials → redirects to dashboard
- Login with wrong password → correct error message
- Login with unverified email → correct error message
- Login with non-existent email → correct error message
- Google login with existing account → dashboard
- Google login with new account → creates account → dashboard
- Empty form submission → validation errors

Output:
All login test cases pass. Flow works correctly end to end.

---

### Task 5.11 — Refactor login page to reuse shared auth components

Goal:
Update the login page to use the reusable components extracted in Task 4.12.

Requirements:
- Replace any duplicated input components with `PasswordInput` from `/features/auth/components`
- Replace any duplicated card structure with `AuthCard` if applicable
- Confirm login page visual output is unchanged after refactor
- No new functionality — refactor only

Output:
Login page uses shared auth components. No visual changes. No duplicated code.

---

## Priority 6 — Forgot Password Module

---

### Task 6.1 — Build Forgot Password UI

Goal:
Build the visual forgot password form. No backend connection yet.

Requirements:
State 1 — Enter Email:
- "Forgot password?" title
- "No worries! Enter your email and we'll send you a reset link." subtitle
- Email Address input
- Send Reset Link button
- "← Back to Login" link → `/login`
- Logo at top via shared Auth Layout

Design:
- Reuse shared Auth Layout
- Subtle background illustration or gradient pattern (must not distract from the form)
- Maintain professional SaaS appearance
- Works in both light and dark mode
- Auth card remains the primary focus

Output:
Forgot Password form renders correctly. No backend connection yet.

---

### Task 6.2 — Create resetPasswordRequest server action

Goal:
Create the server action that sends the password reset email via Supabase.

Requirements:
- Create `/actions/auth/reset-password-request.ts`
- Accept: email
- Call `supabase.auth.resetPasswordForEmail(email, { redirectTo: '/reset-password' })`
- Return `{ success: true }` regardless of whether email exists (security — never confirm if email is registered)
- Return `{ success: false, error: string }` only on system errors
- Use explicit TypeScript types

Output:
resetPasswordRequest server action exists and triggers Supabase password reset email

---

### Task 6.3 — Connect form to server action

Goal:
Wire the forgot password form to the resetPasswordRequest server action.

Requirements:
- Call server action on form submit
- Loading state: button text changes to "Sending..." and is disabled
- On success: swap card to Check Inbox state (Task 6.4)
- On system error: show error toast

Output:
Form submits. Loading state works. Card swaps to Check Inbox on success.

---

### Task 6.4 — Build Check Inbox state

Goal:
After form submission, swap card content to the Check Inbox screen.

Requirements:
- No page navigation — card content swaps in place
- Show: envelope icon
- Show: "Check your inbox!" title
- Show: "We sent a password reset link to:" + email in bold
- Show: "Link expires in 1 hour."
- Show: Resend Email button (Task 6.5)
- Show: "← Back to Login" link → `/login`

Output:
Card swaps to Check Inbox state after form submission

---

### Task 6.5 — Add Resend Reset Email button

Goal:
Allow users to resend the password reset email.

Requirements:
- Same behaviour as Task 4.8 (60 second cooldown)
- After clicking: disabled + countdown "Resend available in Xs"
- At 0: button becomes active again
- On resend: calls resetPasswordRequest server action again
- Show success feedback: "Email sent!"

Output:
Resend button works with 60 second cooldown

---

### Task 6.6 — Handle Google OAuth user edge case

Goal:
Show a helpful message if a Google OAuth user tries to reset a password.

Requirements:
- Do not attempt to detect Google OAuth users by email at the forgot password form level
- Call resetPasswordRequest server action normally for all submitted emails
- If the account uses Google OAuth, Supabase will not send a reset email — this is handled automatically
- Store provider information (google / email) in the profiles table during registration so it can be checked safely in future sprints
- For Sprint 1: after sending the reset request, show a generic message:
  "If an account exists for this email, you will receive a reset link shortly."
- This message works correctly for both email users and Google OAuth users without exposing which accounts exist

Output:
Google OAuth users see a clear message instead of a broken reset flow

---

### Task 6.7 — Test forgot password flow

Goal:
Confirm the complete forgot password flow works end to end.

Test cases:
- Submit valid email → card swaps to Check Inbox
- Reset email arrives in inbox
- Link in email is correct and includes token
- Resend button works with 60 second cooldown
- Google OAuth email → shows correct message
- Back to Login link works from both states

Output:
All forgot password test cases pass

---

## Priority 7 — Reset Password Module

---

### Task 7.1 — Build Reset Password UI

Goal:
Build the visual reset password form. No backend connection yet.

Requirements:
Fields:
- New Password input with eye toggle + strength bar (reuse PasswordStrengthBar)
- Confirm New Password input with eye toggle + match indicator
- Reset Password button

Additional:
- "Create new password" title
- Logo at top via shared Auth Layout

Design:
- Reuse PasswordInput and PasswordStrengthBar from `/features/auth/components`

Design:
- Reuse shared Auth Layout
- Include subtle background illustration or gradient pattern
- Illustration must not distract from the form
- Maintain professional SaaS appearance
- Works in both light and dark mode
- Auth card remains the primary focus

Output:
Reset Password form renders correctly. All elements visible. No backend connection yet.

---

### Task 7.2 — Add client-side validation

Goal:
Validate reset password fields before submission.

Requirements:
- New password: not empty, must be strong (8+ chars, uppercase, number, special char)
- Confirm password: must match new password
- Show inline errors on invalid submit
- Real-time match indicator same as Task 4.3

Output:
Form validates correctly. Invalid submissions blocked with clear messages.

---

### Task 7.3 — Create updatePassword server action

Goal:
Create the server action that updates the user's password in Supabase.

Requirements:
- Create `/actions/auth/update-password.ts`
- Accept: new password
- Call `supabase.auth.updateUser({ password: newPassword })`
- Return `{ success: true }` on success
- Return `{ success: false, error: string }` on failure
- Handle expired token error
- Use explicit TypeScript types

Output:
updatePassword server action exists and updates password correctly

---

### Task 7.4 — Connect form to server action

Goal:
Wire the reset password form to the updatePassword server action.

Requirements:
- Call server action on form submit (after validation passes)
- Loading state: button text changes to "Resetting..." and is disabled
- On success: show success message (Task 7.5)
- On token expired error: show expired state (Task 7.6)
- On invalid token: show invalid state (Task 7.7)

Output:
Form submits. Loading state works. Correct state shown based on result.

---

### Task 7.5 — Show success message and auto redirect

Goal:
After successful password reset, confirm to the user and redirect to login.

Requirements:
- Show success message: "✓ Password updated! Please login with your new password"
- Green styling for success message
- After 2 seconds: automatically redirect to `/login`
- No manual button needed

Output:
Success message shows. Auto redirect to `/login` happens after 2 seconds.

---

### Task 7.6 — Build expired token state UI

Goal:
Handle the case where the reset link has expired.

Requirements:
- Show: warning icon
- Show: "This link has expired"
- Show: "Reset links are valid for 1 hour."
- Show: "Request New Reset Link" button → navigates to `/forgot-password`

Output:
Expired token state renders correctly with correct navigation

---

### Task 7.7 — Build invalid token state UI

Goal:
Handle the case where the reset link is broken or invalid.

Requirements:
- Show: warning icon
- Show: "This link is broken or invalid"
- Show: "Go to Login" button → navigates to `/login`

Output:
Invalid token state renders correctly with correct navigation

---

### Task 7.8 — Test reset password flow

Goal:
Confirm the complete reset password flow works end to end.

Test cases:
- Valid reset link → form loads → submit new password → success message → redirect to login
- Login with new password → works correctly
- Expired reset link → expired state shown → Request New Link navigates to /forgot-password
- Invalid reset link → invalid state shown → Go to Login navigates to /login

Output:
All reset password test cases pass

---

## Priority 8 — Verify Email Module

---

### Task 8.1 — CONFIRM FIRST: Test Supabase email verification redirect behaviour

Goal:
Determine the exact behaviour of Supabase email verification before building this module.

⚠️ Do NOT start Tasks 8.2–8.8 until this task is complete.

Requirements:
- Register a test user
- Click the verification link in the email
- Observe where Supabase redirects after verification
- Document the result:
  - Option A: Supabase redirects directly to `/login` → Phase 8 reduces to 1–2 tasks only
  - Option B: Supabase lands on `/verify-email` with token in URL → full Phase 8 is needed

Decision:
- If Option A → build only a simple success confirmation page at `/verify-email`
- If Option B → build all states in Tasks 8.2–8.8

Output:
Redirect behaviour confirmed. Scope of Phase 8 is determined.

---

### Task 8.2 — Build Verify Email page shell

Goal:
Create the verify email page that reads the token from the URL.

Requirements:
- Page lives at `/app/(auth)/verify-email/page.tsx`
- Read verification parameters supplied by Supabase (exact format confirmed in Task 8.1)
- Pass verification parameters to Supabase for validation
- Render correct state based on validation result
- Logo at top via shared Auth Layout

Design:
- Reuse shared Auth Layout
- Subtle background illustration or gradient pattern (must not distract from the content)
- Maintain professional SaaS appearance
- Works in both light and dark mode
- Auth card remains the primary focus

Output:
Verify Email page exists, reads token from URL, and prepares to render states

---

### Task 8.3 — Build Success state UI

Goal:
Show confirmation when email verification succeeds.

Requirements:
- Checkmark icon (green)
- "Email verified!" title
- "Your account is ready." subtitle
- "Go to Login" button → `/login`

Output:
Success state renders correctly

---

### Task 8.4 — Build Already Used state UI

Goal:
Handle the case where the verification link has already been used.

Requirements:
- Warning icon
- "This link has already been used" title
- "You've already verified your email." message
- "Go to Login" button → `/login`

Output:
Already Used state renders correctly

---

### Task 8.5 — Build Expired state UI

Goal:
Handle the case where the verification link has expired (24 hours passed).

Requirements:
- Warning icon
- "This link has expired" title
- "Verification links are valid for 24 hours." message
- "Request New Link" button → `/register`

Output:
Expired state renders correctly

---

### Task 8.6 — Build Invalid state UI

Goal:
Handle the case where the verification link is broken or tampered with.

Requirements:
- Warning icon
- "Invalid verification link" title
- "This link is broken or invalid. Please try registering again." message
- "Go to Register" button → `/register`

Output:
Invalid state renders correctly

---

### Task 8.7 — Wire token validation to Supabase

Goal:
Connect token validation to Supabase and map the result to the correct UI state.

Requirements:
- On page load: extract verification parameters supplied by Supabase (format confirmed in Task 8.1)
- Call Supabase to validate token
- Map result to: success / already used / expired / invalid state
- Handle all four outcomes correctly

Output:
Correct UI state is shown based on real Supabase token validation result

---

### Task 8.8 — Test all token states

Goal:
Confirm all four verification token states work correctly.

Test cases:
- Valid token → success state → Go to Login works
- Already used token (click link second time) → already used state
- Expired token (wait 24 hours or modify expiry in Supabase settings for testing) → expired state
- Invalid/tampered token → invalid state

Output:
All four token states confirmed working

---

## Priority 9 — Placeholder Pages

---

### Task 9.1 — Build Privacy Policy static page

Goal:
Create a simple Privacy Policy page linked from auth forms.

Requirements:
- Route: `/privacy-policy`
- Title: "Privacy Policy"
- Placeholder content: "This privacy policy will be updated soon."
- Clean layout consistent with Opero design
- No auth layout — standalone page
- Logo at top linking back to `/`

Design:
- Responsive layout
- Centered content container
- Comfortable reading width (max-width)
- Supports light and dark mode
- Uses Opero typography styles

Output:
`/privacy-policy` page loads correctly and is linkable from auth pages

---

### Task 9.2 — Build Terms of Service static page

Goal:
Create a simple Terms of Service page linked from auth forms.

Requirements:
- Route: `/terms-of-service`
- Title: "Terms of Service"
- Placeholder content: "Terms of service will be updated soon."
- Clean layout consistent with Opero design
- No auth layout — standalone page
- Logo at top linking back to `/`

Design:
- Responsive layout
- Centered content container
- Comfortable reading width (max-width)
- Supports light and dark mode
- Uses Opero typography styles

Output:
`/terms-of-service` page loads correctly and is linkable from auth pages

---

## Priority 10 — Session & Security

---

### Task 10.1 — Harden middleware.ts

Goal:
Add full session checking and route enforcement to middleware.ts.

Requirements:
- Read session from Supabase cookie using `createServerClient` from `@supabase/ssr`
- Check session on every request to protected routes
- Pass session result to route protection logic
- Refresh session token if needed (Supabase SSR handles this automatically)
- Replace the skeleton from Task 3.6 with real logic

Output:
middleware.ts reads and validates session on every request to protected routes

---

### Task 10.2 — Redirect unauthenticated users to /login

Goal:
Protect all dashboard routes so unauthenticated users cannot access them.

Requirements:
- If no valid session → redirect to `/login`
- Protected routes: everything under `/(dashboard)/`
- Redirect happens in middleware before the page renders
- No flash of protected content

Output:
Unauthenticated users are redirected to `/login` when accessing protected routes

---

### Task 10.3 — Redirect authenticated users away from /login and /register

Goal:
Prevent logged-in users from accessing auth pages.

Requirements:
- If valid session exists and user visits `/login` → redirect to `/dashboard`
- If valid session exists and user visits `/register` → redirect to `/dashboard`
- Same for `/forgot-password` if session exists
- Do NOT redirect authenticated users away from /reset-password — reset flow may require Supabase temporary tokens and aggressive middleware can break it
- Authenticated users visiting /verify-email may be redirected to /dashboard if verification is already complete (confirm behaviour during Task 8.1)

Output:
Logged-in users cannot access auth pages — they are redirected to `/dashboard`

---

### Task 10.4 — Implement session refresh

Goal:
Ensure sessions are kept alive automatically by Supabase SSR.

Requirements:
- Supabase SSR auto-refreshes the session token via middleware
- Confirm `updateSession` is called in middleware to keep session fresh
- Confirm session cookie is updated on each request when needed

Output:
Sessions refresh automatically. Users are not unexpectedly logged out during active use.

---

### Task 10.5 — Implement Logout

Goal:
Allow users to log out and have their session fully cleared.

Requirements:
- Create `/actions/auth/sign-out.ts` server action
- Call `supabase.auth.signOut()`
- Clear session cookie
- Redirect to `/login` after logout
- Wire the Logout button on the dashboard placeholder to the signOut server action
- After logout, user must not be able to access /dashboard without signing in again

Output:
Logout clears session, deletes cookie, and redirects to `/login`

---

### Task 10.6 — Verify httpOnly cookie and JWT security

Goal:
Confirm the session is stored securely and JWT is not exposed to client JavaScript.

Requirements:
- After login, open browser DevTools → Application → Cookies
- Confirm Supabase session cookie is httpOnly
- Check localStorage: confirm no JWT token is stored there
- Check sessionStorage: confirm no JWT token is stored there
- Confirm cookie has Secure flag in production (Vercel)

Output:
JWT confirmed stored only in httpOnly cookie. Not accessible via client JavaScript.

---

### Task 10.7 — Test middleware behaviour

Goal:
Confirm all middleware route protection scenarios work correctly.

Test cases:
- Visit `/dashboard` without session → redirects to `/login`
- Visit `/login` while logged in → redirects to `/dashboard`
- Visit `/register` while logged in → redirects to `/dashboard`
- Session expires → next visit to protected route redirects to `/login`
- Logout → session cleared → `/dashboard` no longer accessible

Output:
All middleware test cases pass. Route protection is working correctly.

---

## Priority 11 — Testing

---

### Task 11.1 — Full Register flow test

Goal:
Test the complete registration flow from start to finish.

Test cases:
- Fill form with valid data → submit → Check Inbox state appears
- Verification email arrives
- Click verification link → account verified
- Login with new credentials → dashboard
- Try to register with same email → correct error shown
- Submit empty form → all validation errors appear
- Submit with weak password → strength bar shows weak, error on submit
- Terms checkbox unchecked → Create Account button is disabled and cannot be submitted

Output:
All registration scenarios confirmed working

---

### Task 11.2 — Email verification test

Goal:
Test all verification token states.

Note: This task only applies if Priority 8 requires custom verification handling.
If Supabase redirects directly to /login after verification, this task can be simplified or skipped.

Test cases:
- Click valid link → success state → Go to Login works
- Click same link again → already used state
- Wait for expiry (or adjust Supabase settings) → expired state → Request New Link works
- Modify token URL manually → invalid state → Go to Register works

Output:
All four verification token states confirmed working

---

### Task 11.3 — Full Login test

Goal:
Test the complete login flow including all error paths.

Test cases:
- Login with correct credentials → dashboard
- Login with wrong password → "Invalid email or password"
- Login with unverified account → "Please verify your email"
- Login with non-existent email → "Invalid email or password. Please try again." (same message as wrong password — never reveal which failed)
- Remember Me unchecked → session expires in 24 hours
- Remember Me checked → session persists 7 days

Output:
All login scenarios confirmed working

---

### Task 11.4 — Google OAuth test

Goal:
Test Google authentication for both new and existing users.

Test cases:
- Register new account via Google → account created → dashboard
- Login existing Google account → dashboard
- Check profiles table: Google user row created with avatar_url
- Confirm no password stored for Google user
- Logout Google user → login again with same Google account works correctly

Output:
Google OAuth confirmed working for registration and login

---

### Task 11.5 — Forgot Password test

Goal:
Test the complete forgot password flow.

Test cases:
- Submit valid email → card swaps → email arrives in inbox
- Email contains working reset link
- Resend button works → 60 second cooldown → email arrives
- Google OAuth email → shows "uses Google Sign-In" message
- Back to Login link works from both card states

Output:
All forgot password scenarios confirmed working

---

### Task 11.6 — Reset Password test

Goal:
Test the complete reset password flow.

Test cases:
- Valid link → form loads → submit new password → success → redirect to /login
- Login with new password → works
- Try old password → fails
- Expired link → expired state → Request New Link → /forgot-password
- Invalid link → invalid state → Go to Login → /login
- Attempt to reset to a weak password → strength validation blocks submission

Output:
All reset password scenarios confirmed working

---

### Task 11.7 — Session expiry test

Goal:
Test session duration behaviour based on Remember Me setting.

Test cases:
- Manually invalidate session cookie in browser DevTools → visit /dashboard → redirects to /login
- Login with Remember Me → session persists longer
- Expired session → visit protected route → redirects to /login cleanly
- No error messages shown on expired session redirect — just login page

Output:
Session expiry behaviour confirmed working for both Remember Me states

---

### Task 11.8 — Logout test

Goal:
Test the complete logout flow.

Test cases:
- Click Logout → session cleared → redirected to /login
- After logout: visit /dashboard → redirected to /login
- After logout: check cookies → session cookie cleared
- After logout: check localStorage → no JWT present
- Login again after logout → works correctly
- After logout, refresh browser and attempt to access /dashboard → still redirected to /login

Output:
Logout confirmed working. Session fully cleared. Protected routes blocked after logout.