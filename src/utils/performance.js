// Performance monitoring utilities

// Debounce function for scroll handlers
export const debounce = (func, wait = 16) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for high-frequency events
export const throttle = (func, limit = 16) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Request Idle Callback wrapper with fallback
export const requestIdleCallback = 
  window.requestIdleCallback || 
  ((cb) => setTimeout(cb, 1));

export const cancelIdleCallback = 
  window.cancelIdleCallback || 
  ((id) => clearTimeout(id));

// Performance metrics logger (only in development)
export const logPerformance = () => {
  if (process.env.NODE_ENV !== 'development') return;
  
  if (typeof window === 'undefined') return;
  
  window.addEventListener('load', () => {
    // Use Performance API
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    const connectTime = perfData.responseEnd - perfData.requestStart;
    const renderTime = perfData.domComplete - perfData.domLoading;
    
    console.log('🚀 Performance Metrics:');
    console.log(`📊 Page Load Time: ${pageLoadTime}ms`);
    console.log(`🔌 Connection Time: ${connectTime}ms`);
    console.log(`🎨 Render Time: ${renderTime}ms`);
    
    // Log largest contentful paint if available
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log(`🖼️ Largest Contentful Paint: ${lastEntry.renderTime || lastEntry.loadTime}ms`);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Silently fail if not supported
      }
    }
  });
};

// Initialize performance monitoring
if (process.env.NODE_ENV === 'development') {
  logPerformance();
}
