import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Components
import Cursor from './components/Cursor';
import Preloader from './components/Preloader';
import Nav from './components/Nav';
import Footer from './components/Footer';

// Sections
import Hero from './sections/Hero';
import Testimonials from './sections/Testimonials';
import Work from './sections/Work';
import Contact from './sections/Contact';

// Pages
import About from './pages/About';
import ProjectDetail from './pages/ProjectDetail';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  // Only show preloader once per session — check sessionStorage on first render
  const [loaded, setLoaded] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('preloaderDone') === 'true';
  });

  const { theme, toggleTheme } = useTheme();

  // Lock scroll while preloader is visible
  useEffect(() => {
    document.body.style.overflow = loaded ? '' : 'hidden';
  }, [loaded]);

  const handlePreloaderDone = () => {
    sessionStorage.setItem('preloaderDone', 'true');
    setLoaded(true);
  };

  return (
    <div className="noise relative min-h-screen bg-[var(--primary)]">
      <Cursor />
      {!loaded && <Preloader onDone={handlePreloaderDone} />}

      <Nav theme={theme} onToggleTheme={toggleTheme} />

      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <Testimonials />
              <Work />
              <Contact />
            </main>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;