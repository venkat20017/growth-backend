import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Menu, X, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-blue-400 font-semibold" : "text-slate-400 hover:text-blue-400";
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Resume', path: '/resume' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-slate-100 tracking-tight hover:opacity-90 transition-opacity">
              growthwith<span className="text-blue-500">venkat</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors duration-200 text-sm ${isActive(link.path)}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-900/20 hover:-translate-y-0.5"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-slate-100 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium ${location.pathname === link.path ? "bg-slate-800 text-blue-400" : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"}`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-3 py-3 mt-4 bg-blue-600 text-white rounded-md text-base font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-colors"
            >
              Hire Me
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="text-lg font-bold text-slate-100 tracking-tight hover:text-blue-400 transition-colors"
            >
              growthwith<span className="text-blue-500">venkat</span>
            </Link>
            <p className="mt-4 text-slate-400 text-sm max-w-xs mx-auto md:mx-0">
              B2B SaaS Demand Generation Specialist with ex-TCS technical background, specializing in Keyword Research, Technical SEO, Google Ads (PPC), GA4 Analytics, Landing Page Optimization, and Data-Driven Growth Strategies.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  to="/resume"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Resume
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={handleLinkClick}
                  className="text-sm text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Hire Me
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials Column */}
          <div className="flex justify-center md:justify-end items-start space-x-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-400 transition-colors" data-event-category="Footer" data-event-action="Click LinkedIn">
              <span className="sr-only">LinkedIn</span>
              <Linkedin size={24} />
            </a>
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="text-slate-500 hover:text-blue-400 transition-colors"
              data-event-category="Footer"
              data-event-action="Click Email"
            >
              <span className="sr-only">Email</span>
              <Mail size={24} />
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center md:text-left">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} GrowthWithVenkat. All rights reserved. Built with React & Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
};

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  // Detect if we are on a blog post page (where the bottom sticky share bar exists on mobile/tablet)
  // Logic: starts with /blog/ and is not the index /blog
  const isBlogPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      // Positioning logic:
      // Mobile/Tablet on Blog Post: bottom-24 (approx 96px) to clear the share bar
      // Desktop or Non-Blog Post: bottom-8 (default)
      // right-4 on mobile for better edge spacing, right-8 on desktop
      className={`fixed right-4 md:right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-900/40 transition-all duration-300 z-[60] hover:bg-blue-500 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        } ${isBlogPost ? 'bottom-24 lg:bottom-8' : 'bottom-8'
        }`}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};



const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default Layout;