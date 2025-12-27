# Dharvista HR - Human Resources & Placement Solutions

A modern, responsive web application for Dharvista HR & Placement Solutions - a premier HR consultancy specializing in connecting skilled talent from rural and semi-urban areas with opportunities across Tamil Nadu.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Available Scripts](#available-scripts)
- [Key Components](#key-components)
- [Pages](#pages)
- [Services & Hooks](#services--hooks)
- [Routing](#routing)
- [Authentication](#authentication)
- [Styling & UI](#styling--ui)
- [Configuration](#configuration)
- [Development Notes](#development-notes)
- [Deployment](#deployment)

---

## 🎯 Overview

**Dharvista HR** is a comprehensive job portal and HR management system built with React, TypeScript, and modern web technologies. The platform serves as a bridge between job seekers and employers in South Tamil Nadu, offering:

- **Public Job Listings**: Browse and search available positions across multiple industries
- **Admin Dashboard**: Manage job postings and track candidate applications
- **Company Information**: Learn about services, industries served, and company values
- **Contact Integration**: Direct communication channels with the HR team

### Company Information
- **Location**: Aruppukottai, Virudhunagar District, Tamil Nadu
- **GST**: 33FMLPD0102C1ZZ
- **UDYAM**: TN-32-0092632
- **Established**: November 2025

---

## ✨ Features

### Public Features

1. **Homepage (`/`)**
   - Hero section with animated statistics (100+ placements, 17 clients, Est. 2025)
   - Latest job openings showcase (4 featured jobs)
   - "Who We Are" section with 4 key differentiators
   - Industries served section (14 industries)
   - Trusted clientele showcase
   - Call-to-action sections

2. **Job Listings (`/jobs`)**
   - Comprehensive job search with filters:
     - Search by title/keywords
     - Filter by industry
     - Filter by location
   - Pagination with "Load More" (6 jobs per page initially)
   - Job cards with:
     - Urgent hiring badges (red, pulsing animation)
     - Job type badges
     - Salary range display
     - Experience requirements
     - Location information
   - Responsive sidebar filters (desktop) / inline filters (mobile)

3. **Job Detail Page (`/jobs/:id`)**
   - Full job description
   - Eligibility requirements with checkmark icons
   - Sticky sidebar with job overview:
     - Salary range
     - Job type
     - Experience requirements
     - Location
   - Apply button linking to contact form
   - Back navigation

4. **About Page (`/about`)**
   - Company mission and vision
   - 9 core values (DHARVISTA acronym)
   - Why choose us section (6 differentiators)
   - Company registration details (GST, UDYAM)
   - Client showcase

5. **Services Page (`/services`)**
   - 5 service categories:
     - Management & Administrative
     - Textiles and Garment
     - Factory Staffing & Technical
     - Hotel & Hospitality Operations
     - Manufacturing Industry Roles
   - 7-step recruitment process visualization
   - Service features for each category
   - Client showcase

6. **Contact Page (`/contact`)**
   - Contact form (name, email, phone, subject, message)
   - Contact information cards:
     - Office address (clickable Google Maps link)
     - Phone & WhatsApp numbers
     - Email addresses (business & candidate)
   - Social media links (LinkedIn, Instagram, WhatsApp)
   - Office hours
   - Embedded Google Maps iframe

### Admin Features

1. **Admin Login (`/login`)**
   - Simple email/password authentication
   - Credentials: `admin@modelcorp.com` / `admin123`
   - Token-based authentication (localStorage)
   - Auto-redirect to dashboard on success

2. **Admin Dashboard (`/admin-dashboard`)** 🔒 Protected Route
   - **Jobs Management View**:
     - Create new job postings with form fields:
       - Title, Location, Industry
       - Salary range (min/max)
       - Experience range (min/max)
       - Job type (full-time, part-time, contract, internship, freelance)
       - Priority (urgent/normal) checkbox
       - Eligibility criteria
       - Job description
       - Google Form URL (optional)
     - View all active jobs in list format
     - Delete jobs with confirmation
     - Job status badges (published/draft/closed)
   
   - **Applicants Management View**:
     - Table view of all applicants
     - Candidate information (name, email)
     - Job applied for
     - Application date
     - Resume link (external)
     - Status management dropdown:
       - New
       - Contacted
       - Hired
       - Rejected
     - Color-coded status badges

### Technical Features

- **Responsive Design**: Mobile-first approach, works on all devices
- **SEO Optimized**: Meta tags, semantic HTML
- **Fast Performance**: Lazy loading, optimized assets
- **Accessibility**: ARIA labels, keyboard navigation
- **Error Handling**: 404 page, loading states, error toasts
- **Scroll Animations**: Fade-in and slide-up animations
- **Auto-hiding Navigation**: Header hides on scroll down, shows on scroll up
- **Smooth Scrolling**: Auto-scroll to top on route change

---

## 🛠 Tech Stack

### Core Framework
- **React 18.3.1**: UI library
- **TypeScript 5.8.3**: Type safety
- **Vite 5.4.19**: Build tool and dev server

### Routing
- **React Router DOM 6.30.1**: Client-side routing

### State Management & Data Fetching
- **TanStack Query (React Query) 5.83.0**: Server state management
- **LocalStorage**: Client-side data persistence (jobs, authentication)

### UI Components
- **shadcn/ui**: Component library built on Radix UI
- **Radix UI**: Headless UI primitives (40+ components)
- **Lucide React**: Icon library
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **tailwindcss-animate**: Animation utilities

### Forms & Validation
- **React Hook Form 7.61.1**: Form management
- **Zod 3.25.76**: Schema validation
- **@hookform/resolvers**: Form validation integration

### Additional Libraries
- **Axios 1.13.2**: HTTP client
- **date-fns 3.6.0**: Date formatting
- **Sonner 1.7.4**: Toast notifications
- **recharts 2.15.4**: Data visualization (charts)
- **embla-carousel-react**: Carousel component

### Development Tools
- **ESLint**: Code linting
- **TypeScript ESLint**: TypeScript linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

---

## 📁 Project Structure

```
Dharvista_hr_01/
├── public/
│   ├── _redirects           # Netlify/Vercel redirects
│   ├── Favicon.jpg          # Site favicon
│   ├── placeholder.svg      # Placeholder image
│   └── robots.txt           # SEO robots file
│
├── src/
│   ├── assets/              # Static assets
│   │   ├── clients/         # Client logo images (8 images)
│   │   └── Favicon.jpg      # Logo image
│   │
│   ├── components/          # React components
│   │   ├── filters/         # Filter components
│   │   │   └── FilterSelect.tsx
│   │   ├── sections/        # Page sections
│   │   │   ├── ClienteleSection.tsx
│   │   │   ├── IndustriesSection.tsx
│   │   │   ├── LatestJobsSection.tsx
│   │   │   └── WhyChooseUsSection.tsx
│   │   ├── ui/              # shadcn/ui components (40+ files)
│   │   ├── Footer.tsx       # Site footer
│   │   ├── Layout.tsx       # Main layout wrapper
│   │   ├── Navigation.tsx   # Header navigation
│   │   ├── NavLink.tsx      # Navigation link component
│   │   ├── ProtectedRoute.tsx  # Route guard for admin
│   │   └── ScrollToTop.tsx  # Auto-scroll on route change
│   │
│   ├── data/                # Data stores
│   │   └── jobsStore.ts
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── use-mobile.tsx   # Mobile detection hook
│   │   ├── use-toast.ts     # Toast notification hook
│   │   ├── useApplicants.ts # Applicants data hook
│   │   ├── useJobs.ts       # Jobs data hook
│   │   └── useSiteSettings.ts  # Site settings hook
│   │
│   ├── lib/                 # Utility libraries
│   │   ├── axios.ts         # Axios configuration
│   │   └── utils.ts         # Helper functions
│   │
│   ├── mock/                # Mock data (for development)
│   │   ├── applicants.ts
│   │   ├── clients.ts
│   │   ├── jobs.ts
│   │   ├── siteSettings.ts
│   │   └── testimonials.ts
│   │
│   ├── pages/               # Page components
│   │   ├── About.tsx        # About us page
│   │   ├── AdminDashboard.tsx  # Admin panel
│   │   ├── Contact.tsx      # Contact page
│   │   ├── Index.tsx        # Homepage
│   │   ├── JobDetail.tsx    # Job details page
│   │   ├── Jobs.tsx         # Jobs listing page
│   │   ├── Login.tsx        # Admin login
│   │   ├── NotFound.tsx     # 404 page
│   │   └── Services.tsx     # Services page
│   │
│   ├── services/            # API service layers
│   │   ├── jobService.ts    # LocalStorage-based job service
│   │   └── realJobService.ts  # Backend API service (configured)
│   │
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Job, Applicant types
│   │
│   ├── App.tsx              # Main app component (routing)
│   ├── App.css              # App-specific styles
│   ├── index.css            # Global styles
│   ├── main.tsx             # Application entry point
│   └── vite-env.d.ts        # Vite type definitions
│
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── package-lock.json        # Locked dependencies
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # App-specific TS config
├── tsconfig.node.json       # Node-specific TS config
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── eslint.config.js         # ESLint configuration
└── components.json          # shadcn/ui configuration

```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm** or **yarn** or **bun**: Package manager

### Installation Steps

1. **Clone the repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd Dharvista_hr_01
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Environment Configuration**

   Update the API base URL in `src/lib/axios.ts`:
   ```typescript
   const BASE_URL = "http://localhost:5000/api"; // Change to your backend URL
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (Vite) |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## 🧩 Key Components

### Layout Components

#### `Layout.tsx`
- Wraps all public pages
- Includes `Navigation` and `Footer`
- Handles main content area spacing

#### `Navigation.tsx`
- Fixed header with logo and navigation links
- Auto-hides on scroll down, shows on scroll up
- Mobile-responsive hamburger menu
- Active route highlighting

#### `Footer.tsx`
- Company information
- Quick links
- Contact details
- Copyright notice

#### `ProtectedRoute.tsx`
- Route guard for admin pages
- Checks for `admin_token` in localStorage
- Redirects to login if unauthorized

#### `ScrollToTop.tsx`
- Automatically scrolls to top on route change

### Section Components

#### `LatestJobsSection.tsx`
- Displays 4 latest published jobs
- Grid layout (4 columns on desktop)
- Job cards with key information
- Link to full jobs page

#### `IndustriesSection.tsx`
- Showcases 14 industries served
- Icon-based grid layout
- Hover animations

#### `ClienteleSection.tsx`
- Displays client logos in grid
- Client information from mock data
- Hover effects showing company names

#### `WhyChooseUsSection.tsx`
- Highlights company differentiators
- Icon-based cards

### UI Components (shadcn/ui)

The project includes 40+ pre-built UI components from shadcn/ui:
- Buttons, Inputs, Textareas
- Cards, Badges, Alerts
- Dialogs, Dropdowns, Popovers
- Tables, Tabs, Accordions
- Toasts, Tooltips, Skeletons
- And many more...

All components are located in `src/components/ui/`

---

## 📄 Pages

### Public Pages

1. **Index (`/`)**
   - Route: `src/pages/Index.tsx`
   - Hero section with animated stats
   - Latest jobs showcase
   - Company overview
   - Industries section
   - Clientele section

2. **Jobs (`/jobs`)**
   - Route: `src/pages/Jobs.tsx`
   - Job listing with filters
   - Search functionality
   - Pagination (Load More)
   - Responsive sidebar filters

3. **Job Detail (`/jobs/:id`)**
   - Route: `src/pages/JobDetail.tsx`
   - Full job information
   - Eligibility requirements
   - Sticky sidebar with overview
   - Apply button

4. **About (`/about`)**
   - Route: `src/pages/About.tsx`
   - Mission and vision
   - Core values (9 values)
   - Why choose us
   - Company credentials

5. **Services (`/services`)**
   - Route: `src/pages/Services.tsx`
   - 5 service categories
   - Service features
   - 7-step recruitment process
   - Industry-specific solutions

6. **Contact (`/contact`)**
   - Route: `src/pages/Contact.tsx`
   - Contact form
   - Contact information
   - Social media links
   - Google Maps embed

7. **NotFound (`/*`)**
   - Route: `src/pages/NotFound.tsx`
   - 404 error page
   - Link back to homepage

### Admin Pages

1. **Login (`/login`)**
   - Route: `src/pages/Login.tsx`
   - Email/password authentication
   - Stores token in localStorage
   - Redirects to dashboard

2. **Admin Dashboard (`/admin-dashboard`)**
   - Route: `src/pages/AdminDashboard.tsx`
   - Protected route
   - Two views: Jobs and Applicants
   - Job CRUD operations
   - Applicant status management

---

## 🔧 Services & Hooks

### Services

#### `jobService.ts`
- **Purpose**: LocalStorage-based job management (current implementation)
- **Methods**:
  - `getAll()`: Fetch all jobs from localStorage
  - `getById(id)`: Get single job by ID
  - `create(jobData)`: Create new job
  - `delete(id)`: Delete job by ID
  - `checkAndSeed()`: Initialize with sample data if empty

#### `realJobService.ts`
- **Purpose**: Backend API integration (configured, ready for backend)
- **Methods**:
  - `getAll()`: GET `/api/jobs`
  - `getById(id)`: GET `/api/jobs/:id`
  - `create(jobData)`: POST `/api/jobs`
  - `delete(id)`: DELETE `/api/jobs/:id`

### Custom Hooks

#### `useJobs()`
- **Location**: `src/hooks/useJobs.ts`
- **Returns**:
  - `jobs`: Array of Job objects
  - `isLoading`: Loading state
  - `createJob(jobData)`: Function to create job
  - `deleteJob(id)`: Function to delete job
  - `refresh()`: Function to reload jobs

#### `useApplicants()`
- **Location**: `src/hooks/useApplicants.ts`
- **Returns**:
  - `applicants`: Array of Applicant objects
  - `isLoading`: Loading state
  - `error`: Error state
  - `updateApplicantStatus(id, status)`: Update applicant status
  - `refreshApplicants()`: Reload applicants

#### `useSiteSettings()`
- **Location**: `src/hooks/useSiteSettings.ts`
- **Returns**: Site configuration data

#### `use-toast()`
- **Location**: `src/hooks/use-toast.ts`
- **Purpose**: Toast notification management
- **Usage**: `const { toast } = useToast(); toast({ title, description })`

#### `use-mobile()`
- **Location**: `src/hooks/use-mobile.tsx`
- **Purpose**: Detect mobile device
- **Returns**: `boolean`

---

## 🛣 Routing

### Route Configuration

All routes are defined in `src/App.tsx`:

```typescript
// Public Routes
/ → Index (Homepage)
/about → About page
/services → Services page
/jobs → Jobs listing
/jobs/:id → Job detail
/contact → Contact page
/login → Admin login

// Protected Routes (require authentication)
/admin-dashboard → Admin dashboard

// Fallback
* → 404 Not Found
```

### Route Guards

- **ProtectedRoute**: Wraps admin routes, checks for `admin_token`
- **ScrollToTop**: Component that scrolls to top on route change

---

## 🔐 Authentication

### Current Implementation

- **Method**: Token-based authentication using localStorage
- **Token Key**: `admin_token`
- **Login Credentials**:
  - Email: `admin@modelcorp.com`
  - Password: `admin123`

### Authentication Flow

1. User enters credentials on `/login`
2. Credentials are validated (currently hardcoded)
3. Token stored in `localStorage.setItem("admin_token", "true")`
4. Redirect to `/admin-dashboard`
5. Protected routes check for token
6. Logout removes token and redirects to homepage

### Security Notes

⚠️ **Important**: The current authentication is for development/demo purposes. For production:
- Implement proper backend authentication (JWT tokens)
- Use secure HTTP-only cookies
- Implement password hashing
- Add rate limiting
- Add CSRF protection

---

## 🎨 Styling & UI

### Tailwind CSS

The project uses **Tailwind CSS** for styling with:
- Custom color scheme defined in `tailwind.config.ts`
- CSS variables for theming (primary, secondary, etc.)
- Custom animations (fade-in, slide-up)
- Responsive breakpoints (sm, md, lg, xl, 2xl)

### Design System

- **Primary Color**: Blue (`hsl(var(--primary))`)
- **Secondary Color**: Gray (`hsl(var(--secondary))`)
- **Font**: System font stack
- **Border Radius**: Custom radius variables
- **Shadows**: Multiple shadow utilities

### Animations

- **fade-in**: Opacity fade-in animation
- **slide-up**: Slide up with fade-in
- **accordion-down/up**: Accordion animations
- **Hover effects**: Scale, translate, shadow transitions

### Responsive Design

- **Mobile-first**: Base styles for mobile
- **Breakpoints**:
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1400px

---

## ⚙️ Configuration

### TypeScript

- **Config Files**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **Path Aliases**: `@/*` maps to `src/*`
- **Strict Mode**: Disabled (configurable)

### Vite

- **Config**: `vite.config.ts`
- **Path Alias**: `@` → `./src`
- **Plugin**: React plugin for JSX/TSX

### ESLint

- **Config**: `eslint.config.js`
- **Plugins**: React, React Hooks, React Refresh
- **Rules**: Standard React best practices

### PostCSS

- **Config**: `postcss.config.js`
- **Plugins**: Tailwind CSS, Autoprefixer

---

## 📝 Development Notes

### Data Persistence

**Current Implementation**: 
- Jobs stored in `localStorage` (key: `dharvista_jobs`)
- Sample data auto-seeded on first load
- Token stored in `localStorage` (key: `admin_token`)

**Backend Integration Ready**:
- `realJobService.ts` configured for API calls
- Axios interceptors set up for authentication headers
- Base URL configurable in `src/lib/axios.ts`

### Mock Data

Mock data files in `src/mock/`:
- `jobs.ts`: Sample job listings
- `applicants.ts`: Sample applicant data
- `clients.ts`: Client logos and names
- `siteSettings.ts`: Site configuration
- `testimonials.ts`: Testimonial data (if needed)

### Component Patterns

- **Functional Components**: All components use React hooks
- **TypeScript**: Full type safety with interfaces
- **Custom Hooks**: Reusable logic extracted to hooks
- **Service Layer**: API calls abstracted to services

### Best Practices

1. **Component Organization**: 
   - Pages in `src/pages/`
   - Reusable components in `src/components/`
   - UI primitives in `src/components/ui/`

2. **File Naming**:
   - Components: PascalCase (`JobCard.tsx`)
   - Hooks: camelCase with `use` prefix (`useJobs.ts`)
   - Services: camelCase (`jobService.ts`)

3. **Type Safety**:
   - All components typed with TypeScript
   - Types defined in `src/types/index.ts`
   - Props interfaces for components

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Deployment Platforms

The project can be deployed to:

1. **Vercel**
   - Connect GitHub repository
   - Auto-deploy on push
   - Configure build command: `npm run build`
   - Output directory: `dist`

2. **Netlify**
   - Drag & drop `dist` folder
   - Or connect repository
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **GitHub Pages**
   - Build and deploy `dist` folder
   - Use GitHub Actions for automation

4. **Traditional Hosting**
   - Upload `dist` folder contents
   - Configure server for SPA routing

### Environment Variables

For production, update API URL in:
- `src/lib/axios.ts` - Change `BASE_URL` to production API

Or use environment variables:
```typescript
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
```

Create `.env` file:
```
VITE_API_URL=https://api.yourdomain.com/api
```

### Routing Configuration

For SPA routing to work correctly, configure your server:

**Nginx**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache** (`.htaccess`):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Netlify** (`public/_redirects`):
```
/*    /index.html   200
```

---

## 📞 Contact Information

**Dharvista HR & Placement Solutions**

- **Address**: 1/209/C4, Kural Vidhi, Jeyaram Nagar, Main Road, Aathipatti, Aruppukottai - 626 101, Tamil Nadu
- **Phone**: +91 6381451289 (Primary), +91 9345026323 (Alternate)
- **Email**: 
  - Business: dharvistahrplacementsolutions@gmail.com
  - Candidates: dharvistahr@gmail.com
- **LinkedIn**: [Company Profile](https://www.linkedin.com/company/109600486/)
- **Instagram**: [@dharvistahr](https://www.instagram.com/dharvistahr)
- **WhatsApp**: [Channel Link](https://whatsapp.com/channel/0029Vb6zCH20LKZKj1w4sB2j)

---

## 📄 License

All rights reserved. © 2025 Dharvista HR & Placement Solutions.

---

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for utility-first CSS
- **React Team** for the amazing framework
- **Vite** for the blazing-fast build tool

---

## 🔄 Version History

- **v0.0.0** - Initial release
  - Public job listings
  - Admin dashboard
  - Contact forms
  - Responsive design
  - LocalStorage-based data management

---

## 📝 Notes for Developers

1. **Backend Integration**: The project is ready for backend integration. Update `src/lib/axios.ts` with your API URL and switch from `jobService` to `realJobService` in hooks.

2. **Authentication**: Implement proper JWT authentication for production use.

3. **Data Persistence**: Currently using localStorage. Replace with API calls when backend is ready.

4. **SEO**: Meta tags are in `index.html`. Consider adding dynamic meta tags for job pages.

5. **Analytics**: Consider adding Google Analytics or similar for tracking.

6. **Performance**: Images are optimized. Consider implementing lazy loading for images.

7. **Testing**: Consider adding unit tests (Jest) and E2E tests (Playwright/Cypress).

---

**Built with ❤️ for Dharvista HR & Placement Solutions**

