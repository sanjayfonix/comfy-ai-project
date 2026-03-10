import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { SEO, createBreadcrumbSchema } from '../../components/SEO';
import { useLanguage } from '../../context/LanguageContext';
import { allBlogArticles as blogArticles } from '../../utils/blogData';

export default function BlogArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.comify.ai' },
    { name: 'Blog', url: 'https://www.comify.ai/blog' },
    { name: article.title[language], url: `https://www.comify.ai/blog/${article.slug}` }
  ]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title[language],
    "description": article.excerpt[language],
    "image": article.image,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Person",
      "name": "Stanley Agu",
      "jobTitle": "CEO",
      "worksFor": {
        "@type": "Organization",
        "name": "Comify AI"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Comify AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.comify.ai/logo.png"
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title[language],
        text: article.excerpt[language],
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <SEO
        title={`${article.title[language]} | Comify AI Blog`}
        description={article.excerpt[language]}
        keywords={article.tags.join(', ')}
        url={`https://www.comify.ai/blog/${article.slug}`}
        image={article.image}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, articleSchema]
        }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-black text-white py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 mb-6"
              onClick={() => navigate('/blog')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'de' ? 'Zurück zum Blog' : 'Back to Blog'}
            </Button>
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {article.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {article.title[language]}
            </h1>
            <div className="flex items-center gap-6 text-sm text-gray-300">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Stanley Agu, CEO of Comify
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
            <ImageWithFallback
              src={article.image}
              alt={article.title[language]}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card>
            <CardContent className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                {article.content[language]}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">
                  {language === 'de' ? 'Über den Autor' : 'About the Author'}
                </h3>
                <p className="text-gray-600">
                  <strong>Stanley Agu</strong> {language === 'de' ? 'ist der' : 'is the'} CEO {language === 'de' ? 'von' : 'of'} Comify AI, {language === 'de' 
                    ? 'einem führenden Unternehmen für KI-gestützte virtuelle Anprobe-Technologie für die Modebranche. Mit einer Vision, die Art und Weise, wie Menschen online einkaufen, zu revolutionieren, leitet Stanley Comify zu neuen Höhen in der Fashion-Tech-Industrie.'
                    : 'a leading AI-powered virtual try-on technology company for the fashion industry. With a vision to revolutionize how people shop online, Stanley is leading Comify to new heights in the fashion tech industry.'}
                </p>
              </div>

              {/* Share */}
              <div className="mt-8 flex justify-center">
                <Button onClick={handleShare} variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  {language === 'de' ? 'Artikel teilen' : 'Share Article'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">
              {language === 'de' ? 'Weitere Artikel' : 'Related Articles'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogArticles
                .filter(a => a.slug !== slug && a.category === article.category)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Card key={relatedArticle.slug} className="hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <ImageWithFallback
                        src={relatedArticle.image}
                        alt={relatedArticle.title[language]}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-3">{relatedArticle.category}</Badge>
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">
                        {relatedArticle.title[language]}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedArticle.excerpt[language]}
                      </p>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/blog/${relatedArticle.slug}`}>
                          {language === 'de' ? 'Weiterlesen' : 'Read More'}
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}