/**
 * Performance optimization utilities
 * Helps measure and improve app performance
 */

// Measure page load performance
export const getPerformanceMetrics = () => {
  if (typeof window === 'undefined') return null;

  const navigation = performance.getEntriesByType('navigation')[0];
  if (!navigation) return null;

  return {
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
    timeToFirstByte: navigation.responseStart - navigation.requestStart,
    totalTime: navigation.loadEventEnd - navigation.fetchStart,
  };
};

// Report Core Web Vitals
export const reportWebVitals = (metric) => {
  if (typeof window !== 'undefined') {
    const vitalsToReport = ['FCP', 'LCP', 'FID', 'CLS', 'TTFB'];
    if (vitalsToReport.includes(metric.name)) {
      console.log(`${metric.name}: ${metric.value}ms`);
      // Send to analytics service here
    }
  }
};

// Check if element is in viewport (for lazy loading)
export const isInViewport = (element) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Lazy load images with Intersection Observer
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img.lazy').forEach((img) => imageObserver.observe(img));
  }
};

// Cache API responses in localStorage
export const getCachedData = (key, maxAge = 3600000) => {
  if (typeof window === 'undefined') return null;

  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > maxAge) {
    localStorage.removeItem(key);
    return null;
  }

  return data;
};

// Cache data with timestamp
export const setCachedData = (key, data) => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    })
  );
};

// Connection check with timeout
export const checkConnection = async (timeout = 5000) => {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch('/api/health', {
      method: 'HEAD',
      signal: controller.signal,
    });

    clearTimeout(id);
    return response.ok;
  } catch {
    return false;
  }
};

// Rate limiting helper
export class RateLimiter {
  constructor(maxRequests = 10, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  isLimited() {
    const now = Date.now();
    this.requests = this.requests.filter((time) => now - time < this.windowMs);

    if (this.requests.length >= this.maxRequests) {
      return true;
    }

    this.requests.push(now);
    return false;
  }

  reset() {
    this.requests = [];
  }
}
