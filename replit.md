# Vision Studio 360

## Overview

Vision Studio 360 is a portfolio website for an architectural visualization studio based in Abidjan, Côte d'Ivoire. The site showcases architectural renders, animations, and interactive VR/360° experiences. It features a modern, minimalist design inspired by high-end architecture studios, with bilingual support (English/French).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for page transitions and scroll animations
- **State Management**: TanStack React Query for server state, React Context for language switching
- **Fonts**: Space Grotesk (display) and Outfit (body) via Google Fonts

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

### Data Storage
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)
- **Schema**: Two main tables - `projects` (portfolio items) and `messages` (contact form submissions)
- **Migrations**: Drizzle Kit for schema migrations (`npm run db:push`)

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # UI components (Header, Footer, ProjectCard)
│       ├── pages/        # Route pages (Home, Featured, Gallery, etc.)
│       ├── hooks/        # Custom hooks (useProjects, useLanguage, useContact)
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database operations
│   └── db.ts         # Database connection
└── shared/           # Shared code between client/server
    ├── schema.ts     # Drizzle table definitions and Zod schemas
    └── routes.ts     # API contract definitions
```

### Key Design Patterns
- **Shared Types**: Schema definitions in `shared/` are used by both frontend and backend for type safety
- **API Contract**: Routes defined with Zod schemas for input validation and response typing
- **Component Composition**: UI built with shadcn/ui primitives, customized via Tailwind
- **Internationalization**: Simple context-based translation system in `use-language.tsx`

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage for Express (if sessions are needed)

### Third-Party Libraries
- **Drizzle ORM**: Type-safe database queries and schema management
- **Zod**: Runtime validation for API inputs and outputs
- **TanStack Query**: Data fetching, caching, and synchronization
- **Framer Motion**: Animation library for React
- **Radix UI**: Headless UI primitives (via shadcn/ui)

### Development Tools
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **TypeScript**: Full-stack type checking
- **Drizzle Kit**: Database migration tooling

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicator