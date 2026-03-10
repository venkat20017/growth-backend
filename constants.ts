import { CaseStudy, Certification, Skill } from './types';

export const SKILLS: Skill[] = [
  { name: 'Demand Generation', category: 'Marketing', level: 95 },
  { name: 'Performance Marketing', category: 'PPC', level: 92 },
  { name: 'SEO (Search Engine Optimization)', category: 'SEO', level: 95 },
  { name: 'Keyword Research', category: 'SEO', level: 95 },
  { name: 'Google Search Ads', category: 'PPC', level: 90 },
  { name: 'Marketing Automation (Zapier/Make)', category: 'Tools', level: 85 },
  { name: 'GA4 (Marketing Analytics)', category: 'Analytics', level: 92 },
  { name: 'HubSpot/CRM', category: 'Tools', level: 88 },
  { name: 'Technical SEO', category: 'SEO', level: 90 },
  { name: 'Lead Nurturing & CRM Workflows', category: 'Marketing', level: 85 },
];

export const CERTIFICATIONS: Certification[] = [
  { name: 'DIGITAL MARKETING FUNDAMENTALS', issuer: 'IIDE - The Digital School', date: '2026' },
  { name: 'Inbound Marketing', issuer: 'HubSpot Academy', date: '2024' },
  { name: 'Digital Marketing Certification', issuer: 'IIDM', date: '2024' },
  { name: 'SEO Fundamentals', issuer: 'Semrush', date: '2024' },
  { name: 'Google Ads Search Certification', issuer: 'Google', date: '2024' },
];



export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    slug: 'ecommerce-organic-growth',
    title: '150% Organic Traffic Growth for Niche E-commerce',
    summary: 'Technical SEO and content clustering strategy that doubled revenue in 6 months.',
    growthGoal: 'Double the monthly organic revenue by solving crawl budget issues and establishing topical authority.',
    hypothesis: 'If we implement a "Topic Cluster" architecture for core product categories, then crawl efficiency will increase and organic rankings will improve by 30% within 3 months.',
    problem: 'The client was stuck at 2k monthly visitors with a stagnant blog and technical debt.',
    strategy: 'Implemented a "Topic Cluster" strategy. We identified core pillars, fixed 404s and canonical issues, and interlinked related content rigorously.',
    funnelArchitecture: [
      { stepName: 'Technical Audit', description: 'Identified crawl budget leaks and 404 errors.' },
      { stepName: 'Keyword Mapping', description: 'Mapped high-intent keywords to new topic clusters.' },
      { stepName: 'Content Clustering', description: 'Interlinked blog posts to pillar pages for maximum authority.' },
      { stepName: 'Lead Capture', description: 'Optimized category pages with intent-driven CTAs.' }
    ],
    tools: ['Screaming Frog', 'Ahrefs', 'Google Search Console'],
    metrics: [
      { metricName: 'Organic Traffic', metricValue: '+150%', description: 'Year over year growth' },
      { metricName: 'Revenue', metricValue: '+85%', description: 'Directly attributed to organic search' },
      { metricName: 'Keywords', metricValue: '350+', description: 'New keywords ranking in Top 10' },
      { metricName: 'Duration', metricValue: '180 Days', description: 'Experiment timeframe' }
    ],
    funnelPerformance: [
      { label: 'Month 1', value: 2000 },
      { label: 'Month 2', value: 2200 },
      { label: 'Month 3', value: 2800 },
      { label: 'Month 4', value: 3500 },
      { label: 'Month 5', value: 4200 },
      { label: 'Month 6', value: 5000 },
    ],
    growthInsights: 'The experiment successfully validated that technical SEO is the prerequisite for content growth. Revenue growth lagged behind traffic by 4 weeks but scaled rapidly once rankings stabilized.',
    nextExperiments: [
      'A/B Test Landing Page',
      'Optimize CRM Automation',
      'Scale High-Intent Keywords'
    ],
    heroImage: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80'
  }
];