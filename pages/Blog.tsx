import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Check, User, ArrowRight, Download, MessageSquare, Mail, Linkedin, Share2, Search, Facebook, Twitter, BookOpen } from 'lucide-react';
import { api } from '../services/api';
import { BlogPost as BlogPostType, BlogPageData } from '../types';
import Loading from '../components/Loading';
import SEO from '../components/SEO';
import Giscus from '../components/Giscus';

// --- Types ---

interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
  isPending?: boolean;
}

// --- Sub-components ---

const ReadingProgress: React.FC = () => {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollCompletion);
    return () => window.removeEventListener('scroll', updateScrollCompletion);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
      <div
        className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-150 ease-out"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
};

const StickyShare: React.FC<{ title: string; slug: string }> = ({ title, slug }) => {
  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  // Desktop Component (Floating Sidebar)
  const DesktopShare = () => (
    <div className="hidden lg:flex flex-col gap-3 fixed left-8 top-1/2 -translate-y-1/2 z-40 bg-slate-900/50 backdrop-blur-sm p-3 rounded-2xl border border-slate-800 shadow-xl">
      <span className="text-[10px] text-slate-500 font-bold uppercase text-center mb-1">Share</span>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-[#0077b5] hover:bg-[#0077b5]/10 rounded-lg transition-colors" aria-label="Share on LinkedIn" data-event-category="Blog" data-event-action="Share LinkedIn">
        <Linkedin size={20} />
      </a>
      <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 rounded-lg transition-colors" aria-label="Share on Twitter" data-event-category="Blog" data-event-action="Share Twitter">
        <Twitter size={20} />
      </a>
      <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors" aria-label="Share via Email" data-event-category="Blog" data-event-action="Share Email">
        <Mail size={20} />
      </a>
    </div>
  );

  // Mobile Component (Fixed Bottom Bar)
  const MobileShare = () => (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 px-6 py-4 flex items-center justify-between shadow-2xl safe-area-bottom">
      <span className="text-sm font-bold text-slate-300">Share this article:</span>
      <div className="flex gap-4">
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#0077b5]">
          <Linkedin size={22} />
        </a>
        <a href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#1DA1F2]">
          <Twitter size={22} />
        </a>
        <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} className="text-slate-400 hover:text-white">
          <Mail size={22} />
        </a>
      </div>
    </div>
  );

  return (
    <>
      <DesktopShare />
      <MobileShare />
    </>
  );
};

// Using Giscus for comments instead of custom implementation

// --- Blog List Component ---

export const BlogList: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [pageData, setPageData] = useState<BlogPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const data = await api.pages.getBlogData();
        setPageData(data);
      } catch (error) {
        console.error('Error fetching blog page data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, []);

  if (loading) return <Loading />;
  if (!pageData) return null;

  // Enhanced Filter logic with Search
  const filteredPosts = pageData.posts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-950 min-h-screen py-16">
      <SEO
        title={`${pageData.title} | S Venkatesh Prasad`}
        description={pageData.subtitle}
        canonicalUrl="/blog"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            {pageData.title}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            {pageData.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12 relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 border border-slate-700 rounded-xl leading-5 bg-slate-900 text-slate-200 placeholder-slate-500 focus:outline-none focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-lg shadow-black/20 transition-all duration-200"
            placeholder="Search campaign breakdowns, outbound playbooks, or strategies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search articles"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {pageData.categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${activeCategory === category
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-900/40 transform scale-105'
                : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group flex flex-col bg-slate-900 rounded-xl shadow-sm border border-slate-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 overflow-hidden"
              data-event-category="Blog List"
              data-event-action="Click Article"
              data-event-label={post.title}
            >
              {/* Featured Image */}
              <div className="h-56 overflow-hidden bg-slate-800 relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-slate-900/90 backdrop-blur text-white text-xs font-bold rounded-md border border-slate-700">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-center text-xs text-slate-500 mb-3 space-x-3">
                  <span className="flex items-center"><Calendar size={12} className="mr-1" /> {post.date}</span>
                  <span className="flex items-center"><Clock size={12} className="mr-1" /> {post.readTime}</span>
                </div>

                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h2>

                <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between text-blue-500 font-medium text-sm group-hover:text-blue-400">
                  <span>Read Article</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800/50">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 text-slate-500 mb-4">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
            <p className="text-slate-400 mb-6">
              We couldn't find any posts matching "{searchQuery}" in {activeCategory}.
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="text-blue-500 font-medium hover:text-blue-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Single Blog Post Component ---

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        // In a real app, we might want a specific endpoint for details + related
        // For now we fetch all to find related, or just fetch the single one
        const foundPost = await api.blog.getBySlug(slug);

        if (foundPost) {
          setPost(foundPost);
          // Fetch all to determine related (mock logic)
          // Ideally, the backend returns related posts
          // Note: using the Page API to get all posts for related logic
          const { posts: allPosts } = await api.pages.getBlogData();
          const related = allPosts
            .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
            .slice(0, 4);
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <Loading />;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <SEO
        title={`${post.title} | S Venkatesh Prasad`}
        description={post.excerpt}
        canonicalUrl={`/blog/${post.slug}`}
        type="article"
        imageUrl={post.imageUrl}
      />
      <ReadingProgress />
      <StickyShare title={post.title} slug={post.slug} />

      <article className="bg-slate-950 min-h-screen pt-12 pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb / Back Link */}
          <Link to="/blog" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Blog
          </Link>

          {/* Article Header */}
          <header className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 border border-blue-900/50 text-xs font-bold uppercase tracking-wide">
                {post.category}
              </span>
              <span className="text-slate-500 text-sm">•</span>
              <span className="text-slate-400 text-sm font-medium flex items-center">
                <Clock size={14} className="mr-1" /> {post.readTime}
              </span>
              <span className="text-slate-500 text-sm">•</span>
              <span className="text-slate-400 text-sm font-medium flex items-center">
                <BookOpen size={14} className="mr-1" /> {post.wordCount} words
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-8">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-6 text-sm text-slate-400 border-t border-b border-slate-800 py-4 max-w-xl mx-auto">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mr-3 border border-slate-700">
                  <User size={16} className="text-slate-300" />
                </div>
                <div>
                  <span className="block text-white font-medium">Venkat</span>
                  <span className="text-xs text-slate-500">Author</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800"></div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2 text-slate-500" />
                <span>{post.date}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="max-w-4xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-800">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-auto object-cover max-h-[500px]"
              loading="eager" // LCP element
            />
          </div>

          {/* Main Grid Layout */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Main Content Column */}
            <div className="lg:col-span-8">
              {/* Typography Content */}
              <div
                className="prose prose-lg prose-invert max-w-none 
                  prose-headings:text-white prose-headings:font-bold prose-headings:scroll-mt-24
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-2
                  prose-h3:text-xl prose-h3:text-blue-100 prose-h3:mt-8
                  prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-semibold
                  prose-ul:list-disc prose-ul:pl-6 prose-ul:text-slate-300
                  prose-li:mb-2
                  prose-img:rounded-xl prose-img:shadow-lg prose-img:max-w-full prose-img:mx-auto prose-img:h-auto"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* CTA */}
              <div className="mt-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Enjoyed this read?</h3>
                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                  I apply these exact strategies to drive growth. Check out my case studies to see the results in action, or grab my resume.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/case-studies" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-900/20" data-event-category="Blog CTA" data-event-action="Click Case Studies">
                    View Case Studies
                  </Link>
                  <Link to="/resume" className="inline-flex items-center justify-center px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold rounded-lg transition-colors" data-event-category="Blog CTA" data-event-action="Click Resume">
                    <Download size={18} className="mr-2" /> Download Resume
                  </Link>
                </div>
              </div>

              {/* Giscus Comments Section */}
              <Giscus />
            </div>

            {/* Sidebar Column (Related Articles) */}
            <aside className="lg:col-span-4 space-y-8">
              <div className="sticky top-28">
                <h3 className="text-xl font-bold text-white mb-6 pl-2 border-l-4 border-blue-500">Related Articles</h3>
                <div className="space-y-6">
                  {relatedPosts.length > 0 ? (
                    relatedPosts.map((rPost) => (
                      <Link key={rPost.id} to={`/blog/${rPost.slug}`} className="group flex gap-4 items-start bg-slate-900/50 p-3 rounded-xl border border-transparent hover:border-slate-700 hover:bg-slate-900 transition-all">
                        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-800">
                          <img src={rPost.imageUrl} alt={rPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90 group-hover:opacity-100" loading="lazy" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">{rPost.category}</span>
                          <h4 className="font-bold text-slate-200 text-sm mb-1 leading-snug group-hover:text-white line-clamp-2">{rPost.title}</h4>
                          <span className="text-xs text-slate-500">{rPost.date}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-slate-500 text-sm">No related articles found.</p>
                  )}
                </div>

                {/* Optional Mini-Bio in Sidebar */}
                <div className="mt-12 bg-slate-900 rounded-xl p-6 border border-slate-800">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                      <User size={24} className="text-slate-300" />
                    </div>
                    <div>
                      <p className="text-white font-bold">Venkat</p>
                      <p className="text-xs text-slate-500">Growth Marketer</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">
                    B2B Demand Generation Specialist. I help SaaS companies build predictable pipeline through outbound sequencing and paid ads.
                  </p>
                  <Link to="/about" className="text-sm font-medium text-blue-500 hover:text-blue-400">
                    More about me &rarr;
                  </Link>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </article>
    </>
  );
};
