import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { ArrowLeft, MessageSquare, Calendar, User, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.admin.getMessages();
                setMessages(response.messages);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="space-y-6">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">Messages</h1>
                    <p className="text-slate-400">View and manage contact form submissions.</p>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-400">Loading messages...</div>
            ) : (
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                    {messages.length === 0 ? (
                        <div className="p-12 text-center flex flex-col items-center text-slate-500">
                            <MessageSquare size={48} className="mb-4 opacity-20" />
                            <p>No messages found.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-800">
                            {messages.map((msg) => (
                                <div key={msg.id} className="p-6 hover:bg-slate-800/30 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-lg">{msg.name}</h3>
                                                <div className="flex items-center text-slate-400 text-sm mt-1">
                                                    <Mail size={14} className="mr-2" />
                                                    {msg.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-slate-500 text-sm bg-slate-800/50 px-3 py-1 rounded-full w-fit">
                                            <Calendar size={14} className="mr-2" />
                                            {new Date(msg.created_at).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>
                                    <div className="pl-0 md:pl-14">
                                        <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Messages;
