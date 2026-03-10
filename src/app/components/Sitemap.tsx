import { useEffect } from 'react';

export function Sitemap() {
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/shop', priority: 0.9, changefreq: 'daily' },
    { url: '/virtual-try-on', priority: 0.9, changefreq: 'weekly' },
    { url: '/partner', priority: 0.8, changefreq: 'weekly' },
    { url: '/about', priority: 0.7, changefreq: 'monthly' },
    { url: '/contact', priority: 0.7, changefreq: 'monthly' },
    { url: '/login', priority: 0.5, changefreq: 'monthly' },
    { url: '/signup', priority: 0.5, changefreq: 'monthly' },
    { url: '/brand-integration', priority: 0.6, changefreq: 'monthly' },
    { url: '/investor-relations', priority: 0.6, changefreq: 'monthly' },
    { url: '/support', priority: 0.6, changefreq: 'monthly' },
  ];

  const generateSitemap = () => {
    const baseUrl = 'https://www.comify.ai';
    const today = new Date().toISOString().split('T')[0];

    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    sitemap += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    pages.forEach(page => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
      sitemap += `    <lastmod>${today}</lastmod>\n`;
      sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${page.priority}</priority>\n`;
      
      // Add language alternates for each URL
      sitemap += `    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}?lang=en"/>\n`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}${page.url}?lang=de"/>\n`;
      sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${page.url}"/>\n`;
      
      sitemap += '  </url>\n';
    });

    sitemap += '</urlset>';
    return sitemap;
  };

  const generateRobotsTxt = () => {
    return `# Comify AI - Robots.txt
User-agent: *
Allow: /

# Disallow private areas
Disallow: /dashboard
Disallow: /admin
Disallow: /api/

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Sitemap location
Sitemap: https://www.comify.ai/sitemap.xml

# Google-specific
User-agent: Googlebot
Allow: /
Crawl-delay: 0.5

# Bing-specific
User-agent: Bingbot
Allow: /
Crawl-delay: 0.5

# Block bad bots
User-agent: AhrefsBot
User-agent: SemrushBot
User-agent: MJ12bot
Disallow: /
`;
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Sitemap & SEO Configuration</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sitemap.xml</h2>
        <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
          <pre className="text-sm">{generateSitemap()}</pre>
        </div>
        <button
          onClick={() => {
            const blob = new Blob([generateSitemap()], { type: 'application/xml' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'sitemap.xml';
            a.click();
          }}
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Download sitemap.xml
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">robots.txt</h2>
        <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
          <pre className="text-sm">{generateRobotsTxt()}</pre>
        </div>
        <button
          onClick={() => {
            const blob = new Blob([generateRobotsTxt()], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'robots.txt';
            a.click();
          }}
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Download robots.txt
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3">Implementation Instructions</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>Download both sitemap.xml and robots.txt files using the buttons above</li>
          <li>Place robots.txt in your website's root directory (public folder)</li>
          <li>Place sitemap.xml in your website's root directory (public folder)</li>
          <li>Submit sitemap to Google Search Console: https://search.google.com/search-console</li>
          <li>Submit sitemap to Bing Webmaster Tools: https://www.bing.com/webmasters</li>
          <li>Verify robots.txt is accessible at: https://www.comify.ai/robots.txt</li>
          <li>Verify sitemap is accessible at: https://www.comify.ai/sitemap.xml</li>
        </ol>
      </div>

      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3">SEO Checklist</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Meta tags optimized on all pages with unique titles and descriptions</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Schema.org structured data implemented (Organization, Product, FAQ, Breadcrumb)</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Open Graph and Twitter Card tags for social media sharing</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Multilingual support with hreflang tags (English/German)</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Canonical URLs to prevent duplicate content</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Image alt tags for accessibility and SEO</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Local SEO optimization for Bremen, Germany and DACH region</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span>Voice search optimization with natural language content</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-3">Next Steps for Maximum SEO Impact</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li><strong>Google My Business:</strong> Create and verify your listing for local SEO</li>
          <li><strong>Google Search Console:</strong> Submit sitemap and monitor search performance</li>
          <li><strong>Bing Webmaster Tools:</strong> Submit sitemap for Bing indexing</li>
          <li><strong>Content Strategy:</strong> Create regular blog posts about fashion tech trends</li>
          <li><strong>Backlinks:</strong> Guest post on fashion and tech blogs</li>
          <li><strong>Social Media:</strong> Share content on LinkedIn, Twitter, Instagram</li>
          <li><strong>Local Directories:</strong> List business in German fashion/tech directories</li>
          <li><strong>Page Speed:</strong> Optimize images and use CDN for faster loading</li>
          <li><strong>Mobile Optimization:</strong> Ensure responsive design works perfectly</li>
          <li><strong>Analytics:</strong> Set up Google Analytics 4 and track conversions</li>
        </ol>
      </div>
    </div>
  );
}

export default Sitemap;
