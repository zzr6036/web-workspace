"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect, useRef } from "react";

type MultiFormatImageProps = Omit<ImageProps, "src"> & {
  baseSrc: string; // The source path without extension
  formats?: string[]; // E.g., [".png", ".svg", ".jpg"]
  useNextImage?: boolean; // Whether to use next/image or native img
};

export function MultiFormatImage({
  baseSrc,
  formats = [".png", ".jpg", ".jpeg", ".svg"],
  useNextImage = false,
  alt,
  ...props
}: MultiFormatImageProps) {
  const [formatIndex, setFormatIndex] = useState(0);
  const [prevBaseSrc, setPrevBaseSrc] = useState(baseSrc);
  const imgRef = useRef<HTMLImageElement>(null);

  if (baseSrc !== prevBaseSrc) {
    setPrevBaseSrc(baseSrc);
    setFormatIndex(0);
  }

  const currentSrc = `${baseSrc}${formats[formatIndex]}`;

  const handleError = () => {
    if (formatIndex < formats.length - 1) {
      setFormatIndex((prev) => prev + 1);
    }
  };

  // Fix SSR hydration race condition:
  // If the image fails to load BEFORE React hydrates, the onError handler won't catch it.
  // We check if it's already complete but has no width (meaning it's broken).
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth === 0) {
      handleError();
    }
  }, [currentSrc]);

  if (useNextImage) {
    return (
      <Image
        ref={imgRef}
        key={currentSrc}
        {...props}
        src={currentSrc}
        alt={alt}
        onError={handleError}
      />
    );
  }

  return (
    <img
      ref={imgRef}
      key={currentSrc}
      {...(props as any)}
      src={currentSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
