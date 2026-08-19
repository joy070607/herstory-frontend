"use client";

import { useMemo } from "react";

const DROP_COUNT = 16;

export function RainOverlay() {
  const drops = useMemo(
    () =>
      Array.from({ length: DROP_COUNT }, (_, index) => ({
        id: index,
        left: Math.round(Math.random() * 100),
        duration: 1.1 + Math.random() * 1.2,
        delay: Math.random() * 2,
        height: 14 + Math.random() * 10,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]" aria-hidden>
      {drops.map((drop) => (
        <span
          key={drop.id}
          className="animate-rainfall absolute top-0 w-px bg-gradient-to-b from-transparent via-sky-400/60 to-transparent"
          style={{
            left: `${drop.left}%`,
            height: `${drop.height}px`,
            animationDuration: `${drop.duration}s`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
