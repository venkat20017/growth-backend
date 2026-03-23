import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Linkedin, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { api } from '../services/api';
import FAQSection from '../components/FAQSection';
import { FAQItem } from '../types';

const Contact: React.FC = () => {
  const [contactInfo, setContactInfo] = useState({
    email: 'Loading...',
    linkedin: 'Loading...',
    location: 'Open to onsite B2B Demand Gen roles — happy to relocate for the right opportunity.'
  });
  const [faqData, setFaqData] = useState<FAQItem[]>([]);

  useEffect(() => {
    const fetchContactInfo = async () => {
      const data = await api.pages.getResumeData();
      if (data && data.profile) {
        setContactInfo({
          email: data.profile.email || 'hello@growthwithvenkat.com',
          linkedin: data.profile.linkedin || 'linkedin.com/in/venkat',
          location: data.profile.location || 'Open to onsite B2B Demand Gen roles — happy to relocate for the right opportunity.'
        });
      }

      const faqs = await api.getFAQData();
      setFaqData(faqs);
    };
    fetchContactInfo();
  }, []);

  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      if (
        !import.meta.env.VITE_EMAILJS_SERVICE_ID ||
        !import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
        !import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      ) {
        throw new Error('EmailJS credentials are not configured.');
      }

      const formData = new FormData(formRef.current);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: name,
          message: message,
          email: email,
          to_email: email
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
      formRef.current.reset();
    } catch (error: any) {
      console.error('EmailJS error:', error);
      setSubmitStatus({ 
        type: 'error', 
        message: error?.text || error?.message || 'Failed to send message. Please try again or contact me directly via email.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen py-16">
      <SEO
        title="Contact S Venkatesh Prasad | B2B Demand Gen Specialist"
        description="Get in touch with S Venkatesh Prasad for B2B Demand Gen strategies, outbound playbooks, or paid media campaigns. Open to onsite roles and relocation."
        canonicalUrl="/contact"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white">Get In Touch</h1>
          <p className="mt-4 text-xl text-slate-400">
            Open to onsite B2B Demand Gen roles — happy to relocate for the right opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-slate-900 rounded-2xl shadow-xl shadow-black/20 border border-slate-800 overflow-hidden">
          {/* Contact Info */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-12 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="mr-4" size={24} />
                  <span className="text-lg">{contactInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <Linkedin className="mr-4" size={24} />
                  <a href={`https://${contactInfo.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-lg hover:underline">
                    {contactInfo.linkedin.replace(/^https?:\/\//, '').replace(/www\./, '')}
                  </a>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-4" size={24} />
                  <span className="text-lg">Open to onsite B2B Demand Gen roles — happy to relocate for the right opportunity.</span>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-blue-200 text-sm">
                I typically respond within 24 hours. Connect with me on LinkedIn for faster response times.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-12">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {submitStatus.type === 'success' && (
                <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg flex items-start">
                  <CheckCircle className="mr-3 flex-shrink-0 mt-0.5" size={20} />
                  <span>{submitStatus.message}</span>
                </div>
              )}
              
              {submitStatus.type === 'error' && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg flex items-start">
                  <AlertCircle className="mr-3 flex-shrink-0 mt-0.5" size={20} />
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name" // Important for EmailJS to match {{name}} in template
                    required
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email" // Match {{email}}
                    required
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message" // Match {{message}}
                  required
                  rows={6}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                  placeholder="How can I help you?"
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-blue-900/20 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-blue-900/40 hover:-translate-y-0.5'}`}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                {!isSubmitting && <Send size={20} />}
              </button>
            </form>
            <p className="text-slate-500 text-sm mt-6">
              This form is secure and your information is handled according to our privacy policy.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      {faqData.length > 0 && <FAQSection faqData={faqData} />}
    </div>
  );
};

export default Contact;