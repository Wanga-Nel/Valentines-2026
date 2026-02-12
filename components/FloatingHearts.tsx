import React from "react";

type Props = {
  count?: number;
};

// Deterministic pseudo-random based on index so server and client markup match
function det(i: number, seed = 424242) {
  // simple deterministic function using sine
  const x = Math.sin(i * 127.1 + seed * 0.01) * 43758.5453;
  return Math.abs(x - Math.floor(x));
}

export default function FloatingHearts({ count = 120 }: Props) {
  // Force all hearts to the primary red color per user request
  const colors = ["#ee2b4b"];

  const hearts = Array.from({ length: count }).map((_, i) => {
  const left = (det(i, 11) * 100).toFixed(4) + "%";
  const size = Math.round(10 + det(i + 1, 22) * 28); // px
  // add ~5s base delay so hearts start after initial pause
  const delayNum = +(det(i + 2, 33) * 2) + 5; // 5s base + up to 2s random
  const delay = delayNum.toFixed(2) + "s";
  const duration = Math.round(1 + det(i + 3, 44) * 3) + "s"; // 1-4s
  const opacity = (0.7 + det(i + 4, 55) * 0.3).toFixed(2);
    const color = colors[i % colors.length];

    return (
      <span
        key={i}
        className="floating-heart"
        aria-hidden={true}
        style={{
          left,
          fontSize: `${size}px`,
          lineHeight: 1,
          color,
          opacity: Number(opacity),
          animationDelay: delay,
          animationDuration: duration,
        }}
      >
        ❤️
      </span>
    );
  });

  // Use z-0 so hearts render above the page background but behind main content (which uses z-10)
  return <div className="hearts-container pointer-events-none fixed inset-0 z-0">{hearts}</div>;
}
