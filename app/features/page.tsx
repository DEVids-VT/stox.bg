import { Check } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Features",
  description: "Discover the powerful features included in our Next.js SSR template",
  keywords: ["Features", "Next.js", "SSR", "Template", "Performance"],
});

const features = [
  {
    name: "Server-Side Rendering",
    description: "Leverage Next.js SSR for improved performance and SEO benefits."
  },
  {
    name: "SEO Optimization",
    description: "Built-in metadata management, Open Graph tags, and structured data."
  },
  {
    name: "TypeScript Support",
    description: "Full TypeScript integration for better type safety and developer experience."
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development."
  },
  {
    name: "Shadcn UI Components",
    description: "Beautifully designed, accessible UI components built with Radix UI and Tailwind."
  },
  {
    name: "Smooth Scrolling",
    description: "Integrated Lenis for buttery-smooth scroll experiences."
  },
  {
    name: "Lucide Icons",
    description: "Beautiful, consistent, open-source icons as React components."
  },
  {
    name: "Responsive Design",
    description: "Fully responsive layout that works on all devices and screen sizes."
  },
  {
    name: "Accessibility",
    description: "Built with accessibility in mind to ensure your app can be used by everyone."
  },
  {
    name: "Performance Optimized",
    description: "Optimized for Core Web Vitals and fast loading times."
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Fully Featured</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to build modern web applications
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our Next.js SSR template comes packed with features to help you build high-performance,
            SEO-optimized web applications quickly and efficiently.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <Check className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 