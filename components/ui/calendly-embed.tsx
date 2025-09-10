'use client';

import Script from 'next/script';

type CalendlyInlineProps = {
  url: string;
  minWidth?: number;
  height?: number;
};

export function CalendlyInline({ url }: CalendlyInlineProps) {
  return (
    <div className="w-full">
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: "320px", height: "700px" }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
    </div>
  );
}


