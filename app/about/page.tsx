import Image from "next/image";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "About",
  description: "Learn more about our Next.js SSR template and its capabilities",
  keywords: ["About", "Next.js", "SSR", "Template", "Story"],
});

export default function AboutPage() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-indigo-600">Our Mission</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better way to build web applications</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
                We created this template to help developers build modern web applications faster without sacrificing quality, performance, or SEO.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="Application screenshot"
            width={1824}
            height={1080}
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
                This Next.js SSR template is designed with a focus on performance, SEO, and developer experience. 
                It includes everything you need to start building your project right away, with best practices 
                baked in from the beginning.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <span className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true">+</span>
                  <span>
                    <strong className="font-semibold text-gray-900">Performance first.</strong> Built with 
                    Next.js and optimized for speed and Core Web Vitals out of the box.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true">+</span>
                  <span>
                    <strong className="font-semibold text-gray-900">SEO optimized.</strong> Includes 
                    structured metadata, Open Graph tags, and Twitter cards for better search engine rankings.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <span className="mt-1 h-5 w-5 flex-none text-indigo-600" aria-hidden="true">+</span>
                  <span>
                    <strong className="font-semibold text-gray-900">Developer friendly.</strong> TypeScript, 
                    ESLint, and a structured project layout for a better development experience.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                By using this template, you can focus on building your application's unique features 
                rather than setting up the infrastructure and configuration. It's the perfect starting 
                point for your next web project.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">No compromises</h2>
              <p className="mt-6">
                We believe that you shouldn't have to choose between performance, SEO, and developer 
                experience. This template provides all three, giving you the best foundation for your project.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 