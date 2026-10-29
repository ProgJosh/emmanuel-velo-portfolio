'use client';

import type { MouseEvent, ReactNode } from 'react';
import { identity } from '@/lib/portfolio-data';

const widgetStyle = 'https://assets.calendly.com/assets/external/widget.css';
const widgetScript = 'https://assets.calendly.com/assets/external/widget.js';

type CalendlyApi = { initPopupWidget: (options: { url: string }) => void };
type CalendlyWindow = Window & { Calendly?: CalendlyApi };

let widgetLoad: Promise<CalendlyApi> | undefined;

// Calendly's widget is third-party code, so it loads only once a visitor shows interest in booking.
function loadCalendly(): Promise<CalendlyApi> {
  const existing = (window as CalendlyWindow).Calendly;
  if (existing) return Promise.resolve(existing);

  widgetLoad ??= new Promise<CalendlyApi>((resolve, reject) => {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = widgetStyle;
    const script = document.createElement('script');
    script.src = widgetScript;
    script.async = true;
    script.onload = () => {
      const api = (window as CalendlyWindow).Calendly;
      if (api) resolve(api);
      else reject(new Error('Calendly widget unavailable'));
    };
    script.onerror = () => {
      widgetLoad = undefined;
      style.remove();
      script.remove();
      reject(new Error('Calendly widget failed to load'));
    };
    document.head.appendChild(style);
    document.body.appendChild(script);
  });
  return widgetLoad;
}

// A normal link first: it works without JavaScript, and opens Calendly in a new tab if the widget cannot load.
export function CalendlyLink({ className, children }: { className?: string; children: ReactNode }) {
  const preload = () => {
    loadCalendly().catch(() => undefined);
  };

  const open = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    loadCalendly()
      .then((calendly) => calendly.initPopupWidget({ url: identity.calendly }))
      .catch(() => window.open(identity.calendly, '_blank', 'noopener,noreferrer'));
  };

  return (
    <a
      className={className}
      href={identity.calendly}
      target="_blank"
      rel="noopener noreferrer"
      aria-haspopup="dialog"
      onClick={open}
      onPointerEnter={preload}
      onFocus={preload}
    >
      {children}
      <span className="sr-only"> (opens a scheduling dialog)</span>
    </a>
  );
}
