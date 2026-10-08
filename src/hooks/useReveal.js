import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element when it scrolls into view.
 */
export function useReveal(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px', ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}

/** Returns a ref and applies the `in` class when the element enters view. */
export function useRevealClass(baseClass, options) {
  const { ref, inView } = useReveal(options);
  return { ref, className: `${baseClass} ${inView ? 'in' : ''}` };
}