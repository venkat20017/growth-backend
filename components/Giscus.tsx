import React, { useEffect, useRef } from 'react';

interface GiscusProps {
    repo?: string;
    repoId?: string;
    category?: string;
    categoryId?: string;
    term?: string;
    theme?: string;
    lang?: string;
}

const Giscus: React.FC<GiscusProps> = ({
    repo = "venkat20017/growth-backend",
    repoId = "[ENTER REPO ID HERE]", // Placeholder
    category = "[ENTER CATEGORY NAME HERE]", // Placeholder
    categoryId = "[ENTER CATEGORY ID HERE]", // Placeholder
    term = "pathname",
    theme = "preferred_color_scheme",
    lang = "en",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Remove any existing giscus scripts
        const existingScript = document.querySelector('script[src="https://giscus.app/client.js"]');
        if (existingScript) {
            existingScript.remove();
        }

        // Also remove the iframe if it exists
        const existingIframe = document.querySelector('iframe.giscus-frame');
        if (existingIframe) {
            existingIframe.remove();
        }

        const script = document.createElement('script');
        script.src = "https://giscus.app/client.js";
        script.setAttribute('data-repo', repo);
        script.setAttribute('data-repo-id', repoId);
        script.setAttribute('data-category', category);
        script.setAttribute('data-category-id', categoryId);
        script.setAttribute('data-mapping', term);
        script.setAttribute('data-strict', "0");
        script.setAttribute('data-reactions-enabled', "1");
        script.setAttribute('data-emit-metadata', "0");
        script.setAttribute('data-input-position', "bottom");
        script.setAttribute('data-theme', theme);
        script.setAttribute('data-lang', lang);
        script.setAttribute('data-loading', "lazy");
        script.crossOrigin = "anonymous";
        script.async = true;

        containerRef.current.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [repo, repoId, category, categoryId, term, theme, lang]);

    return (
        <div className="giscus-container mt-12 pt-12 border-t border-slate-800">
            <h3 className="text-2xl font-bold text-white mb-8">Comments</h3>
            <div ref={containerRef} id="giscus-comments" />
        </div>
    );
};

export default Giscus;
