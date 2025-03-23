# Naadan Sowkhya - Next.js Website

Modern Next.js implementation of the Naadan Sowkhya e-commerce website, migrated from WordPress for enhanced performance and user experience. This migration focuses on delivering a faster, more reliable, and user-friendly experience while maintaining the rich content and functionality of the original WordPress site.

## WordPress to Next.js Migration Benefits

### Before (WordPress)

- Slower page loads due to database queries and PHP processing
- Limited mobile responsiveness
- Complex plugin dependencies
- Higher hosting costs
- Maintenance overhead with plugins and updates
- Basic image optimization
- Limited control over performance optimization

### After (Next.js)

- Fast page loads with static generation and server-side rendering
- Built-in image optimization with next/image
- No database queries - optimized JSON data
- Reduced hosting costs
- Zero plugin dependencies
- Full control over codebase and optimizations
- Modern development practices with TypeScript

## Major Improvements from WordPress Version

### 🚀 Performance Enhancements

- Migrated to Next.js 14 for improved page load times and SEO
- Implemented optimized image loading with next/image
- Reduced time-to-interactive with client-side routing
- Improved Core Web Vitals scores

### 💅 UI/UX Improvements

- Completely redesigned responsive interface
- Enhanced product browsing with categorized views
- Added image lightbox for better product visualization
- Smooth animations and transitions for better user engagement
- Improved mobile navigation experience

### 🛠️ Technical Improvements

- Typescript implementation for better code reliability
- Modular component architecture
- Structured data management with JSON
- Improved SEO with Next.js metadata
- Better asset organization and management

### 📱 Mobile Experience

- Mobile-first responsive design
- Touch-friendly navigation
- Optimized images for mobile devices
- Improved load times on mobile networks

### 🔄 Content Management

- Simplified content updates through JSON files
- Structured product data management
- Easy-to-maintain testimonials system
- Organized media assets

## Local Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup Instructions

1. Clone the repository

```bash
git clone [repository-url]
cd naadan-sowkhya
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

## Project Structure

- `/src/app/*` - Next.js pages and routing
- `/src/components/*` - Reusable React components
- `/src/data/*` - JSON data files for content
- `/public/images/*` - Optimized image assets
- `/styles/*` - Global styles and CSS modules

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React 18
