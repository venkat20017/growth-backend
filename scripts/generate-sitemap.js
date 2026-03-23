
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
    projectId: process.env.VITE_SANITY_PROJECT_ID || 'lex57gkf',
    dataset: 'production',
    apiVersion: '2023-10-01',
    useCdn: true,
});

const SITE_URL = 'https://growthwithvenkat.com';

const STATIC_ROUTES = [
    '/',
    '/about',
    '/blog',
    '/case-studies',
    '/contact',
    '/resume',
];

async function generateSitemap() {
    console.log('Generating sitemap...');

    try {
        // Fetch dynamic routes
        const [posts, caseStudies] = await Promise.all([
            client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`),
            client.fetch(`*[_type in ["caseStudy", "demandGenExperiment"] && defined(slug.current)]{ "slug": slug.current, _updatedAt }`),
        ]);

        const dynamicRoutes = [
            ...posts.map((post) => ({
                url: `/blog/${post.slug}`,
                lastmod: post._updatedAt,
            })),
            ...caseStudies.map((study) => ({
                url: `/case-studies/${study.slug}`,
                lastmod: study._updatedAt,
            })),
        ];

        const allRoutes = [
            ...STATIC_ROUTES.map((route) => ({
                url: route,
                lastmod: new Date().toISOString(),
            })),
            ...dynamicRoutes,
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
                .map((route) => {
                    return `
  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route.url === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
                })
                .join('')}
</urlset>`;

        const publicDir = path.resolve(__dirname, '../public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
        console.log('Sitemap generated successfully!');
    } catch (error) {
        console.error('Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
