import React, { useState } from 'react';
import { BarChart3, ExternalLink } from 'lucide-react';

const Analytics: React.FC = () => {
    const [embedUrl, setEmbedUrl] = useState(localStorage.getItem('looker_embed_url') || '');
    const [isEditing, setIsEditing] = useState(!embedUrl);

    const [error, setError] = useState('');

    const handleSave = () => {
        if (!embedUrl.includes('/embed/')) {
            setError('Please use the "Embed URL" (File > Embed report), not the "Share" link.');
            return;
        }
        setError('');
        localStorage.setItem('looker_embed_url', embedUrl);
        setIsEditing(false);
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Traffic Analytics</h1>
                    <p className="text-slate-400">View your website performance via Google Analytics & Looker Studio.</p>
                </div>

                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 text-sm bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                >
                    {isEditing ? 'Cancel Configuration' : 'Configure Report'}
                </button>
            </div>

            {isEditing ? (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 max-w-2xl mx-auto">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-slate-800 rounded-full">
                            <BarChart3 className="w-8 h-8 text-blue-400" />
                        </div>
                    </div>

                    <h2 className="text-xl font-bold text-white text-center mb-4">Connect Looker Studio</h2>
                    <p className="text-slate-400 text-center mb-8">
                        To view analytics here, create a report in Looker Studio using your GA4 data, then enable embedding and paste the Embed URL below.
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Looker Studio Embed URL
                            </label>
                            <input
                                type="text"
                                value={embedUrl}
                                onChange={(e) => {
                                    setEmbedUrl(e.target.value);
                                    setError('');
                                }}
                                placeholder="https://lookerstudio.google.com/embed/reporting/..."
                                className={`w-full px-4 py-3 bg-slate-950 border rounded-lg text-white focus:ring-2 outline-none ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-700 focus:ring-blue-500'
                                    }`}
                            />
                            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={!embedUrl}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save Configuration
                        </button>

                        <div className="pt-4 text-center">
                            <a
                                href="https://lookerstudio.google.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-blue-400 hover:text-blue-300 inline-flex items-center"
                            >
                                Open Looker Studio <ExternalLink size={14} className="ml-1" />
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative">
                    <iframe
                        src={embedUrl}
                        frameBorder="0"
                        className="absolute inset-0 w-full h-full"
                        style={{ border: 0 }}
                        allowFullScreen
                        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default Analytics;
