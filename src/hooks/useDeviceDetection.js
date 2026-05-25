import { useState, useEffect } from 'react';

export const useDeviceDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Check screen width
      const width = window.innerWidth;
      // Check if touch device
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      // Consider mobile if width < 768px OR touch device with width < 1024px
      setIsMobile(width < 768 || (isTouch && width < 1024));
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile;
};