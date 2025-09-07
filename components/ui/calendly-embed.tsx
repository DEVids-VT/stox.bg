'use client';

import Script from 'next/script';

type CalendlyInlineProps = {
  url: string;
  minWidth?: number;
  height?: number;
};

export function CalendlyInline({ url, minWidth = 320, height = 700 }: CalendlyInlineProps) {
  return (
    <div className="w-full">
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: `${minWidth}px`, height: `${height}px` }}
      />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
    </div>
  );
}


