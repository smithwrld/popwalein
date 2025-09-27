import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to ensure page content is rendered
    const timer = setTimeout(() => {
      // Smooth scroll to top when route changes
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 50);

    // Cleanup timeout
    return () => clearTimeout(timer);
  }, [pathname]);

  // Also handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return null;
};

export default ScrollToTop;