import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Search, Target, Download, Users, Activity } from 'lucide-react';
import { api } from '../services/api'; // Use the API service
import { HomePageData } from '../types';
import Loading from '../components/Loading'; // Import loading component
import SEO from '../components/SEO';

// Separated component for cleanliness, receiving data via props

const Home: React.FC = () => {
  const [data, setData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call the page-wise API
    const fetchData = async () => {
      try {
        const homeData = await api.pages.getHomeData();
        setData(homeData);
      } catch (error) {
        console.error("Failed to fetch home data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data) return null;

  return (
    <div>
      <SEO
        title="S Venkatesh Prasad | B2B Demand Generation & Performance Specialist"
        description="S Venkatesh Prasad is a Demand Generation Specialist specializing in B2B SaaS, Google Ads, and Performance Marketing. Explore my experiments, case studies, and insights."
        canonicalUrl="/"
        imageUrl={data.profileImage}
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-16 pb-16 md:pt-24 md:pb-24 lg:pt-32 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: Content */}
            <div className="text-left z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800 text-blue-300 text-sm font-semibold mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                Open to B2B SaaS Demand Generation Roles
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Demand Generation Specialist <br />
                <span className="text-blue-500">(B2B SaaS & Performance)</span>
                <span className="block text-lg md:text-xl mt-4 text-emerald-400 font-medium">
                  Ex-TCS | B2B SaaS Specialist | Google Ads | Growth Strategy
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
                B2B Demand Generation Specialist helping SaaS companies build predictable pipeline through outbound sequencing, LinkedIn Ads, and paid search. I work hands-on with Apollo.io, HubSpot, and Google Ads — not just strategy, but real campaigns. Ex-TCS | CS background | 8,500+ prospect lists built.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/case-studies"
                  className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-lg shadow-lg shadow-emerald-900/20 text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-emerald-500 transition-all transform hover:-translate-y-1"
                  data-event-category="Hero"
                  data-event-action="Click Case Studies"
                >
                  {data.hero.ctaPrimary}
                </Link>
                <Link
                  to="/resume"
                  className="inline-flex justify-center items-center px-8 py-3.5 border border-slate-700 text-base font-bold rounded-lg text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-600 transition-all"
                  data-event-category="Hero"
                  data-event-action="Click Resume"
                >
                  <Download size={18} className="mr-2" />
                  {data.hero.ctaSecondary}
                </Link>
              </div>
            </div>

            {/* Right Column: Visual */}
            <div className="relative z-10">
              {/* Decorative Background Elements */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob"></div>
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-emerald-600/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-800 bg-slate-900 rotate-1 hover:rotate-0 transition-transform duration-700 ease-out transform-gpu group will-change-transform">
                {/* Using Venkat's photo */}
                <img
                  src={data.profileImage || "/venkat-stylized.png"}
                  alt="Venkat - SEO & Performance Marketing Specialist"
                  className="w-full h-auto max-h-[500px] md:max-h-[600px] object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                  loading="eager"
                  // @ts-ignore
                  fetchpriority="high"
                  onError={(e) => {
                    // Fallback to a professional placeholder if local image is missing
                    e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    e.currentTarget.onerror = null;
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>


              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Core Competencies</h2>
            <p className="mt-2 text-slate-400">What I bring to the table</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700 flex flex-col items-center text-center hover:bg-slate-750 hover:border-slate-600 transition-all duration-300 group">
              <div className="p-3 bg-blue-900/30 rounded-full text-blue-400 mb-4 group-hover:text-blue-300 group-hover:bg-blue-900/50 transition-colors">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Outbound & Pipeline Generation</h3>
              <p className="text-slate-400">Apollo.io sequencing, ICP development, prospect list building, and cold email copywriting for B2B SaaS audiences. 8,500+ prospect lists built.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700 flex flex-col items-center text-center hover:bg-slate-750 hover:border-slate-600 transition-all duration-300 group">
              <div className="p-3 bg-emerald-900/30 rounded-full text-emerald-400 mb-4 group-hover:text-emerald-300 group-hover:bg-emerald-900/50 transition-colors">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Paid Demand Generation</h3>
              <p className="text-slate-400">LinkedIn Ads and Google Ads campaigns built for pipeline, not just clicks. Conversion tracking via GA4 and Google Tag Manager.</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-700 flex flex-col items-center text-center hover:bg-slate-750 hover:border-slate-600 transition-all duration-300 group">
              <div className="p-3 bg-purple-900/30 rounded-full text-purple-400 mb-4 group-hover:text-purple-300 group-hover:bg-purple-900/50 transition-colors">
                <Activity size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">CRM & Marketing Ops</h3>
              <p className="text-slate-400">HubSpot pipeline management, lead lifecycle workflows, and campaign attribution. Connecting marketing activity to actual revenue outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof of Work - Case Studies */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Recent Experiments</h2>
              <p className="mt-2 text-slate-400">Real results from my learning journey</p>
            </div>
            <Link to="/case-studies" className="hidden md:flex items-center text-blue-500 font-medium hover:text-blue-400 transition-colors">
              View all <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.featuredCaseStudies.map((study) => (
              <Link key={study.id} to={`/case-studies/${study.slug}`} className="group block h-full" data-event-category="Home Case Study" data-event-label={study.title}>
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 hover:border-slate-700 transition-all duration-300 flex flex-col h-full">
                  <div className="h-48 w-full overflow-hidden bg-slate-800 relative flex-shrink-0">
                    <img
                      src={study.heroImage}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/800x600/1e293b/cbd5e1?text=Image+Unavailable";
                        e.currentTarget.onerror = null;
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-slate-700">
                      Experiment
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">{study.title}</h3>
                    <p className="mt-2 text-slate-400 line-clamp-2 mb-4">{study.summary}</p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {(study.metrics || []).slice(0, 2).map((res, i) => (
                        <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-900/30 text-emerald-300 border border-emerald-900/50">
                          {res.metricName}: {res.metricValue}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 md:hidden">
            <Link to="/case-studies" className="flex items-center text-blue-500 font-medium hover:text-blue-400">
              View all case studies <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Latest Insights</h2>
            <p className="mt-2 text-slate-400">Thoughts on SEO, Digital Marketing, and my learning process</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.featuredBlogs.map((blog) => (
              <Link key={blog.id} to={`/blog/${blog.slug}`} className="block group" data-event-category="Home Blog" data-event-label={blog.title}>
                <article className="flex flex-col h-full bg-slate-800 rounded-xl shadow-lg border border-slate-700 hover:border-blue-500/30 hover:shadow-blue-900/20 transition-all duration-300 overflow-hidden">
                  <div className="h-48 overflow-hidden bg-slate-900 relative">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-slate-500 mb-3">
                      <span className="bg-blue-900/30 text-blue-300 border border-blue-900/50 px-2 py-1 rounded text-xs font-semibold mr-3">{blog.category}</span>
                      <span className="text-slate-400">{blog.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{blog.title}</h3>
                    <p className="text-slate-400 mb-4 line-clamp-2 flex-grow">{blog.excerpt}</p>
                    <div className="flex items-center text-blue-500 font-medium text-sm mt-auto group-hover:text-blue-400">
                      Read Article <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section >


      {/* CTA Section */}
      < section className="py-20 bg-gradient-to-br from-slate-900 to-slate-950 border-t border-slate-800" >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to discuss growth?</h2>
          <p className="text-slate-400 mb-8 text-lg">
            I'm currently open to full-time opportunities in B2B SaaS Demand Generation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-900/30 transition-all hover:scale-105" data-event-category="Footer CTA" data-event-action="Click Hire Me">
              Hire Me
            </Link>
            <Link to="/resume" className="px-8 py-3 bg-transparent border border-slate-600 text-slate-200 font-bold rounded-lg hover:bg-slate-800 hover:text-white hover:border-slate-500 transition-all" data-event-category="Footer CTA" data-event-action="Click Resume">
              View Resume
            </Link>
          </div>
        </div>
      </section >
    </div >
  );
};

export default Home;
