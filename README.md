# Project Management Tool — Frontend Prototype

A modern, responsive frontend prototype for a **Project Management Tool** web application. Built with HTML5, Tailwind CSS (CDN), and vanilla JavaScript for a clean SaaS-style UI and light interactions.

## Features

- **Landing page** — Hero, feature highlights, and clear CTAs for Login/Register
- **Auth flows** — Login and Register pages with form validation-ready markup
- **Dashboard** — Summary cards (Projects, Tasks, Completed, Team), recent activity feed
- **Projects** — Project cards with name, description, progress bar, and team avatars
- **Tasks** — Kanban board (To Do, In Progress, Review, Done) with drag-and-drop task cards (title, assignee, due date, priority)
- **Team** — Table of team members with name, role, and email
- **Layout** — Reusable sidebar and top navbar on dashboard pages; responsive and mobile-friendly

## Tech Stack

| Layer      | Technology        |
|-----------|--------------------|
| Markup    | HTML5              |
| Styling   | Tailwind CSS (CDN) |
| Scripting | Vanilla JavaScript |

## Project Structure

```
project-management-tool/
├── index.html          # Landing page
├── login.html          # Login page
├── register.html       # Registration page
├── dashboard.html      # Dashboard (stats + activity)
├── projects.html       # Projects list with cards
├── tasks.html          # Kanban task board
├── team.html           # Team members list
├── assets/
│   ├── css/
│   │   └── styles.css  # Custom styles and animations
│   ├── js/
│   │   ├── app.js      # Nav/sidebar loading, mobile menu
│   │   └── kanban.js   # Drag-and-drop for task cards
│   └── images/         # Image assets (optional)
├── components/
│   ├── navbar.html     # Top navigation bar
│   └── sidebar.html    # Dashboard sidebar
└── README.md
```

## Getting Started

1. **Clone or download** this repository.
2. **Serve the app over HTTP** — component loading uses `fetch()`, so open the app via a local web server rather than `file://`.

   Examples:

   ```bash
   # Node (npx)
   npx serve .

   # Python 3
   python -m http.server 8000

   # PHP
   php -S localhost:8000
   ```

3. Open **index.html** (or the root URL) in your browser and use **Login** / **Register** to reach the dashboard. Login and Register currently redirect to `dashboard.html` for demo purposes.

## Pages Overview

| Page          | Description                                                                 |
|---------------|-----------------------------------------------------------------------------|
| `index.html`  | Landing: hero, value proposition, feature blocks, Login/Register buttons    |
| `login.html`  | Email + password form, link to register                                     |
| `register.html` | Name, email, password form, link to login                                 |
| `dashboard.html` | Sidebar + navbar, 4 summary cards, recent activity list                 |
| `projects.html`  | Grid of project cards (name, description, progress bar, team chips)     |
| `tasks.html`     | Kanban columns with draggable task cards (title, assignee, due date, priority) |
| `team.html`      | Table of team members (name, role, email)                                |

## Design Notes

- **Tailwind CSS** is used for all layout and styling via the CDN build.
- **Indigo/violet** accent palette with neutral slate for a modern dashboard look.
- **Responsive**: Sidebar collapses to a hamburger menu on small screens; tables and grids adapt.
- **Components**: `navbar.html` and `sidebar.html` are loaded by `app.js` into placeholders on dashboard, projects, tasks, and team pages.

## Possible Next Steps

- Connect login/register to a backend API and add real authentication.
- Persist Kanban state (e.g. localStorage or API) so task moves are saved.
- Add modals or pages for creating/editing projects, tasks, and team members.
- Replace component `fetch()` with a build step or server-side includes if you add a backend or bundler.

## License

This is a frontend prototype for demonstration and development use.
