import React, { useEffect, useState } from 'react';
import './Loader.css';

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Match your original loader duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${!loading ? 'hidden' : ''}`}>
      <div className="loader-spinner"></div>
      <div className="loader-text">Loading Creativity...</div>
    </div>
  );
};

export default Loader;