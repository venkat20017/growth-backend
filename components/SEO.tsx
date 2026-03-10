import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    canonicalUrl: string;
    type?: 'website' | 'article';
    imageUrl?: string;
}

const SITE_URL = 'https://growthwithvenkat.com';

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonicalUrl,
    type = 'website',
    imageUrl
}) => {
    // Ensure canonicalUrl starts with a slash if not absolute, or just handle full URLs
    const fullCanonicalUrl = canonicalUrl.startsWith('http')
        ? canonicalUrl
        : `${SITE_URL}${canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`}`;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={fullCanonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullCanonicalUrl} />
            {imageUrl && <meta property="og:image" content={imageUrl} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {imageUrl && <meta name="twitter:image" content={imageUrl} />}
        </Helmet>
    );
};

export default SEO;
