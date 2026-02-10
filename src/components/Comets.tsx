"use client";

import { useEffect, useState } from "react";

interface Comet {
  id: number;
  top: number;
  left: number;
  angle: number;
  duration: number;
  delay: number;
  size: number;
  tailLength: number;
  opacity: number;
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function Comets({ count = 18 }: { count?: number }) {
  const [comets, setComets] = useState<Comet[]>([]);

  useEffect(() => {
    const list: Comet[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: randomBetween(-10, 90),
      left: randomBetween(-10, 100),
      angle: randomBetween(200, 240), // mostly top-right to bottom-left
      duration: randomBetween(2, 5),
      delay: randomBetween(0, 15),
      size: randomBetween(1.5, 3),
      tailLength: randomBetween(60, 140),
      opacity: randomBetween(0.25, 0.7),
    }));
    setComets(list);
  }, [count]);

  if (comets.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {comets.map((c) => (
        <div
          key={c.id}
          style={{
            position: "absolute",
            top: `${c.top}%`,
            left: `${c.left}%`,
            transform: `rotate(${c.angle}deg)`,
          }}
        >
          <div
            className="comet"
            style={
              {
                width: `${c.tailLength}px`,
                height: `${c.size}px`,
                "--comet-opacity": c.opacity,
                animationDuration: `${c.duration}s`,
                animationDelay: `${c.delay}s`,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
    </div>
  );
}
