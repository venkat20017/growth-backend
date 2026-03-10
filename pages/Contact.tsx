import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, MapPin } from 'lucide-react';
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
            <div className="hubspot-form-container">
              <script src="https://js-na2.hsforms.net/forms/embed/244350168.js" defer></script>
              <div
                className="hs-form-frame"
                data-region="na2"
                data-form-id="c4ae914a-4059-4c9a-8904-d69d5181119c"
                data-portal-id="244350168"
              ></div>
            </div>
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