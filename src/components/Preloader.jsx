import { useEffect, useState } from 'react';
import './Preloader.css';

/** Full-screen intro that counts to 100 then fades away, revealing the site. */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const step = current < 80 ? 2 : 1;
      current = Math.min(100, current + step);
      setCount(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => setExiting(true), 350);
        setTimeout(onDone, 1300);
      }
    }, 28);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      className="preloader"
      style={{
        transform: exiting ? 'translateY(-100%)' : 'translateY(0)',
      }}
    >
      <div className="preloader-text-wrapper">
        <p
          className="preloader-name"
          style={{
            transform: count > 0 ? 'translateY(0)' : 'translateY(110%)',
          }}
        >
          Rutul Manani
        </p>
      </div>
      <div className="preloader-bar">
        <div
          className="preloader-bar-fill"
          style={{ width: `${count}%` }}
        />
      </div>
      <p className="preloader-count">
        {String(count).padStart(3, '0')}
      </p>
    </div>
  );
}