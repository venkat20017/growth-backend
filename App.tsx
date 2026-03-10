import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home'));
const BlogList = React.lazy(() => import('./pages/Blog').then(module => ({ default: module.BlogList })));
const BlogPost = React.lazy(() => import('./pages/Blog').then(module => ({ default: module.BlogPost })));
const CaseStudyList = React.lazy(() => import('./pages/CaseStudies').then(module => ({ default: module.CaseStudyList })));
const CaseStudyDetail = React.lazy(() => import('./pages/CaseStudies').then(module => ({ default: module.CaseStudyDetail })));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Resume = React.lazy(() => import('./pages/Resume'));
const Login = React.lazy(() => import('./pages/Admin/Login'));
const AdminLayout = React.lazy(() => import('./components/Admin/AdminLayout'));
const Dashboard = React.lazy(() => import('./pages/Admin/Dashboard'));
const Analytics = React.lazy(() => import('./pages/Admin/Analytics'));
const Messages = React.lazy(() => import('./pages/Admin/Messages'));

const RequireAuth = React.lazy(() => import('./components/Admin/RequireAuth'));

import Loading from './components/Loading';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          {/* Public Routes with Main Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/case-studies" element={<CaseStudyList />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resume" element={<Resume />} />
          </Route>

          {/* Admin Routes - Standalone */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="messages" element={<Messages />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;