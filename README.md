# Next.js SSR Template

A high-performance, SEO-optimized Next.js template with server-side rendering capabilities, designed for modern web applications.

## Features

- **Server-Side Rendering**: Leverages Next.js SSR for improved performance and SEO benefits
- **SEO Optimization**: Built-in metadata management, Open Graph tags, and structured data
- **TypeScript Support**: Full TypeScript integration for better type safety and developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn UI Components**: Beautifully designed, accessible UI components
- **Smooth Scrolling**: Integrated Lenis for buttery-smooth scroll experiences
- **Lucide Icons**: Beautiful, consistent, open-source icons as React components
- **Responsive Design**: Fully responsive layout that works on all devices and screen sizes
- **Accessibility**: Built with accessibility in mind to ensure your app can be used by everyone
- **Performance Optimized**: Optimized for Core Web Vitals and fast loading times

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/ssr-template.git
   cd ssr-template
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
├── app/                   # App Router pages and layouts
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── features/          # Features page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── layout/            # Layout components (header, footer)
│   ├── providers/         # Provider components
│   └── ui/                # UI components
├── lib/                   # Utility functions and libraries
│   └── seo/               # SEO utilities
├── public/                # Static assets
├── .gitignore             # Git ignore file
├── components.json        # shadcn UI configuration
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── postcss.config.mjs     # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Customization

### Metadata and SEO

Update the site-wide metadata in `app/layout.tsx` and use the `createMetadata` function from `lib/seo/metadata.ts` to create page-specific metadata.

### UI Components

This template uses shadcn UI components. You can add more components with:

```bash
npx shadcn add [component-name]
```

### Styling

This template uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.js`.

## Deployment

You can deploy this template to any platform that supports Next.js, such as Vercel, Netlify, or a self-hosted server.

### Deploying to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Lenis by Studio Freight](https://lenis.studiofreight.com/)
