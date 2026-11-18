import React, { useEffect } from 'react';

export interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article' | 'product';
  ogImage?: string;
  noindex?: boolean;
}

const BASE_URL = 'https://www.airgocabs.com';

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage = 'https://www.airgocabs.com/images/hero-airport-car.jpg',
  noindex = false,
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set or create <meta> tag by attribute (name or property)
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 3. Primary Meta Tags
    setMetaTag('name', 'title', title);
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // 4. Construct Clean Self-Referencing Canonical URL (STRICTLY stripping query parameters)
    const cleanPath = canonicalPath 
      ? (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`)
      : window.location.pathname;
    
    // Normalize root path to https://www.airgocabs.com/
    const normalizedPath = cleanPath === '' || cleanPath === '/' ? '/' : cleanPath.replace(/\/+$/, '');
    const fullCanonical = `${BASE_URL}${normalizedPath === '/' ? '/' : normalizedPath}`;

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullCanonical);

    // 5. OpenGraph Tags
    setMetaTag('property', 'og:site_name', 'AirGo Cabs');
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', fullCanonical);
    setMetaTag('property', 'og:image', ogImage);

    // 6. Twitter Card Tags
    setMetaTag('property', 'twitter:card', 'summary_large_image');
    setMetaTag('property', 'twitter:title', title);
    setMetaTag('property', 'twitter:description', description);
    setMetaTag('property', 'twitter:url', fullCanonical);
    setMetaTag('property', 'twitter:image', ogImage);
  }, [title, description, canonicalPath, ogType, ogImage, noindex]);

  return null;
};
