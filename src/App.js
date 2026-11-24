import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';

// Components
import Nav from './components/Nav';
import Footer from './components/Footer';

// Sections
import Hero from './sections/Hero';
import Work from './sections/Work';
import Testimonials from './sections/Testimonials';

// Pages
import About from './pages/About';
import ProjectDetail from './pages/ProjectDetail';

function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // "Back to Projects" on a case study asks to land on the Work section
    if (pathname === '/' && state?.scrollToProjects) {
      document.getElementById('work')?.scrollIntoView({ behavior: 'instant' });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, state]);

  return null;
}

function AppContent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="noise relative min-h-screen bg-[var(--primary)]">
      <Nav theme={theme} onToggleTheme={toggleTheme} />

      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <main className="home">
              <Hero />
              <Work />
              <Testimonials />
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