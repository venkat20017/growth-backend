import React, { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, CheckCircle, Wrench, FlaskConical, Beaker, Lightbulb, Target, GitMerge, BarChart3, Binary, Info } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';
import { CaseStudy, CaseStudiesPageData } from '../types';
import Loading from '../components/Loading';
import SEO from '../components/SEO';

// Case Study List
export const CaseStudyList: React.FC = () => {
  const [pageData, setPageData] = useState<CaseStudiesPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const data = await api.pages.getCaseStudiesData();
        setPageData(data);
      } catch (error) {
        console.error("Failed to fetch case studies", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, []);

  if (loading) return <Loading />;
  if (!pageData) return null;

  return (
    <div className="bg-slate-950 min-h-screen py-16">
      <SEO
        title={`${pageData.title} | S Venkatesh Prasad`}
        description={pageData.subtitle}
        canonicalUrl="/case-studies"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4">
            {pageData.title.split('. ').map((part, i) => (
              <React.Fragment key={i}>
                {part}{i < pageData.title.split('. ').length - 1 ? '.' : ''}
                {i === 0 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-xl text-slate-400">
            {pageData.subtitle}
          </p>
        </div>

        <div className="space-y-16">
          {pageData.studies.map((study, index) => (
            <div key={study.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 w-full">
                <Link to={`/case-studies/${study.slug}`} className="block overflow-hidden rounded-2xl shadow-xl shadow-blue-900/10 border border-slate-800 hover:border-slate-600 transition-all duration-300">
                  <img
                    src={study.heroImage}
                    alt={study.title}
                    loading="lazy"
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/800x600/1e293b/cbd5e1?text=Image+Unavailable";
                      e.currentTarget.onerror = null;
                    }}
                  />
                </Link>
              </div>
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-2 text-blue-500 font-semibold uppercase tracking-wider text-sm">
                  <FlaskConical size={16} />
                  <span>Experiment</span>
                </div>
                <h2 className="text-3xl font-bold text-white leading-tight">
                  <Link to={`/case-studies/${study.slug}`} className="hover:text-blue-400 transition-colors">
                    {study.title}
                  </Link>
                </h2>
                <p className="text-lg text-slate-400">
                  {study.summary}
                </p>

                <div className="grid grid-cols-2 gap-4 py-4">
                  {(study.metrics || []).slice(0, 2).map((res, i) => (
                    <div key={i} className="border-l-4 border-blue-500/50 pl-4">
                      <div className="text-2xl font-bold text-white">{res.metricValue}</div>
                      <div className="text-sm text-slate-500">{res.metricName}</div>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/case-studies/${study.slug}`}
                  className="inline-flex items-center text-blue-500 font-bold hover:text-blue-400 transition-colors"
                >
                  Read Full Experiment Lab <ArrowLeft size={16} className="ml-2 rotate-180" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Case Study Detail
export const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudy = async () => {
      if (!slug) return;
      try {
        const data = await api.caseStudies.getBySlug(slug);
        setStudy(data || null);
      } catch (error) {
        console.error("Failed to fetch case study details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudy();
  }, [slug]);

  if (loading) return <Loading />;

  if (!study) {
    return <Navigate to="/case-studies" replace />;
  }

  return (
    <div className="bg-slate-950 min-h-screen pb-24">
      <SEO
        title={`${study.title} | Growth Experiment by S Venkatesh Prasad`}
        description={study.summary}
        canonicalUrl={`/case-studies/${study.slug}`}
        type="article"
        imageUrl={study.heroImage}
      />

      {/* 1. Hero – Growth Outcome */}
      <div className="bg-slate-900 text-white py-16 lg:py-24 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link to="/case-studies" className="inline-flex items-center text-slate-400 hover:text-white mb-10 transition-colors bg-slate-800/50 px-4 py-2 rounded-full text-sm font-medium border border-slate-700">
            <ArrowLeft size={16} className="mr-2" /> Back to Experiment Lab
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold uppercase tracking-widest text-xs mb-6 bg-emerald-950/30 w-fit px-3 py-1 rounded-md border border-emerald-900/50">
                <FlaskConical size={14} />
                <span>Growth Experiment</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight text-white">
                {study.title}
              </h1>
              <p className="text-xl text-slate-400 max-w-xl leading-relaxed font-light">
                {study.summary}
              </p>
            </div>

            <div className="relative group">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-800 bg-slate-950 aspect-video flex items-center justify-center p-4">
                {study.funnelPerformance && study.funnelPerformance.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={study.funnelPerformance}>
                      <defs>
                        <linearGradient id="colorHero" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="label" hide />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }}
                        itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorHero)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <img src={study.heroImage} alt={study.title} className="w-full h-full object-cover rounded-lg" />
                )}
              </div>
              <div className="absolute -inset-4 bg-emerald-500/5 blur-3xl -z-10 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 space-y-24">

        {/* 2. Pipeline Snapshot */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(study.metrics || []).map((res, i) => (
              <div key={i} className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 group">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-3 group-hover:text-emerald-400 transition-colors">{res.metricName}</p>
                <p className="text-4xl font-black text-white mb-2">{res.metricValue}</p>
                <div className="h-1 w-8 bg-emerald-500/50 rounded-full"></div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-24">

            {/* 3. Demand Generation Goal */}
            <section id="goal">
              <div className="flex items-center space-x-3 mb-6">
                <Target className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-bold text-white tracking-tight">Demand Generation Goal</h2>
              </div>
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 border-l-4 border-l-emerald-500">
                <p className="text-xl text-slate-300 leading-relaxed font-light">
                  {study.growthGoal || study.summary}
                </p>
              </div>
            </section>

            {/* 4. Funnel Architecture */}
            {study.funnelArchitecture && study.funnelArchitecture.length > 0 && (
              <section id="funnel">
                <div className="flex items-center space-x-3 mb-10">
                  <GitMerge className="text-blue-500" size={24} />
                  <h2 className="text-2xl font-bold text-white tracking-tight">Funnel Architecture</h2>
                </div>
                <div className="relative pt-4">
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-800 hidden md:block"></div>
                  <div className="space-y-12">
                    {study.funnelArchitecture.map((step, i) => (
                      <div key={i} className="flex flex-col md:flex-row gap-6 relative">
                        <div className="flex-shrink-0 w-12 h-12 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center text-blue-500 font-bold z-10 shadow-lg md:ml-0.5">
                          {i + 1}
                        </div>
                        <div className="bg-slate-900/40 p-6 rounded-xl border border-slate-800 flex-grow hover:bg-slate-900/60 transition-colors">
                          <h3 className="text-lg font-bold text-white mb-2">{step.stepName}</h3>
                          <p className="text-slate-400 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 5. Experiment Hypothesis */}
            {study.hypothesis && (
              <section id="hypothesis">
                <div className="flex items-center space-x-3 mb-6">
                  <Lightbulb className="text-yellow-500" size={24} />
                  <h2 className="text-2xl font-bold text-white tracking-tight">Experiment Hypothesis</h2>
                </div>
                <div className="bg-yellow-500/5 p-8 rounded-2xl border border-yellow-500/20 italic text-xl text-yellow-200/90 font-medium leading-relaxed">
                  "{study.hypothesis}"
                </div>
              </section>
            )}

            {/* 6. Strategy */}
            <section id="strategy">
              <div className="flex items-center space-x-3 mb-6">
                <Binary className="text-purple-500" size={24} />
                <h2 className="text-2xl font-bold text-white tracking-tight">Execution Strategy</h2>
              </div>
              <div className="prose prose-invert max-w-none text-slate-400 leading-relaxed text-lg font-light whitespace-pre-line">
                {study.strategy}
              </div>
            </section>

            {/* 8. Funnel Performance */}
            <section id="performance">
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-bold text-white tracking-tight">Funnel Performance</h2>
              </div>
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 space-y-10">
                {study.funnelPerformance && study.funnelPerformance.length > 0 && (
                  <div className="h-80 w-full bg-slate-950/50 p-6 rounded-xl border border-slate-800/50">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={study.funnelPerformance}>
                        <defs>
                          <linearGradient id="colorPerf" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b' }}
                          labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                          itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                        />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPerf)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
                <div className="text-slate-400 leading-relaxed text-lg font-light whitespace-pre-line">
                  {study.growthInsights || (study.metrics || []).map(r => `${r.metricName}: ${r.metricValue}. ${r.description}`).join('\n\n')}
                </div>
              </div>
            </section>

            {/* 9. Key Growth Insights */}
            <section id="insights">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-bold text-white tracking-tight">Key Growth Insights</h2>
              </div>
              <div className="bg-emerald-500/5 p-8 rounded-2xl border border-emerald-500/20 space-y-6">
                <div className="text-slate-300 leading-relaxed text-lg font-light whitespace-pre-line prose prose-invert prose-emerald">
                  {study.growthInsights}
                </div>
              </div>
            </section>

          </div>

          <aside className="space-y-12">
            {/* 7. Tools Stack */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 sticky top-12">
              <div className="flex items-center space-x-3 mb-8">
                <Wrench className="text-slate-400" size={20} />
                <h3 className="font-bold text-white uppercase text-xs tracking-widest">Tools Stack</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {study.tools.map((tool) => (
                  <span key={tool} className="px-4 py-2 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-xl text-sm font-medium hover:border-slate-500 transition-colors">
                    {tool}
                  </span>
                ))}
              </div>

              {/* 10. Next Growth Experiments */}
              <div className="mt-16 pt-16 border-t border-slate-800">
                <div className="flex items-center space-x-3 mb-8">
                  <Beaker className="text-purple-500" size={20} />
                  <h3 className="text-xl font-bold text-white tracking-tight">Next Experiments</h3>
                </div>
                <div className="space-y-4">
                  {(study.nextExperiments || ["A/B Test Landing Page", "Optimize CTA Copy", "Scale Paid Traffic"]).map((exp, i) => (
                    <div key={i} className="flex items-start bg-purple-500/5 p-4 rounded-xl border border-purple-500/10 group hover:border-purple-500/30 transition-all">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-sm text-slate-300 font-medium group-hover:text-purple-300 transition-colors uppercase tracking-wide">
                        {exp}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 bg-blue-600 rounded-xl p-6 text-center shadow-xl shadow-blue-500/20 transform hover:-translate-y-1 transition-all">
                <h4 className="text-white font-bold mb-4">Interested in my growth lab?</h4>
                <Link to="/contact" className="inline-block w-full py-3 bg-white text-blue-600 font-black rounded-lg hover:bg-slate-100 transition-colors">
                  Let's Connect
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
