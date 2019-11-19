import { useState, useEffect } from 'react';

function getWindowDimensions() {

  const { offsetWidth: width, offsetHeight: height } = window;
  return {
    width,
    height
  }; 
}

export default function useWindowDimensions() {

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
   
  }, []);

  return windowDimensions;
}