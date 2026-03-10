import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
  noIndex?: boolean;
  canonical?: string;
}

export function SEO({
  title = 'Comify AI - Virtual Try-On Fashion Technology | AI-Powered Fashion Solutions',
  description = 'Experience the future of fashion with Comify AI\'s virtual try-on solutions. Enhance your customers\' shopping experience with AI-driven technology. Reduce returns by 85% and increase conversions by 3.2x.',
  keywords = 'Virtual Try-On Fashion, Fashion Technology, AI-driven Fashion Try-On, Virtual Reality Fashion Technology, Comify AI, Fashion Try-On AI, Virtual Try-On Germany, virtuelle Anprobe, Mode Technologie, KI Mode',
  image = 'https://www.comify.ai/og-image.jpg',
  url,
  type = 'website',
  structuredData,
  noIndex = false,
  canonical,
}: SEOProps) {
  const { language } = useLanguage();

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');
    updateMetaTag('language', language === 'de' ? 'German' : 'English');
    updateMetaTag('author', 'Comify AI GmbH');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', 'Comify AI', true);
    updateMetaTag('og:locale', language === 'de' ? 'de_DE' : 'en_US', true);
    
    if (url) {
      updateMetaTag('og:url', url, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical || url || window.location.href;

    // Structured Data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Language alternates
    let alternateDe = document.querySelector('link[rel="alternate"][hreflang="de"]') as HTMLLinkElement;
    let alternateEn = document.querySelector('link[rel="alternate"][hreflang="en"]') as HTMLLinkElement;
    let alternateXDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]') as HTMLLinkElement;

    if (!alternateDe) {
      alternateDe = document.createElement('link');
      alternateDe.rel = 'alternate';
      alternateDe.hreflang = 'de';
      document.head.appendChild(alternateDe);
    }
    if (!alternateEn) {
      alternateEn = document.createElement('link');
      alternateEn.rel = 'alternate';
      alternateEn.hreflang = 'en';
      document.head.appendChild(alternateEn);
    }
    if (!alternateXDefault) {
      alternateXDefault = document.createElement('link');
      alternateXDefault.rel = 'alternate';
      alternateXDefault.hreflang = 'x-default';
      document.head.appendChild(alternateXDefault);
    }

    const currentUrl = url || window.location.href;
    const baseUrl = currentUrl.split('?')[0];
    alternateDe.href = `${baseUrl}?lang=de`;
    alternateEn.href = `${baseUrl}?lang=en`;
    // x-default should point to German as it's our primary market (DACH region)
    alternateXDefault.href = `${baseUrl}?lang=de`;

  }, [title, description, keywords, image, url, type, structuredData, noIndex, canonical, language]);

  return null;
}

// Organization Schema for company-wide use
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Comify AI GmbH",
  "url": "https://www.comify.ai",
  "logo": "https://www.comify.ai/logo.png",
  "description": "Leading AI-powered virtual try-on technology platform for fashion e-commerce. Revolutionizing online shopping with 3D avatars and personalized fashion experiences.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Robert-Koch-Straße 22",
    "addressLocality": "Bremen",
    "postalCode": "28277",
    "addressCountry": "DE"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+49-421-70911311",
    "contactType": "Customer Service",
    "email": "ifexstan@yahoo.com",
    "availableLanguage": ["German", "English"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/comify-ai",
    "https://twitter.com/comifyai",
    "https://www.instagram.com/comifyai"
  ]
};

// Product Schema for Virtual Try-On Service
export const virtualTryOnProductSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Comify AI Virtual Try-On",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "249.99",
    "priceCurrency": "EUR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127"
  },
  "operatingSystem": "Web-based",
  "description": "AI-powered virtual try-on solution for fashion e-commerce. Reduce returns by 85% and increase conversions with 3D body scanning and real-time garment visualization."
};

// FAQ Schema
export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Breadcrumb Schema
export function createBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Local Business Schema
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Comify AI GmbH",
  "image": "https://www.comify.ai/storefront.jpg",
  "@id": "https://www.comify.ai",
  "url": "https://www.comify.ai",
  "telephone": "+49-421-70911311",
  "priceRange": "€€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Robert-Koch-Straße 22",
    "addressLocality": "Bremen",
    "postalCode": "28277",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 53.0793,
    "longitude": 8.8017
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.linkedin.com/company/comify-ai",
    "https://twitter.com/comifyai",
    "https://www.instagram.com/comifyai"
  ]
};