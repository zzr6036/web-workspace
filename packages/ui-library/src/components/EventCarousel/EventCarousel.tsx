"use client";

import { useRef, useState, type ReactNode } from 'react';
import { Paragraph } from '../Typography';

export type CarouselMedia = { src: string; alt?: string; type?: 'image' | 'video' };
export interface EventCarouselProps { title: ReactNode; description?: ReactNode; media: readonly CarouselMedia[]; className?: string }

export function EventCarousel({ title, description, media, className = '' }: EventCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const move = (direction: number) => {
    if (media.length === 0) return;
    setActiveIndex((current) => (current + direction + media.length) % media.length);
  };
  return <article className={`event-carousel${className ? ` ${className}` : ''}`}>
    <div className="event-carousel-header"><strong>{title}</strong></div>
    <div className="event-carousel-viewport" onTouchStart={(touch) => { touchStart.current = touch.changedTouches[0]?.clientX ?? null; }} onTouchEnd={(touch) => { if (touchStart.current === null) return; const delta = (touch.changedTouches[0]?.clientX ?? 0) - touchStart.current; if (Math.abs(delta) > 40) move(delta < 0 ? 1 : -1); touchStart.current = null; }}>
      <div className="event-carousel-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {media.map((item, index) => <div className="event-carousel-slide" key={item.src}>{(item.type === 'video' || item.src.endsWith('.mp4')) ? <video src={item.src} aria-label={item.alt ?? `${String(title)}, video`} autoPlay muted loop playsInline controls preload="metadata" /> : <img src={item.src} alt={item.alt ?? `${String(title)}, photo ${index + 1}`} />}</div>)}
      </div>
      <button className="event-carousel-control event-carousel-control--prev" type="button" aria-label="Previous photo" onClick={() => move(-1)}>←</button>
      <button className="event-carousel-control event-carousel-control--next" type="button" aria-label="Next photo" onClick={() => move(1)}>→</button>
    </div>
    {description ? <div className="event-carousel-footer"><Paragraph>{description}</Paragraph></div> : null}
    <div className="event-carousel-dots" aria-label={`${String(title)} photos`}>{media.map((item, index) => <button key={item.src} type="button" aria-label={`View photo ${index + 1}`} aria-current={activeIndex === index} onClick={() => setActiveIndex(index)} />)}</div>
  </article>;
}
