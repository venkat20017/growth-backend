import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

interface FAQSectionProps {
    faqData: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqData }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Generate JSON-LD Schema
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
            }
        }))
    };

    return (
        <section className="py-16 bg-slate-950 border-t border-slate-800">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                        <HelpCircle className="text-blue-500" /> Frequently Asked Questions
                    </h2>
                    <p className="mt-2 text-slate-400">Common questions about my work and experience.</p>
                </div>

                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-slate-900 rounded-xl border transition-all duration-300 ${openIndex === index ? 'border-blue-500/50 shadow-lg shadow-blue-900/10' : 'border-slate-800 hover:border-slate-700'
                                }`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                                aria-expanded={openIndex === index}
                            >
                                <span className={`font-semibold text-lg ${openIndex === index ? 'text-blue-400' : 'text-slate-200'}`}>
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-blue-500 flex-shrink-0 ml-4" size={20} />
                                ) : (
                                    <ChevronDown className="text-slate-500 flex-shrink-0 ml-4" size={20} />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-5 pt-0 text-slate-400 leading-relaxed border-t border-slate-800/50 mt-2">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Inject JSON-LD Schema */}
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </div>
        </section>
    );
};

export default FAQSection;
