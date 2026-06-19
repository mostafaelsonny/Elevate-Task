# Elevate – Post Manager

A pixel-perfect React application built for the **Frontend Advanced Bootcamp Task**.  
It integrates with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/) to display, filter, and create posts.

---

## What is this project about?

**Elevate Post Manager** is a post-style web application with two core screens:

| Screen | Description |
|---|---|
| **Post List** | Browse all 100 posts with live search, author filter, and paginated table |
| **Create a New Post** | Form with full validation, author dropdown, success toast, and server-error banner |

### Key Features
- 📋 **Post List** with live search and per-author filtering
- 📄 **Pagination** — 10 posts per page with first / prev / page-numbers / next / last controls
- ✍️ **Create Post** form powered by React Hook Form + Zod validation
- 🔴 **Inline validation errors** shown on all required fields
- 🟢 **Success toast** (bottom-right) on successful post creation
- 🔴 **Server error banner** on API failure
- 🏔️ **Snowy mountain background** matching the Figma design
- 📱 **Responsive** layout that works on mobile and desktop

---

## Tech Stack

| Library | Purpose |
|---|---|
| React 19 | UI framework |
| Vite 8 | Build tool & dev server |
| React Router DOM 7 | Client-side routing |
| React Hook Form 7 | Form state management |
| Zod 3 | Schema-based validation |
| Axios | HTTP client for JSONPlaceholder |
| Tailwind CSS 4 | Utility-first styling |
| Sonner | Toast notifications |
| Lucide React | Icons |
| clsx + tailwind-merge | Class merging utilities |

---

## How to install dependencies

```bash
# Clone the repo
git clone <your-repo-url>
cd elevate

# Install all dependencies
npm install
```

---

## How to run locally

```bash
npm run dev
```

Open **http://localhost:5173** (or the port shown in terminal) in your browser.

### Other scripts

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

---

## Project Structure

```
src/
├── api/
│   └── posts.js           # Axios instance + fetchPosts, fetchUsers, createPost
├── components/
│   ├── layout/
│   │   └── Header.jsx     # Frosted-glass header bar
│   └── Pagination.jsx     # Reusable paginator with ellipsis
├── hooks/
│   ├── usePosts.js        # Fetches all posts
│   └── useUsers.js        # Fetches all users (authors)
├── lib/
│   └── utils.js           # cn() class-merging helper
├── pages/
│   ├── PostList.jsx        # Post list page (search, filter, paginate)
│   └── CreatePost.jsx      # Create post form page
├── App.jsx                # Root component, router, background, toaster
├── main.jsx               # React DOM entry point
└── index.css              # Global styles + Tailwind import
```

---

## Additional Notes & Improvements

- **JSONPlaceholder** is a mock API — `POST /posts` always returns a fake `id: 101` response. The success flow is fully wired; to simulate a server error you would need to modify the API base URL.
- Pagination **resets to page 1** automatically whenever the search query or author filter changes.
- The **Author dropdown** on the Create Post page is populated dynamically from `GET /users`.
- All form fields are **accessible** — `id` attributes match `htmlFor` labels, and error messages use `role="alert"`.
- The background image is a generated snowy mountain scene matching the Figma reference.
