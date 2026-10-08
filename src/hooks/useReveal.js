import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element when it scrolls into view.
 * The observer is set up once on mount — later changes to `options`
 * are intentionally ignored (they only affect thresholds, which are
 * not meaningful to change after mount for a reveal-once hook).
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

/** Returns a ref and applies the `in` class when the element enters view. */
export function useRevealClass(baseClass, options) {
  const { ref, inView } = useReveal(options);
  return { ref, className: `${baseClass} ${inView ? 'in' : ''}` };
}