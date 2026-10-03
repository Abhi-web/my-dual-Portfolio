/**
 * Technical SEO & Canonical URL Management
 * Ensures clean canonical URL pointing to official production domain
 * Supports configurable VITE_SITE_URL without duplicate indexing from query parameters.
 */

export function setupCanonicalAndSEO() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const envUrl = import.meta.env.VITE_SITE_URL;
  const defaultDomain = 'https://abhishekkushwaha.dev';
  const baseDomain = (envUrl || defaultDomain).replace(/\/+$/, '');

  // Ensure canonical tag exists and points cleanly to base domain
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }

  // Canonical must never contain query parameters like ?profile=tech
  const canonicalUrl = `${baseDomain}/`;
  if (canonicalEl.getAttribute('href') !== canonicalUrl) {
    canonicalEl.setAttribute('href', canonicalUrl);
  }

  // Ensure Open Graph and Twitter URL also match
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

  const twitterUrl = document.querySelector('meta[name="twitter:url"]');
  if (twitterUrl) twitterUrl.setAttribute('content', canonicalUrl);
}

export default setupCanonicalAndSEO;
