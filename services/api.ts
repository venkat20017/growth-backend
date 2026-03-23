import { CASE_STUDIES, SKILLS, CERTIFICATIONS } from '../constants';
import {
  BlogPost,
  CaseStudy,
  HomePageData,
  AboutPageData,
  BlogPageData,
  CaseStudiesPageData,
  ResumePageData
} from '../types';
import { sanity } from '../lib/sanity';
import { toHTML } from '@portabletext/to-html';
import { createImageUrlBuilder } from '@sanity/image-url';
import { supabase } from '../lib/supabase';

// Image Builder for Sanity
const builder = createImageUrlBuilder(sanity);
function urlFor(source: any) {
  return builder.image(source).auto('format').fit('max').url();
}

// Helper to map Sanity document to BlogPost type
const mapSanityPostToBlogPost = (post: any): BlogPost => {
  return {
    id: post._id,
    slug: post.slug?.current || '',
    title: post.title,
    excerpt: post.excerpt,
    content: post.body ? toHTML(post.body, {
      components: {
        types: {
          image: ({ value }: any) => {
            if (!value?.asset?._ref) {
              return '';
            }
            return `<img src="${urlFor(value)}" alt="${value.alt || ''}" class="w-full h-auto rounded-lg my-8" />${value.caption ? `<p class="text-center text-slate-400 text-sm mt-2">${value.caption}</p>` : ''}`;
          },
          video: ({ value }: any) => {
            if (value?.videoType === 'upload') {
              if (!value?.fileUrl) return '';
              return `
                <div class="relative w-full my-8 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 shadow-lg">
                  <video controls class="w-full h-auto">
                    <source src="${value.fileUrl}" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              `;
            } else {
              if (!value?.url) return '';
              const id = value.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
              if (!id) return '';
              return `
                <div class="relative w-full pb-[56.25%] my-8 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 shadow-lg">
                  <iframe 
                    src="https://www.youtube.com/embed/${id}" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    class="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              `;
            }
          },
          table: ({ value }: any) => {
            if (!value?.rows?.length) return '';
            const [headerRow, ...bodyRows] = value.rows;
            return `
              <div class="overflow-x-auto my-8 custom-scrollbar">
                <table class="min-w-full divide-y divide-slate-700 border border-slate-700 rounded-lg overflow-hidden">
                  <thead class="bg-slate-800 border-b border-slate-700">
                    <tr>
                      ${headerRow.cells.map((cell: string) => `<th class="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">${cell || ''}</th>`).join('')}
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-800 bg-slate-900/30">
                    ${bodyRows.map((row: any) => `
                      <tr class="hover:bg-slate-800/50 transition-colors">
                        ${row.cells.map((cell: string) => `<td class="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">${cell || ''}</td>`).join('')}
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            `;
          }
        }
      }
    }) : '',
    date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : 'Draft',
    category: post.category || 'Uncategorized', // Ensure category field exists in schema
    readTime: post.readTime || '5 min read', // Ensure readTime or calculate it
    imageUrl: post.coverImage ? urlFor(post.coverImage) : '',
    labels: post.labels || [],
    wordCount: post.body ? post.body.map((b: any) => b.children?.map((c: any) => c.text).join(' ')).join(' ').split(/\s+/).length : 0
  };
};

const FAQ_DATA = [
  {
    question: "Are you available for freelance or full-time roles?",
    answer: "Yes, I am open to B2B SaaS Demand Generation roles, projects, and full-time opportunities."
  },
  {
    question: "What services do you specialize in?",
    answer: "I specialize in B2B Demand Generation, Performance Marketing (Google Search Ads, Meta Ads), and Technical SEO."
  },
  {
    question: "Do you have experience with CRM and Automation?",
    answer: "Yes, I implement HubSpot/CRM workflows and use automation tools like Zapier/Make to streamline lead-to-opportunity handover."
  },
  {
    question: "What tools do you use for Demand Gen and Marketing?",
    answer: "Google Ads, HubSpot, GA4, Semrush, Zapier, and WordPress."
  },
  {
    question: "How do you measure success in B2B marketing?",
    answer: "I focus on MQL-to-SQL conversion rates, Pipeline Velocity, Cost Per Lead (CPL), and Return on Ad Spend (ROAS)."
  },
  {
    question: "Can I see your work or case studies?",
    answer: "Yes, you can find detailed case studies on my LocalBitesPondy project and other growth experiments here."
  },
  {
    question: "What is your professional background?",
    answer: "I have a technical background as a former System Engineer at TCS, which allows me to approach marketing with a data-driven and analytical mindset."
  }
];

// Mock Resume Data (Moved from hardcoded JSX to data layer)
const RESUME_DATA: ResumePageData = {
  profile: {
    name: "S VENKATESH PRASAD",
    role: "Demand Generation & Performance Marketer | B2B SaaS Specialist",
    email: "venkateshprasadv158@gmail.com",
    linkedin: "www.linkedin.com/in/s-venkatesh-prasad-57497b399",
    location: "Puducherry, India",
    summary: "B2B Demand Generation Specialist helping SaaS companies build predictable pipeline through outbound sequencing, LinkedIn Ads, and paid search. I work hands-on with Apollo.io, HubSpot, and Google Ads — not just strategy, but real campaigns. Ex-TCS | CS background | 8,500+ prospect lists built."
  },
  experience: [
    {
      id: "1",
      role: "B2B Demand Generation & Performance Specialist (Strategic Projects)",
      company: "Strategic Projects",
      period: "February 2026 – Present",
      description: [
        "Developed and executed multi-channel demand generation strategies to drive high-intent organic and paid traffic.",
        "Managed and optimized Google Search Ads campaigns targeting bottom-of-funnel (BoFu) keywords.",
        "Improved MQL-to-SQL conversion rates by focusing on lead quality and intent.",
        "Built and A/B tested high-converting landing pages with HubSpot/CRM workflows.",
        "Monitored key metrics including Cost Per Lead (CPL), Pipeline Velocity, and ROAS."
      ]
    },
    {
      id: "2",
      role: "Demand Generation & SEO Trainee (WordPress Project)",
      company: "WordPress Project",
      period: "January 2026 – Present",
      description: [
        "Architected a conversion-centric WordPress platform focused on technical SEO and search intent analysis.",
        "Optimized core landing pages and blog content for intent-driven keywords.",
        "Ensured alignment with the buyer journey to increase inbound lead flow."
      ]
    },
    {
      id: "3",
      role: "Assistant System Engineer",
      company: "Tata Consultancy Services (TCS)",
      period: "March 2024 – January 2026",
      description: [
        "Designed and implemented automation workflows to improve operational efficiency.",
        "Collaborated with cross-functional teams in an Agile environment.",
        "Leveraged analytics to identify system bottlenecks and optimize performance metrics."
      ]
    }
  ],
  projects: [
    {
      id: "1",
      title: "LocalBitesPondy – B2B Lead Gen & Google Ads Case Study",
      description: "Built a local SEO platform targeting high-intent keywords. Managed Google Search Ads campaign focused on conversion tracking and MQL-to-SQL transition."
    },
    {
      id: "2",
      title: "GrowthWithVenkat – Personal Branding & Demand Gen Hub",
      description: "Developed a professional portfolio showing performance marketing results. Implemented conversion-focused landing pages and lead capture mechanisms."
    }
  ],
  skills: SKILLS,
  tools: [
    "Google Ads",
    "HubSpot/CRM",
    "GA4 (Marketing Analytics)",
    "Zapier / Make",
    "Semrush / Ahrefs",
    "WordPress",
    "Excel / Data Analysis",
    "ServiceNow"
  ],
  certifications: CERTIFICATIONS,
  education: [
    {
      degree: "Bachelor of Technology (B.Tech), Computer Science",
      school: "Puducherry Technological University",
      year: "2019 – 2023"
    },
    {
      degree: "Higher Secondary – Computer Science",
      school: "Blue Stars Higher Secondary School",
      year: "2018 – 2019"
    }
  ]
};

const CACHE: Record<string, any> = {};

export const api = {

  /**
   * Page-Wise APIs
   */
  pages: {
    getHomeData: async (): Promise<HomePageData> => {
      // Fetch recent blogs from Sanity
      const blogQuery = `*[_type == "post"] | order(publishedAt desc)[0...2]{
        _id,
        title,
        slug,
        excerpt,
        body[]{..., _type == "video" => {..., "fileUrl": file.asset->url}},
        publishedAt,
        coverImage,
        category,
        readTime
      }`;

      let blogs: BlogPost[] = [];
      let studies: CaseStudy[] = [];
      let profileImage = "";

      try {
        const [sanityPosts, sanityStudies, resume] = await Promise.all([
          sanity.fetch(blogQuery),
          api.caseStudies.getCaseStudies(),
          api.pages.getResumeData()
        ]);
        blogs = sanityPosts.filter((p: any) => p.slug?.current).map(mapSanityPostToBlogPost);

        // Use Sanity studies if available, otherwise fallback to CASE_STUDIES
        studies = sanityStudies.length > 0 ? sanityStudies : CASE_STUDIES;

        // Extract profile image from resume if available
        profileImage = resume.profile.imageUrl;
      } catch (e) {
        console.error("Failed to fetch home data:", e);
        // Fallback for critical errors
        studies = CASE_STUDIES;
      }

      const data: HomePageData = {
        hero: {
          title: "B2B SaaS Demand Generation Specialist",
          subtitle: "B2B Demand Generation Specialist helping SaaS companies build predictable pipeline through outbound sequencing, LinkedIn Ads, and paid search.",
          ctaPrimary: "See My Projects →",
          ctaSecondary: "Download Resume ↓"
        },
        featuredBlogs: blogs,
        featuredCaseStudies: studies.slice(0, 2),
        faq: FAQ_DATA,
        profileImage: profileImage || "/venkat-stylized.png" // Fallback
      };

      return data;
    },

    getAboutData: async (): Promise<AboutPageData> => {
      const query = `*[_type == "about"][0]{
        title,
        profileImage,
        bio,
        skillGroups,
        certifications
      }`;

      try {
        const sanityAbout = await sanity.fetch(query);
        if (sanityAbout && sanityAbout.bio) {
          return mapSanityToAboutData(sanityAbout);
        }
      } catch (e) {
        console.error("Failed to fetch about data from Sanity:", e);
      }

      // Fallback to static data
      return {
        profile: {
          name: "S Venkatesh Prasad",
          bio: [
            "Hello! I'm Venkatesh, a B2B Demand Generation Specialist helping SaaS companies build predictable pipeline through outbound sequencing, LinkedIn Ads, and paid search.",
            "I work hands-on with Apollo.io, HubSpot, and Google Ads — not just strategy, but real campaigns. With a technical background from TCS (8,500+ prospect lists built), I bridge the gap between data-driven systems and high-converting marketing funnels."
          ],
          imageUrl: "/venkat.jpg"
        },
        skillGroups: [
          { title: "Digital Marketing", skills: ["SEO", "Technical SEO", "On-Page SEO", "Keyword Research", "Search Intent Analysis", "Content Optimization", "Google Ads", "PPC Campaign Management", "Landing Page Optimization", "Conversion Tracking", "GA4", "Marketing Analytics"] },
          { title: "Technical & Tools", skills: ["WordPress", "Google Analytics 4 (GA4)", "Google Ads", "Agile Methodology", "Automation Workflows"] },
          { title: "Core Competencies", skills: ["Data-Driven Decision Making", "Performance Optimization", "Cross-Functional Collaboration", "Analytical Thinking"] }
        ],
        certifications: CERTIFICATIONS.map(c => ({ ...c }))
      };
    },

    getBlogData: async (): Promise<BlogPageData> => {
      const query = `*[_type == "post"] | order(publishedAt desc){
        _id,
        title,
        slug,
        excerpt,
        body[]{..., _type == "video" => {..., "fileUrl": file.asset->url}},
        publishedAt,
        coverImage,
        category,
        readTime,
        labels,
        metaTitle,
        metaDescription
      }`;

      let posts: BlogPost[] = [];
      let categories: string[] = ['All'];

      try {
        const sanityPosts = await sanity.fetch(query);
        posts = sanityPosts.filter((p: any) => p.slug?.current).map(mapSanityPostToBlogPost);
        const uniqueCategories = new Set(posts.filter((post) => post.category && post.category !== 'Uncategorized').map((post) => post.category));
        categories = ['All', ...Array.from(uniqueCategories)];
      } catch (e) {
        console.error("Failed to fetch blogs:", e);
      }

      const data: BlogPageData = {
        title: "B2B Demand Gen & Outbound Marketing Insights",
        subtitle: "Real campaign breakdowns, outbound playbooks, and demand gen strategies for B2B SaaS teams.",
        posts: posts,
        categories: categories
      };
      return data;
    },

    getCaseStudiesData: async (): Promise<CaseStudiesPageData> => {
      // Fetch dynamic case studies
      const studies = await api.caseStudies.getCaseStudies();

      const data: CaseStudiesPageData = {
        title: "Real Results. Proven Strategies.",
        subtitle: "I don't just talk about theory. Here are the experiments and campaigns I've run, complete with data, mistakes, and final results.",
        studies: studies.length > 0 ? studies : CASE_STUDIES // Use Sanity data or fallback
      };
      return data;
    },

    getResumeData: async (): Promise<ResumePageData> => {
      const query = `*[_type == "resume"][0]{
        name,
        role,
        email,
        linkedin,
        location,
        summary,
        profileImage,
        experience,
        projects,
        skills,
        tools,
        education,
        certifications
      }`;

      try {
        const sanityResume = await sanity.fetch(query);
        if (sanityResume && sanityResume.name) {
          return mapSanityToResumeData(sanityResume);
        }
      } catch (e) {
        console.error("Failed to fetch resume data from Sanity:", e);
      }

      return RESUME_DATA; // Fallback to static data
    },

    getResumeFile: async (): Promise<string | null> => {
      const query = `*[_type == "resume"][0].resumeFile.asset->url`;
      try {
        const fileUrl = await sanity.fetch(query);
        return fileUrl;
      } catch (e) {
        console.error("Failed to fetch resume file:", e);
        return null; // Fallback to null (will use print)
      }
    }
  },

  /**
   * Entity-Specific APIs
   */
  blog: {
    getBySlug: async (slug: string): Promise<BlogPost | undefined> => {
      const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        excerpt,
        body[]{..., _type == "video" => {..., "fileUrl": file.asset->url}},
        publishedAt,
        coverImage,
        category,
        readTime,
        labels,
        metaTitle,
        metaDescription
      }`;

      try {
        const post = await sanity.fetch(query, { slug });
        if (post) {
          return mapSanityPostToBlogPost(post);
        }
      } catch (e) {
        console.error(`Failed to fetch blog with slug ${slug}:`, e);
      }
      return undefined;
    }
  },

  caseStudies: {
    getCaseStudies: async (): Promise<CaseStudy[]> => {
      // Fetch both new demandGenExperiment and legacy caseStudy types
      const query = `*[_type in ["demandGenExperiment", "caseStudy"]] | order(publishedAt desc){
        _id,
        _type,
        title,
        slug,
        summary,
        growthGoal,
        hypothesis,
        funnelArchitecture,
        metrics,
        results,
        strategy,
        problem,
        tools,
        funnelPerformance,
        chartData,
        growthInsights,
        learnings,
        heroImage,
        coverImage,
        content,
        documents[]{
          title,
          fileType,
          "url": file.asset->url
        },
        publishedAt
      }`;

      try {
        const sanityStudies = await sanity.fetch(query);
        return sanityStudies.filter((s: any) => s.slug?.current).map(mapSanityToCaseStudy);
      } catch (e) {
        console.error("Failed to fetch case studies, falling back to static data:", e);
        return CASE_STUDIES; // Fallback
      }
    },

    getBySlug: async (slug: string): Promise<CaseStudy | undefined> => {
      const query = `*[_type in ["demandGenExperiment", "caseStudy"] && slug.current == $slug][0]{
        _id,
        _type,
        title,
        slug,
        summary,
        growthGoal,
        hypothesis,
        funnelArchitecture,
        metrics,
        results,
        strategy,
        problem,
        tools,
        funnelPerformance,
        chartData,
        growthInsights,
        learnings,
        heroImage,
        coverImage,
        content,
        documents[]{
          title,
          fileType,
          "url": file.asset->url
        },
        publishedAt
      }`;

      try {
        const study = await sanity.fetch(query, { slug });
        if (study) return mapSanityToCaseStudy(study);
        return CASE_STUDIES.find(c => c.slug === slug); // Fallback
      } catch (e) {
        console.error("Failed to fetch case study:", e);
        return CASE_STUDIES.find(c => c.slug === slug);
      }
    }
  },

  contact: {
    submitForm: async (formData: { name: string; email: string; message: string }) => {
      // Form submission is now handled by HubSpot embed directly.
      // This method is kept for type compatibility but does nothing.
      console.log("Contact form submitted (handled by HubSpot):", formData);
      return { success: true, message: "Handled by HubSpot" };
    }
  },

  comments: {
    getComments: async (slug: string): Promise<any[]> => {
      if (!supabase) {
        console.warn('Supabase not initialized, skipping comments fetch.');
        return [];
      }
      try {
        const { data, error } = await (supabase as any)
          .from('comments')
          .select('*')
          .eq('slug', slug)
          .eq('is_approved', true)
          .order('created_at', { ascending: true });

        if (error) throw error;
        
        return data || [];
      } catch (e) {
        console.error("Failed to fetch comments:", e);
        return [];
      }
    },

    submitComment: async (data: { slug: string; name: string; email: string; comment: string }) => {
      if (!supabase) {
        return { success: false, message: 'Supabase integration is disabled.' };
      }
      try {
        const { error } = await (supabase as any)
          .from('comments')
          .insert([
            {
              slug: data.slug,
              name: data.name,
              email: data.email,
              comment: data.comment,
              is_approved: false // Set to false by default for moderation
            }
          ]);

        if (error) throw error;
        return { success: true };
      } catch (e) {
        console.error("Failed to submit comment:", e);
        return { success: false, message: 'Failed to submit comment.' };
      }
    }
  },

  getFAQData: async () => {
    const query = `*[_type == "faq"] | order(order asc){
      question,
      answer
    }`;
    try {
      const faqs = await sanity.fetch(query);
      return faqs.length > 0 ? faqs : FAQ_DATA;
    } catch (e) {
      console.error("Failed to fetch FAQs:", e);
      return FAQ_DATA;
    }
  },

  admin: {
    getStats: async () => {
      try {
        // Fetch raw data
        const [posts, studies] = await Promise.all([
          sanity.fetch(`count(*[_type == "post"])`),
          sanity.fetch(`count(*[_type in ["demandGenExperiment", "caseStudy"]])`)
        ]);

        return {
          totalBlogs: posts || 0,
          totalStudies: studies || 0,
        };
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
        return { totalBlogs: 0, totalStudies: 0 };
      }
    },

    getMessages: async () => {
      // Messages are now managed in HubSpot CRM Conversations Inbox.
      return {
        messages: [],
        total: 0
      };
    }
  }
};

const mapSanityToAboutData = (sanityAbout: any): AboutPageData => {
  return {
    profile: {
      name: "S Venkatesh Prasad", // Usually stays the same
      bio: sanityAbout.bio || [],
      imageUrl: sanityAbout.profileImage ? urlFor(sanityAbout.profileImage) : "/venkat.jpg"
    },
    skillGroups: sanityAbout.skillGroups?.map((group: any) => ({
      title: group.title,
      skills: group.skills || []
    })) || [],
    certifications: sanityAbout.certifications?.map((cert: any) => ({
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      imageUrl: cert.certificateImage ? urlFor(cert.certificateImage) : undefined
    })) || []
  };
};

const mapSanityToCaseStudy = (study: any): CaseStudy => {
  // Normalize fields between legacy caseStudy and new demandGenExperiment types
  const isLegacy = study._type === 'caseStudy';

  // Render Portable Text content to HTML (same as blog posts)
  const contentHtml = study.content ? toHTML(study.content, {
    components: {
      types: {
        image: ({ value }: any) => {
          if (!value?.asset?._ref) return '';
          return `<figure class="my-8">
  <img src="${urlFor(value)}" alt="${value.alt || ''}" class="w-full h-auto rounded-xl border border-slate-800 shadow-lg" />
  ${value.caption ? `<figcaption class="text-center text-slate-400 text-sm mt-3">${value.caption}</figcaption>` : ''}
</figure>`;
        }
      }
    }
  }) : '';

  return {
    id: study._id,
    title: study.title,
    slug: study.slug?.current || '',
    summary: study.summary,
    growthGoal: study.growthGoal || "Demand Generation Case Study",
    hypothesis: study.hypothesis || "",
    problem: study.problem || study.strategy?.substring(0, 100) + '...',
    strategy: study.strategy,
    funnelArchitecture: study.funnelArchitecture || [],
    tools: study.tools || [],
    metrics: (isLegacy ? study.results : study.metrics)?.map((m: any) => ({
      metricName: m.metricName || m.metric,
      metricValue: m.metricValue || m.value,
      description: m.description
    })) || [],
    funnelPerformance: (isLegacy ? study.chartData : study.funnelPerformance)?.map((ch: any) => ({
      label: ch.label || ch.name,
      value: ch.value
    })) || [],
    growthInsights: study.growthInsights || study.learnings || "",
    nextExperiments: study.nextExperiments || [],
    heroImage: study.heroImage || study.coverImage ? urlFor(study.heroImage || study.coverImage) : '',
    content: contentHtml || '',
    documents: (study.documents || []).filter((d: any) => d.url).map((d: any) => ({
      title: d.title || 'Download',
      url: d.url,
      fileType: d.fileType || 'Other'
    }))
  };
};

const mapSanityToResumeData = (data: any): ResumePageData => {
  return {
    profile: {
      name: data.name || "",
      role: data.role || "",
      email: data.email || "",
      linkedin: data.linkedin || "",
      location: data.location || "",
      summary: data.summary || "",
      imageUrl: data.profileImage ? urlFor(data.profileImage) : "/venkat.jpg"
    },
    experience: data.experience?.map((exp: any, i: number) => ({
      id: exp._key || String(i),
      role: exp.role,
      company: exp.company,
      period: exp.period,
      description: exp.description || []
    })) || [],
    projects: data.projects?.map((proj: any, i: number) => ({
      id: proj._key || String(i),
      title: proj.title,
      description: proj.description
    })) || [],
    skills: data.skills || [],
    tools: data.tools || [],
    certifications: data.certifications || [],
    education: data.education || []
  };
};