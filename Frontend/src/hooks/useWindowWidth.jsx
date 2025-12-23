import { useState, useEffect } from 'react';

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Sets intial value of width
    const handleResize = () => {
        setWidth(window.innerWidth); 
    };
    // resize : -> It is built-in event type in browser 
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('resize', handleResize); 
    };
  }, []);
  return width;
  };