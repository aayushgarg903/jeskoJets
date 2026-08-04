# Jesko Jets - Ultra-Luxury Private Aviation

Welcome to the **Jesko Jets** web application. This project is a visually stunning, high-performance web experience built for a bespoke private jet charter service. It leverages modern web technologies to deliver a premium, interactive user experience focused on "scrollytelling" and seamless animations.

## 🌟 The Idea
The goal of this project is to create an online presence that matches the luxury, speed, and precision of private aviation. Rather than a traditional static website, Jesko Jets uses a highly interactive, scroll-driven narrative to showcase the fleet, services, and global reach of the brand. The application is designed to "wow" the user immediately upon entry with cinematic 3D aircraft renders that animate as you scroll down the page.

## 🚀 Tech Stack & Code Architecture
This application is built on a modern, robust, and highly scalable technology stack:

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router) - For fast server-side rendering, optimized routing, and SEO.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - For rapid, utility-first styling and pixel-perfect responsive design.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Powers all the scroll-driven animations, spring physics, and component transitions.
- **Database / Backend**: [Supabase](https://supabase.com/) - A secure PostgreSQL database used to capture and store flight booking requests.
- **Smooth Scrolling**: [Lenis](https://studiofreight.github.io/lenis/) - Provides fluid, momentum-based smooth scrolling across the entire site.

## 🏗️ Key Components & Code Highlights

### 1. Canvas Image Sequences (`HeroScroll.tsx` & `PlaneMorph.tsx`)
Instead of heavy video files, the cinematic aircraft animations are powered by high-resolution image sequences drawn onto an HTML `<canvas>`.
- **How it works**: We use a custom React hook (`useImagePreloader.ts`) to download hundreds of frame images in the background. As the user scrolls, `Framer Motion` tracks the scroll progress and calculates exactly which frame to render onto the canvas, creating a perfectly smooth 60fps 3D video effect tied directly to the user's scroll wheel.

### 2. Smooth Scrolling (`SmoothScroll.tsx`)
We wrap the entire application layout in a `Lenis` smooth scroll provider. This intercepts the default browser scroll and applies easing mathematics, ensuring that the heavy canvas animations feel buttery smooth rather than jerky.

### 3. Glassmorphism UI (`Navbar.tsx`)
The navigation and mobile drawers utilize advanced CSS properties like `backdrop-blur` and `mix-blend-difference`. The logo and text intelligently invert their colors based on the background behind them, ensuring they are always readable whether flying over dark clouds or a bright sky.

### 4. Supabase Booking System (`app/actions/bookFlight.ts`)
When a user requests a flight via the `BookingModal.tsx`, the form data is passed to a Next.js **Server Action**. This action securely communicates with the Supabase PostgreSQL database to insert the booking record. The database is secured with **Row-Level Security (RLS)**, ensuring that public users can only insert new requests, but cannot read or extract sensitive data from other clients.

## 🛠️ Getting Started Locally

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔒 Security & Performance
- **Secrets Management**: All sensitive API keys are stored in `.env.local` and excluded from version control.
- **Accessibility**: Modals and interactive elements are equipped with standard ARIA roles for screen reader support.
- **Optimization**: Images and fonts are aggressively optimized, and Next.js static generation ensures near-instant page load times.

---
*Built with precision for the modern web.*
