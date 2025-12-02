'use client';

import { useEffect, useState } from "react";

const images = [
  "/adv1.png",
  "/adv2.png",
  "/adv4.png",
];

export default function AutoSlideCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-70 overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className="w-full h-70 object-cover shrink-0"
          />
        ))}
      </div>
    </div>
  );
}
