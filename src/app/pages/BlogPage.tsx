import { SEO, createBreadcrumbSchema } from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { allBlogArticles as blogArticles } from '../utils/blogData';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Link } from 'react-router';
import { Calendar, Clock, ArrowRight, Sparkles, TrendingUp, Target } from 'lucide-react';

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Home', url: 'https://www.comify.ai' },
    { name: 'Blog', url: 'https://www.comify.ai/blog' }
  ]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Comify AI Fashion Tech Blog",
    "description": "Latest insights on AI fashion technology, virtual try-on trends, and e-commerce innovation",
    "url": "https://www.comify.ai/blog"
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error(language === 'de' ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein' : 'Please enter a valid email address');
      return;
    }
    // TODO: Implement newsletter subscription backend
    toast.success(language === 'de' ? 'Vielen Dank für Ihr Abonnement!' : 'Thank you for subscribing!');
    setEmail('');
  };

  const filteredArticles = selectedCategory
    ? blogArticles.filter(article => article.category === selectedCategory)
    : blogArticles;

  const displayedBlogPosts = filteredArticles.slice(0, 6);

  return (
    <>
      <SEO
        title={language === 'de'
          ? 'Fashion Tech Blog - KI & Virtuelle Anprobe Insights | Comify AI'
          : 'Fashion Tech Blog - AI & Virtual Try-On Insights | Comify AI'}
        description={language === 'de'
          ? 'Bleiben Sie auf dem Laufenden mit den neuesten Trends in KI-Mode-Technologie, virtueller Anprobe und E-Commerce-Innovation. Expertenwissen von Comify AI.'
          : 'Stay updated with the latest trends in AI fashion technology, virtual try-on, and e-commerce innovation. Expert insights from Comify AI.'}
        keywords={language === 'de'
          ? 'Fashion Tech Blog, KI Mode, Virtuelle Anprobe Blog, E-Commerce Trends, Mode Technologie News'
          : 'fashion tech blog, AI fashion, virtual try-on blog, e-commerce trends, fashion technology news'}
        url="https://www.comify.ai/blog"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbSchema, blogSchema]
        }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-black via-[#666666] to-black text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                {language === 'de' ? 'Fashion Tech Insights' : 'Fashion Tech Insights'}
              </Badge>
              <h1 className="text-5xl font-bold mb-6">
                {language === 'de' ? 'Comify AI Blog' : 'Comify AI Blog'}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {language === 'de'
                  ? 'Entdecken Sie die neuesten Trends in KI-Mode-Technologie, virtuelle Anprobe und E-Commerce-Innovation'
                  : 'Discover the latest trends in AI fashion technology, virtual try-on, and e-commerce innovation'}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
          <Card className="overflow-hidden shadow-xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                <ImageWithFallback
                  src={displayedBlogPosts[0]?.image}
                  alt={displayedBlogPosts[0]?.title[language]}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-black text-white">
                  {language === 'de' ? 'Neueste' : 'Featured'}
                </Badge>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="w-fit mb-4">{displayedBlogPosts[0]?.category}</Badge>
                <h2 className="text-3xl font-bold mb-4">{displayedBlogPosts[0]?.title[language]}</h2>
                <p className="text-gray-600 mb-6">{displayedBlogPosts[0]?.excerpt[language]}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(displayedBlogPosts[0]?.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {displayedBlogPosts[0]?.readTime}
                  </span>
                </div>
                <Button className="w-fit" asChild>
                  <Link to={`/blog/${displayedBlogPosts[0]?.slug}`}>
                    {language === 'de' ? 'Artikel lesen' : 'Read Article'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-8">
            {language === 'de' ? 'Neueste Artikel' : 'Latest Articles'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBlogPosts.slice(1).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title[language]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3">{post.category}</Badge>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title[language]}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt[language]}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/blog/${post.slug}`}>
                      {language === 'de' ? 'Weiterlesen' : 'Read More'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="bg-black text-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              {language === 'de' ? 'Bleiben Sie auf dem Laufenden' : 'Stay Updated'}
            </h2>
            <p className="text-gray-300 mb-8">
              {language === 'de'
                ? 'Abonnieren Sie unseren Newsletter für die neuesten Insights zu Fashion Tech und KI'
                : 'Subscribe to our newsletter for the latest insights on fashion tech and AI'}
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'de' ? 'Ihre E-Mail-Adresse' : 'Your email address'}
                className="flex-1 px-4 py-3 rounded-lg text-black border-2 border-white focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                {language === 'de' ? 'Abonnieren' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold mb-8">
            {language === 'de' ? 'Kategorien erkunden' : 'Explore Categories'}
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: language === 'de' ? 'KI Technologie' : 'AI Technology', slug: 'AI Technology', icon: Sparkles },
              { name: language === 'de' ? 'Business' : 'Business', slug: 'Business', icon: TrendingUp },
              { name: language === 'de' ? 'Innovation' : 'Innovation', slug: 'Innovation', icon: Target },
              { name: language === 'de' ? 'Integration' : 'Integration', slug: 'Integration', icon: Target }
            ].map((category) => {
              const count = blogArticles.filter(article => article.category === category.slug).length;
              return (
                <Card 
                  key={category.slug} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(selectedCategory === category.slug ? null : category.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <category.icon className="w-12 h-12 mx-auto mb-4 text-black" />
                    <h3 className="font-bold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">
                      {count} {language === 'de' ? 'Artikel' : 'articles'}
                    </p>
                    {selectedCategory === category.slug && (
                      <Badge className="mt-2 bg-black text-white">
                        {language === 'de' ? 'Aktiv' : 'Active'}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}