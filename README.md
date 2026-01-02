# personal portfolio

A personal portfolio built with Next.js, TypeScript, and Tailwind CSS. This repository contains the source code and configuration for a fast, accessible, and responsive personal website to showcase projects, blog posts, and contact information.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Development](#development)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- SEO-friendly pages and metadata
- Responsive layout with Tailwind CSS
- Static generation (SSG) and server-side rendering (SSR) where appropriate
- Type-safe codebase with TypeScript
- Example pages for projects, blog, and contact

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS

## Requirements

- Node.js (recommended >= 18)
- npm or yarn

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ron199807/ronald-web.git
cd ronald-web
```

2. Install dependencies:

```bash
# using npm
npm install

# or using yarn
yarn
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 in your browser.

## Development

- Follow the file structure under the `pages` (or `app` if using App Router), `components`, and `styles` directories.
- Use TypeScript for new files and prefer functional React components.
- Tailwind utilities are configured in `tailwind.config.js`.

## Scripts

Common scripts included in package.json:

- `dev` — Run development server
- `build` — Create an optimized production build
- `start` — Start the production server (after build)
- `lint` — Run linters
- `test` — Run tests (if present)

Example:

```bash
npm run build
npm start
```

## Deployment

This project works well with Vercel (recommended) or any platform that supports Next.js deployments. For Vercel, connect the repository and it will automatically detect the Next.js framework and set up builds.

## Configuration

- Environment variables can be stored in a `.env.local` file. Include a `.env.example` with example keys.
- Tailwind configuration is in `tailwind.config.js`.

## Contributing

Contributions are welcome. Please open issues for bugs or feature requests and create pull requests for changes. Follow conventional commits and run linters/tests before submitting.

## License

This project is licensed under the MIT License — see the LICENSE file for details.

## Contact

Maintainer: ron199807 (https://github.com/ron199807)
