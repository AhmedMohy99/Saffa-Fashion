'use client';

import { useEffect, useId, useState } from 'react';

type ProductGalleryProps = { images: string[]; alt: string; className?: string };

export default function ProductGallery({ images, alt, className = '' }: ProductGalleryProps) {
  const galleryId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const hasMultipleImages = images.length > 1;

  useEffect(() => setActiveIndex(0), [images.join('|')]);
  if (!images.length) return null;

  const selectImage = (index: number) => setActiveIndex((index + images.length) % images.length);
  const previousImage = () => selectImage(activeIndex - 1);
  const nextImage = () => selectImage(activeIndex + 1);

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX === null || !hasMultipleImages) return;
    const delta = touchStartX - (event.changedTouches[0]?.clientX ?? touchStartX);
    setTouchStartX(null);
    if (Math.abs(delta) >= 36) delta > 0 ? nextImage() : previousImage();
  }

  return (
    <section
      className={`saffa-product-gallery ${className}`.trim()}
      aria-roledescription="carousel"
      aria-label={`${alt} images`}
      tabIndex={hasMultipleImages ? 0 : undefined}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') previousImage();
        if (event.key === 'ArrowRight') nextImage();
      }}
    >
      <div
        className="saffa-product-gallery-viewport"
        id={galleryId}
        onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
        onTouchEnd={handleTouchEnd}
      >
        <div className="saffa-product-gallery-track" style={{ transform: `translate3d(-${activeIndex * 100}%,0,0)` }}>
          {images.map((src, index) => (
            <figure className="saffa-product-gallery-slide" key={`${src}-${index}`} aria-hidden={index !== activeIndex}>
              <img src={src} alt={index === activeIndex ? alt : ''} draggable={false} loading={index === 0 ? 'eager' : 'lazy'} />
            </figure>
          ))}
        </div>
      </div>

      {hasMultipleImages && (
        <>
          <button type="button" className="saffa-gallery-arrow previous" onClick={previousImage} aria-controls={galleryId} aria-label="Previous image">←</button>
          <button type="button" className="saffa-gallery-arrow next" onClick={nextImage} aria-controls={galleryId} aria-label="Next image">→</button>
          <div className="saffa-gallery-indicators" aria-label="Choose product image">
            {images.map((src, index) => (
              <button type="button" key={`${src}-indicator-${index}`} className={index === activeIndex ? 'active' : ''} onClick={() => selectImage(index)} aria-label={`Show image ${index + 1} of ${images.length}`} aria-current={index === activeIndex} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
