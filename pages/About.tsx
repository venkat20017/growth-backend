import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Briefcase, BookOpen, Download } from 'lucide-react';
import { api } from '../services/api';
import { AboutPageData } from '../types';
import Loading from '../components/Loading';
import SEO from '../components/SEO';

const About: React.FC = () => {
  const [data, setData] = useState<AboutPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutData = await api.pages.getAboutData();
        setData(aboutData);
      } catch (error) {
        console.error("Failed to fetch about data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (!data) return null;

  return (
    <div className="bg-slate-950 min-h-screen py-16">
      <SEO
        title="About S Venkatesh Prasad | B2B Demand Generation Specialist"
        description="Learn about S Venkatesh Prasad's journey from System Engineer to B2B Demand Generation & Performance Marketing Specialist. Expertise in B2B SaaS, Technical SEO, and Marketing Automation."
        canonicalUrl="/about"
        imageUrl={data.profile.imageUrl}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header / Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start mb-16">
          {/* Profile Image */}
          <div className="relative flex-shrink-0 group">
            {/* Decorative glow effect behind image */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-emerald-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>

            {/* Image Container */}
            <img
              src={data.profile.imageUrl}
              alt={`${data.profile.name} - Growth Marketer`}
              loading="lazy"
              className="relative w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-slate-900 shadow-2xl z-10"
              onError={(e) => {
                // Fallback to a professional placeholder if local image is missing
                e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                e.currentTarget.onerror = null;
              }}
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold text-white mb-6">Behind the Screen</h1>
            <div className="prose prose-lg prose-invert text-slate-300 mx-auto md:mx-0">
              {data.profile.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Briefcase className="mr-2 text-blue-500" /> Technical Arsenal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.skillGroups.map((group, idx) => (
              <div
                key={group.title}
                className={`bg-slate-900/50 p-6 rounded-xl border border-slate-800 transition-colors ${idx === 0 ? 'hover:border-blue-500/30' : idx === 1 ? 'hover:border-emerald-500/30' : 'md:col-span-2 hover:border-purple-500/30'
                  }`}
              >
                <h3 className="text-xl font-bold text-white mb-4 border-b border-slate-800 pb-2">{group.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm border ${idx === 0 ? 'bg-blue-900/20 text-blue-300 border-blue-900/30' : idx === 1 ? 'bg-emerald-900/20 text-emerald-300 border-emerald-900/30' : 'bg-purple-900/20 text-purple-300 border-purple-900/30'
                        }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="mr-2 text-blue-500" /> Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.certifications.map((cert, index) => (
              <div key={index} className="flex flex-col p-4 bg-slate-900 border border-slate-800 rounded-lg shadow-sm hover:border-blue-500/50 transition-colors">
                <div className="flex items-start mb-3">
                  <div className="p-2 bg-yellow-900/30 rounded-full text-yellow-500 mr-4 border border-yellow-900/50 flex-shrink-0">
                    <Award size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-200">{cert.name}</h3>
                    <p className="text-sm text-slate-500">{cert.issuer} {cert.date ? `• ${cert.date}` : ''}</p>
                  </div>
                </div>
                {cert.imageUrl && (
                  <img
                    src={cert.imageUrl}
                    alt={`${cert.name} Certificate`}
                    className="rounded-lg border border-slate-700 w-full h-48 object-cover mt-2 hover:opacity-90 transition-opacity cursor-pointer"
                    onClick={() => window.open(cert.imageUrl, '_blank')}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Resume CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 text-white p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Want the full picture?</h3>
            <p className="text-slate-300">Download my resume to see my professional timeline and education.</p>
          </div>
          <Link
            to="/resume"
            className="flex-shrink-0 inline-flex items-center px-6 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors shadow-lg"
          >
            <Download size={18} className="mr-2" />
            Download Resume
          </Link>
        </div>

      </div>
    </div>
  );
};

export default About;
