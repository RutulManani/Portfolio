import { useRevealClass } from '../../hooks/useReveal';
import './Gallery.css';

/* ============================================================
   12 images — 10 landscape, 2 portrait.
   The masonry layout keeps every image at its natural
   aspect ratio, so the two portrait shots simply render taller
   and the columns pack around them automatically.
   ============================================================ */

const ITEMS = [
  { src: require('../../assets/images/gallery-01.jpg'), alt: 'Undergraduate sketch 01' },
  { src: require('../../assets/images/gallery-02.jpg'), alt: 'Undergraduate sketch 02' },
  { src: require('../../assets/images/gallery-03.jpg'), alt: 'Portrait sketch' },
  { src: require('../../assets/images/gallery-04.jpg'), alt: 'Digital render 01' },
  { src: require('../../assets/images/gallery-05.jpg'), alt: 'Digital render 02' },
  { src: require('../../assets/images/gallery-06.png'), alt: 'Undergraduate sketch 03' },
  { src: require('../../assets/images/gallery-07.png'), alt: 'Undergraduate sketch 04' },
  { src: require('../../assets/images/gallery-08.png'), alt: 'Digital render 03' },
  { src: require('../../assets/images/gallery-09.png'), alt: 'Digital render 04' },
  { src: require('../../assets/images/gallery-10.png'), alt: 'Portrait render' },
  { src: require('../../assets/images/gallery-11.jpg'), alt: 'Undergraduate sketch 05' },
  { src: require('../../assets/images/gallery-12.png'), alt: 'Digital render 05' },
];

export default function Gallery() {
  const head = useRevealClass('reveal');

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-container">
        <div ref={head.ref} className={head.className + ' gallery-header'}>
          <div className="gallery-label">
            <span className="gallery-label-accent">From the sketchbook</span>
            <span className="gallery-label-line" />
            <span className="gallery-label-muted">Undergrad work</span>
          </div>
          <h2 className="gallery-title">
            Where the hand{' '}
            <span className="gallery-title-accent">learned to think.</span>
          </h2>
        </div>

        <div className="gallery-masonry">
          {ITEMS.map((item, i) => (
            <div key={i} className="gallery-cell">
              <img src={item.src} alt={item.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}