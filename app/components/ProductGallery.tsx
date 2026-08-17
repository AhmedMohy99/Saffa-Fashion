'use client';

import { useEffect, useId, useState } from 'react';

type ProductGalleryProps = { images: string[]; alt: string; className?: string };

export default function ProductGallery({ images, alt, className = '' }: ProductGalleryProps) {
  const galleryId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const hasMultipleImages = images.length > 1;

  useEffect(() => setActiveIndex(0), [images.join('|')]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowLeft') previousImage();
      if (event.key === 'ArrowRight') nextImage();
      if (event.key === ' ' || event.key === 'Enter') setZoomed((value) => !value);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxOpen, activeIndex, images.length]);

  if (!images.length) return null;

  const selectImage = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
    setZoomed(false);
  };
  const previousImage = () => selectImage(activeIndex - 1);
  const nextImage = () => selectImage(activeIndex + 1);

  function handleTouchEnd(event: React.TouchEvent<HTMLDivElement>) {
    if (touchStartX === null || !hasMultipleImages) return;
    const delta = touchStartX - (event.changedTouches[0]?.clientX ?? touchStartX);
    setTouchStartX(null);
    if (Math.abs(delta) >= 36) delta > 0 ? nextImage() : previousImage();
  }

  const openLightbox = () => {
    setZoomed(false);
    setLightboxOpen(true);
  };

  return (
    <>
      <section className={`saffa-product-gallery ${className}`.trim()} aria-roledescription="carousel" aria-label={`${alt} images`} tabIndex={hasMultipleImages ? 0 : undefined} onKeyDown={(event) => { if (event.key === 'ArrowLeft') previousImage(); if (event.key === 'ArrowRight') nextImage(); }}>
        <div className="saffa-product-gallery-viewport" id={galleryId} onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)} onTouchEnd={handleTouchEnd} onClick={openLightbox} role="button" tabIndex={0} aria-label="Open product images in full screen" onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLightbox(); } }}>
          <div className="saffa-product-gallery-track" style={{ transform: `translate3d(-${activeIndex * 100}%,0,0)` }}>
            {images.map((src, index) => (
              <figure className="saffa-product-gallery-slide" key={`${src}-${index}`} aria-hidden={index !== activeIndex}>
                <img src={src} alt={index === activeIndex ? alt : ''} draggable={false} loading={index === 0 ? 'eager' : 'lazy'} />
              </figure>
            ))}
          </div>
          <span className="saffa-gallery-expand-hint" aria-hidden="true">↗</span>
        </div>

        {hasMultipleImages && (
          <>
            <button type="button" className="saffa-gallery-arrow previous" onClick={(event) => { event.stopPropagation(); previousImage(); }} aria-controls={galleryId} aria-label="Previous image">←</button>
            <button type="button" className="saffa-gallery-arrow next" onClick={(event) => { event.stopPropagation(); nextImage(); }} aria-controls={galleryId} aria-label="Next image">→</button>
            <div className="saffa-gallery-indicators" aria-label="Choose product image">
              {images.map((src, index) => <button type="button" key={`${src}-indicator-${index}`} className={index === activeIndex ? 'active' : ''} onClick={(event) => { event.stopPropagation(); selectImage(index); }} aria-label={`Show image ${index + 1} of ${images.length}`} aria-current={index === activeIndex} />)}
            </div>
          </>
        )}
      </section>

      {lightboxOpen && (
        <div className="saffa-gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${alt} full screen image viewer`} onClick={() => setLightboxOpen(false)}>
          <button type="button" className="saffa-lightbox-close" aria-label="Close image viewer" onClick={() => setLightboxOpen(false)}>×</button>
          <div className="saffa-lightbox-toolbar" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setZoomed((value) => !value)} aria-label={zoomed ? 'Fit image' : 'Zoom image'}>{zoomed ? '−' : '+'}</button>
            <span>{activeIndex + 1} / {images.length}</span>
          </div>
          {hasMultipleImages && <button type="button" className="saffa-lightbox-nav previous" onClick={(event) => { event.stopPropagation(); previousImage(); }} aria-label="Previous product image">←</button>}
          <div className={`saffa-lightbox-image-wrap ${zoomed ? 'is-zoomed' : ''}`} onClick={(event) => { event.stopPropagation(); setZoomed((value) => !value); }}>
            <img src={images[activeIndex]} alt={`${alt} — image ${activeIndex + 1}`} draggable={false} />
          </div>
          {hasMultipleImages && <button type="button" className="saffa-lightbox-nav next" onClick={(event) => { event.stopPropagation(); nextImage(); }} aria-label="Next product image">→</button>}
          {hasMultipleImages && <div className="saffa-lightbox-thumbs" onClick={(event) => event.stopPropagation()}>{images.map((src, index) => <button type="button" key={`${src}-thumb-${index}`} className={index === activeIndex ? 'active' : ''} onClick={() => selectImage(index)} aria-label={`Open image ${index + 1}`}><img src={src} alt="" /></button>)}</div>}
          <p className="saffa-lightbox-help">Tap the image to zoom · Swipe or use arrows to view all photos</p>
        </div>
      )}
    </>
  );
}
