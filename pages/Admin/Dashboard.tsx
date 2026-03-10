import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Users, FileText, Send, TrendingUp } from 'lucide-react';

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, change }: any) => (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden group hover:border-slate-700 transition-all">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Icon size={64} />
        </div>
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-slate-800 rounded-lg text-blue-400">
                <Icon size={24} />
            </div>
            {change && (
                <span className="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-400 rounded-full">
                    {change}
                </span>
            )}
        </div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
    </div>
);

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        totalBlogs: 0,
        totalStudies: 0,
        totalMessages: 0,
        recentMessages: [] as any[]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch real data
                const stats = await api.admin.getStats();
                const messages = await api.admin.getMessages();

                setStats({
                    totalBlogs: stats.totalBlogs,
                    totalStudies: stats.totalStudies,
                    totalMessages: messages.total,
                    recentMessages: messages.messages
                });
            } catch (error) {
                console.error("Failed to load admin stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const handleExport = async () => {
        try {
            const { messages } = await api.admin.getMessages();
            if (!messages || messages.length === 0) {
                alert("No data to export");
                return;
            }

            // Define CVS headers
            const headers = ['ID', 'Name', 'Email', 'Message', 'Date'];

            // Map data to CSV rows
            const rows = messages.map((msg: any) => [
                msg.id,
                `"${msg.name.replace(/"/g, '""')}"`, // Escape quotes
                `"${msg.email.replace(/"/g, '""')}"`,
                `"${msg.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`, // Escape quotes and newlines
                new Date(msg.created_at).toLocaleDateString()
            ]);

            // Combine headers and rows
            const csvContent = [headers.join(','), ...rows.map((r: any[]) => r.join(','))].join('\n');

            // Create download link
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', `contact_data_${new Date().toISOString().split('T')[0]}.csv`);
            a.style.visibility = 'hidden';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Export failed:", error);
            alert("Failed to export data");
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-slate-400">Loading metrics...</div>;
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
                <p className="text-slate-400">Welcome back, get a quick look at your growth metrics.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Blogs"
                    value={stats.totalBlogs}
                    icon={FileText}
                    change="+2 this week"
                />
                <StatsCard
                    title="Case Studies"
                    value={stats.totalStudies}
                    icon={TrendingUp}
                />
                <StatsCard
                    title="Messages"
                    value={stats.totalMessages}
                    icon={Send}
                    change="+5 new"
                />
                <StatsCard
                    title="Subscribers"
                    value={24}
                    icon={Users}
                    change="+12% mo"
                />
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Messages Feed */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-white">Recent Messages</h2>
                        <Link to="/admin/messages" className="text-sm text-blue-400 hover:text-blue-300">View All</Link>
                    </div>
                    <div className="divide-y divide-slate-800">
                        {stats.recentMessages.length === 0 ? (
                            <div className="p-6 text-center text-slate-500 py-12">
                                No recent messages found.
                            </div>
                        ) : (
                            stats.recentMessages.slice(0, 5).map((msg: any) => (
                                <div key={msg.id} className="p-4 hover:bg-slate-800/50 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-medium text-white">{msg.name}</h3>
                                        <span className="text-xs text-slate-500">
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-400 line-clamp-2">{msg.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <a
                            href="http://localhost:3333"
                            target="_blank"
                            rel="noreferrer"
                            className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors text-center"
                        >
                            Open Sanity Studio
                        </a>
                        <button
                            onClick={handleExport}
                            className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                        >
                            Export Contact Data (CSV)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
