"use client";

import { useState, useEffect } from "react";

interface UseImagePreloaderReturn {
  images: HTMLImageElement[];
  isLoaded: boolean;
  progress: number;
}

export function useImagePreloader(
  folderPath: string,
  frameCount: number,
  padding: number = 4
): UseImagePreloaderReturn {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    if (frameCount <= 0) {
      setIsLoaded(true);
      return;
    }

    // Fallback timeout: If network is extremely slow, force load after 15 seconds
    const fallbackTimeout = setTimeout(() => {
      if (!isMounted) return;
      // If we haven't reached frameCount yet, force finish
      if (loadedCount < frameCount) {
        setImages(loadedImages);
        setIsLoaded(true);
        console.warn(`Preloader timeout triggered for ${folderPath}`);
      }
    }, 15000);

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(padding, "0");
      const src = `${folderPath}/${frameNum}.jpg`;

      img.src = src;
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        const currentProgress = Math.round((loadedCount / frameCount) * 100);
        setProgress(currentProgress);

        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        loadedCount++;
        console.warn(`Failed to load frame image: ${src}`);
        const currentProgress = Math.round((loadedCount / frameCount) * 100);
        setProgress(currentProgress);

        if (loadedCount === frameCount) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };

      loadedImages.push(img);
    }

    return () => {
      isMounted = false;
      clearTimeout(fallbackTimeout);
    };
  }, [folderPath, frameCount, padding]);

  return { images, isLoaded, progress };
}
