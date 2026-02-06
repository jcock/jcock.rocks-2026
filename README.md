<!-- markdownlint-disable -->

[![Jason Cockerham](https://avatars.githubusercontent.com/u/6616625?s=240&v=4)](https://jcock.rocks/)

<!-- markdownlint-enable -->

# The portfolio of Jason Cockerham

Senior Designer/Developer

[jcock.rocks](https://jcock.rocks/)

---

![Repo Size](https://img.shields.io/github/repo-size/badges/shields.svg?style=for-the-badge)
[![License: 0BSD](https://img.shields.io/badge/license-0BSD-blue.svg?style=for-the-badge)](http://unlicense.org/)

---

## Directory Layout

```shell
├── /components/                # Components
├── /data/                      # Site data
├── /hooks/                     # Custom hooks
├── /images/                    # Images
├── /public/                    # Static assets
├── /pages/                     # Pages
├── /styles/                    # Styles
├── /types/                     # Types
├── /.env.*                     # Environment variables
├── /next-config.js             # Next.js configuration
├── /postcss.config.js          # PostCSS config
├── /tailwind.config.js         # Tailwind config
```

---

## Features

### Tech Stack

- [Next.js](https://nextjs.org/)
- [Apollo](https://www.apollographql.com/)

### UI

- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn](https://ui.shadcn.com/)
- [BaseUI](https://base-ui.com/)
- [Motion](https://motion.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Iconify](https://iconify.design/)

---

## Get started

Create a new Next.js project using this starter:

```sh
npx create-next-app my-new-website -e "https://github.com/abcagency/nextjs-pages-tailwind"
```

```sh
cd my-new-website
npm i
```

Run the project in development mode ([http://localhost:3000](http://localhost:3000)):

```sh
npm run dev
```

### Lint

- `npm run lint` - Run ESLint

### Build your site for production

```sh
npm run build
```

---

## UI Documentation

See `docs/components/ui-components.md` for the compound form API,
masking, and the new Base UI wrappers.

### Run production build

```sh
npm run build
```

---

## Upgrade `package.json` package versions

Install [npm-check-updates](https://www.npmjs.com/package/npm-check-updates):

```sh
npm i -g npm-check-updates
```

Upgrade a project's package file:

```sh
# Inside of project root folder

ncu -u    # Upgrade package.json
npm i     # Update installed packages and package-lock.json
```

---

## [React Scan](https://github.com/aidenybai/react-scan)

React Scan automatically detects performance issues in your React app.

```sh
# Start normal dev server

npm run dev

# Start React Scan

npx react-scan@latest http://localhost:3000
```

---

## [Unlighthouse](https://unlighthouse.dev/)

Run lighthouse performance metrics on your entire site.

```sh
npx unlighthouse --site <your-site>
```

`<your-site>` is the URL of your site, e.g. `https://www.example.com`.

---

### Enjoy

:metal:
