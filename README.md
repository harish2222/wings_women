<!-- markdownlint-disable MD033 -->
<div align="center">

![Wings Women Center Logo](./public/favicon.png)

# Wings Women Center | Fertility & Women's Health Clinic

### Trusted Fertility Care in Kurnool, Andhra Pradesh

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-white?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-black?style=flat&logo=vercel)](https://vercel.com)

**Website:** [wingswomencentre.vercel.app](https://wingswomencentre.vercel.app)

*A modern, accessible, and mobile-first fertility clinic website*

</div>

---

## Table of Contents

1. [About This Website](#about-this-website)
2. [For Patients & Visitors](#for-patients--visitors)
3. [For Developers & Contributors](#for-developers--contributors)
4. [Technology Stack](#technology-stack)
5. [Features](#features)
6. [Getting Started](#getting-started)
7. [Deployment](#deployment)
8. [Support](#support)

---

## About This Website

Wings Women Center is a modern fertility and women's health clinic website built with the latest web technologies. The website helps patients:

- **Book appointments** via WhatsApp
- **Learn about services** (IVF, IUI, PCOS Care, Gynecology, etc.)
- **Meet the doctors** and their qualifications
- **Get contact information** and directions
- **Understand treatments** through detailed service pages

### Our Mission

To provide accessible, compassionate, and evidence-based fertility care information to women and couples in Kurnool and across Andhra Pradesh.

---

## For Patients & Visitors

### How to Book an Appointment

1. **WhatsApp (Recommended):** Click the green "Book Appointment" button that appears after scrolling
2. **Direct WhatsApp:** Send a message to [+91 95027 12812](https://wa.me/919502712812)
3. **Call:** +91 95027 12812
4. **Email:** boga.viswanath@gmail.com

### Our Services

| Service | Description |
|---------|-------------|
| IVF & Assisted Reproduction | Advanced fertility treatments |
| Gynecological Care | Women's health consultations |
| Fertility Preservation | Egg freezing for future planning |
| PCOS Management | Hormone and metabolic care |
| Male Infertility | Evaluation and treatment |
| Counseling Support | Emotional guidance |

### Clinic Location

```
Wings Women Center
Shop 115/116, First Floor
Ragamayuri Complex, Beside Dmart
Bellary Chowrastha, Kurnool
Andhra Pradesh, India
```

### Opening Hours

- **Monday - Saturday:** 9:00 AM - 6:00 PM
- **Sunday:** By Appointment

---

## For Developers & Contributors

### Project Structure

```
my-app/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout
│   ├── doctors/           # Doctors page
│   ├── services/           # Services listing
│   │   └── [slug]/       # Individual service pages
│   ├── privacy-policy/   # Privacy policy
│   └── terms/            # Terms & conditions
├── components/            # React components
│   ├── navbar.tsx        # Navigation with mobile menu
│   ├── footer.tsx        # Site footer
│   ├── theme-toggle.tsx   # Dark/light mode
│   ├── contact-section.tsx # Appointment form
│   └── floating-booking-button.tsx # WhatsApp button
├── lib/                   # Utility functions
│   ├── services.ts       # Service data
│   └── whatsapp.ts     # WhatsApp integration
└── public/               # Static assets
    └── media/           # Images, logos
```

### Key Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Homepage content |
| `app/layout.tsx` | Global layout, fonts, theme |
| `next.config.ts` | Security headers, image config |
| `vercel.json` | Vercel deployment config |
| `proxy.ts` | Rate limiting, security |

---

## Technology Stack

### Core Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vercel** - Deployment platform

### Key Libraries

| Library | Purpose |
|---------|---------|
| `@vercel/analytics` | Traffic analytics |
| `@vercel/speed-insights` | Performance monitoring |
| `@vercel/blob` | Image storage |
| `next-themes` | Dark/light mode |
| `react-hook-form` | Form validation |
| `framer-motion` | Animations |

### Development Tools

- **ESLint** - Code quality
- **TypeScript** - Type checking
- **Jest** - Unit testing

---

## Features

### ✅ Implemented Features

| Feature | Status | Description |
|---------|--------|-------------|
| Mobile-First Design | ✅ | Works on all screen sizes |
| Dark/Light Theme | ✅ | Toggle with system detection |
| WhatsApp Booking | ✅ | One-click appointment booking |
| Service Pages | ✅ | 11 detailed service pages |
| Doctor Profiles | ✅ | Qualifications, galleries |
| Security Headers | ✅ | CSP, HSTS, X-Frame-Options |
| Rate Limiting | ✅ | 100 requests/minute |
| SEO Optimization | ✅ | Meta tags, sitemap, robots.txt |
| Accessibility | ✅ | WCAG 2.1 AA compliant |
| Skip to Content | ✅ | Keyboard navigation |

### 🎨 Design System

#### Colors (Light Mode)

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#C8A2C8` | Lilac, buttons |
| Accent | `#A47DAB` | Links, highlights |
| Background | `#FAF6F0` | Cream white |
| Text | `#2C2C2C` | Dark charcoal |

#### Colors (Dark Mode)

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#D4B5D4` | Light lilac |
| Accent | `#B899BF` | Muted purple |
| Background | `#1a1a1a` | Near black |
| Text | `#E5E5E5` | Off white |

---

## Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **npm** 9.x or later

### Installation (For Developers)

```bash
# Clone or download the project
cd my-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The website will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Purpose |
|--------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production build |
| `npm run lint` | Check code quality |
| `npm test` | Run unit tests |

### Environment Variables

Create a `.env.local` file:

```env
# Required - Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=your_blob_token

# Required - Site URL
NEXT_PUBLIC_SITE_URL=https://wingswomencentre.vercel.app
```

---

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Automatic Deployment

1. Push to GitHub
2. Vercel auto-deploys from main branch
3. Custom domain: wingswomencentre.com

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Build fails | Run `npm install` again |
| Images not loading | Check BLOB_READ_WRITE_TOKEN |
| WhatsApp not opening | Verify phone number in lib/whatsapp.ts |
| Dark mode flickering | Check theme-provider.tsx |

### Need Help?

- **Email:** boga.viswanath@gmail.com
- **Phone:** +91 95027 12812

---

## License

This project is proprietary software owned by Wings Women Center.

---

## Acknowledgments

- [Next.js](https://nextjs.org) - Framework
- [Vercel](https://vercel.com) - Hosting
- [Tailwind CSS](https://tailwindcss.com) - Styling

---

<div align="center">

### 💜 Thank You for Visiting Wings Women Center

*"Giving Birth to Your Hope"*

![Logo](./public/favicon.png)

**Wings Women Center** | Fertility & Women's Health Clinic  
Kurnool, Andhra Pradesh

[Book Appointment](https://wa.me/919502712812) · [+91 95027 12812](tel:+919502712812)

</div>