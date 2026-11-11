"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product360ViewerProps {
  images: string[];
  alt: string;
  className?: string;
}

export function Product360Viewer({ images, alt, className }: Product360ViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const startX = useRef(0);
  const startFrame = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalFrames = images.length;

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    const preload = images.map((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) setLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === images.length) setLoaded(true);
      };
      return img;
    });
    return () => {
      preload.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [images]);

  // Autoplay spin for 3 seconds on mount
  useEffect(() => {
    if (!loaded || totalFrames === 0) return;
    let frame = 0;
    autoPlayRef.current = setInterval(() => {
      frame = (frame + 1) % totalFrames;
      setCurrentFrame(frame);
      if (frame === 0) {
        // completed one full rotation, stop
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
          autoPlayRef.current = null;
        }
      }
    }, 80);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [loaded, totalFrames]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
      setIsDragging(true);
      startX.current = e.clientX;
      startFrame.current = currentFrame;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [currentFrame]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX.current;
      const frameStep = Math.round(deltaX / 12);
      const newFrame =
        ((startFrame.current + frameStep) % totalFrames + totalFrames) %
        totalFrames;
      setCurrentFrame(newFrame);
    },
    [isDragging, totalFrames]
  );

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-white to-muted",
        className
      )}
    >
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative flex h-full w-full cursor-grab items-center justify-center touch-none select-none active:cursor-grabbing"
        style={{ aspectRatio: "4 / 3" }}
      >
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent" />
          </div>
        )}
        {loaded && totalFrames > 0 && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images[currentFrame]}
            alt={alt}
            className="max-h-full max-w-full object-contain"
            draggable={false}
          />
        )}
      </div>

      {/* Hint badge */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <RotateCw className="h-3 w-3" />
        <span>Drag to rotate 360°</span>
      </div>
    </div>
  );
}
