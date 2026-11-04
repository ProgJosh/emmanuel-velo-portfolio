const fallback = 'http://localhost:3000';

// Normalizes through URL so the host is lowercase and there is no trailing slash.
// The canonical URL, sitemap, and robots.txt must all spell the site address identically.
export function resolveSiteUrl(configured: string | undefined = process.env.NEXT_PUBLIC_SITE_URL) {
  if (!configured || !/^https?:\/\//.test(configured)) return fallback;
  try {
    const url = new URL(configured);
    return `${url.origin}${url.pathname}`.replace(/\/$/, '');
  } catch {
    return fallback;
  }
}

export const siteUrl = resolveSiteUrl();
