import React, { useState, useEffect } from 'react';
import { User, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

interface CommentsProps {
  slug: string;
}

interface Comment {
  id: string | number;
  name: string;
  comment: string;
  created_at: string;
}

const Comments: React.FC<CommentsProps> = ({ slug }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const data = await api.comments.getComments(slug);
      setComments(data || []);
    } catch (error) {
      console.error('Failed to load comments', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const result = await api.comments.submitComment({
        slug,
        name: formData.name,
        email: formData.email,
        comment: formData.comment
      });

      if (result.success) {
        setStatus({ type: 'success', message: 'Comment submitted successfully! It will appear after moderation.' });
        setFormData({ name: '', email: '', comment: '' });
      } else {
        setStatus({ type: 'error', message: result.message || 'Failed to submit comment. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting comment', error);
      setStatus({ type: 'error', message: 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="mt-16 bg-slate-900 rounded-2xl p-8 border border-slate-800">
      <h3 className="text-2xl font-bold text-white mb-8 border-b border-slate-800 pb-4">
        Comments {comments.length > 0 && <span className="text-slate-500 text-lg">({comments.length})</span>}
      </h3>

      {/* Discussion List */}
      <div className="space-y-6 mb-12">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={comment.id || index} className="flex gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                  <User size={18} className="text-slate-400" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-slate-200">{comment.name}</h4>
                  <span className="text-[10px] text-slate-500 flex items-center gap-1">
                    <Clock size={10} />
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <p className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                  {comment.comment}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-slate-950/30 rounded-xl border border-dashed border-slate-800">
            <p className="text-slate-500 italic">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>

      {/* Comment Form */}
      <div>
        <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          Leave a Reply
        </h4>

        {status.type === 'success' && (
          <div className="mb-6 bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg flex items-start text-sm">
            <CheckCircle className="mr-3 flex-shrink-0 mt-0.5" size={16} />
            <span>{status.message}</span>
          </div>
        )}
        
        {status.type === 'error' && (
          <div className="mb-6 bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg flex items-start text-sm">
            <AlertCircle className="mr-3 flex-shrink-0 mt-0.5" size={16} />
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                placeholder="John Doe"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email * <span className="text-slate-600 font-normal normal-case tracking-normal">(will not be published)</span></label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
                placeholder="john@example.com"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message *</label>
            <textarea
              id="comment"
              name="comment"
              required
              rows={4}
              value={formData.comment}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-y text-sm"
              placeholder="What are your thoughts?"
              disabled={isSubmitting}
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5 shadow-lg shadow-blue-900/20'}`}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
            {!isSubmitting && <Send size={14} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
