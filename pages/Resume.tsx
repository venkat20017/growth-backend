import React, { useState, useEffect } from 'react';
import { Download, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import { api } from '../services/api';
import { ResumePageData } from '../types';
import Loading from '../components/Loading';

const Resume: React.FC = () => {
  const [data, setData] = useState<ResumePageData | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const [resumeData, fileUrl] = await Promise.all([
          api.pages.getResumeData(),
          api.pages.getResumeFile()
        ]);
        setData(resumeData);
        setResumeUrl(fileUrl);
      } catch (error) {
        console.error("Failed to load resume data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, []);

  if (loading) return <Loading />;
  if (!data) return null;

  const { profile, experience, projects, skills, tools, certifications, education } = data;

  return (
    <div className="bg-slate-950 min-h-screen py-16">
      <SEO
        title={`${profile.name} - Resume | Digital Marketing Professional`}
        description="View the professional resume of S Venkatesh Prasad. Detailed experience in SEO, Google Ads, and structured problem-solving."
        canonicalUrl="/resume"
        imageUrl={profile.imageUrl}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Resume</h1>
          {resumeUrl ? (
            <a
              href={`${resumeUrl}?dl=${profile.name}_Resume.pdf`}
              className="flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={18} className="mr-2" />
              Download PDF
            </a>
          ) : (
            <button
              onClick={() => window.print()}
              className="flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
            >
              <Download size={18} className="mr-2" />
              Print / Save as PDF
            </button>
          )}
        </div>

        {/* Paper Layout (Dark Mode Version) */}
        <div className="bg-slate-900 p-8 md:p-12 shadow-2xl shadow-black/30 rounded-xl border border-slate-800 text-slate-300">

          {/* Header */}
          <header className="border-b-2 border-slate-800 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">{profile.name}</h2>
              <p className="text-xl text-blue-500 mt-2 font-medium">{profile.role}</p>
            </div>
            <div className="mt-4 md:mt-0 space-y-2 text-sm text-slate-400">
              <div className="flex items-center md:justify-end">
                <Mail size={16} className="mr-2 text-slate-500" /> {profile.email}
              </div>
              <div className="flex items-center md:justify-end">
                <ExternalLink size={16} className="mr-2 text-slate-500" /> {profile.linkedin}
              </div>
              <div className="flex items-center md:justify-end">
                <MapPin size={16} className="mr-2 text-slate-500" /> {profile.location}
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Left Column (Main Content) */}
            <div className="md:col-span-2 space-y-8">

              <section>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                  Professional Summary
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {profile.summary}
                </p>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                  Experience
                </h3>

                <div className="space-y-6">
                  {experience.map((job) => (
                    <div key={job.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-slate-200">{job.role}</h4>
                        <span className="text-sm text-slate-500">{job.period}</span>
                      </div>
                      <p className="text-sm font-medium text-blue-500 mb-2">{job.company}</p>
                      <ul className="list-disc list-outside ml-5 text-slate-400 space-y-1 text-sm">
                        {job.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                  Key Projects
                </h3>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <h4 className="font-bold text-slate-200">{project.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-8">

              <section>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill.name} className="px-3 py-1 bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium rounded">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                  Tools
                </h3>
                <ul className="text-sm text-slate-400 space-y-2">
                  {tools.map((tool, i) => (
                    <li key={i}>{tool}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                  Certifications
                </h3>
                <ul className="space-y-3">
                  {certifications.map(cert => (
                    <li key={cert.name} className="text-sm">
                      <p className="font-bold text-slate-200">{cert.name}</p>
                      <p className="text-slate-500">{cert.issuer}, {cert.date}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
                  Education
                </h3>
                <ul className="space-y-3">
                  {education.map((edu, i) => (
                    <li key={i} className="text-sm">
                      <p className="font-bold text-slate-200">{edu.degree}</p>
                      <p className="text-slate-500">{edu.school}, {edu.year}</p>
                    </li>
                  ))}
                </ul>
              </section>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
