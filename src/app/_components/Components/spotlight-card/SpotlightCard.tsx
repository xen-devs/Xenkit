import React, { useEffect, useRef, useState } from "react";

interface SpotlightCardProps {
  children?: React.ReactNode;
  spotlightColor?: string;
  spotlightSize?: string;
  cardBackgroundColor?: string;
  cardBorderRadius?: string;
  cardWidth?: string;
  cardHeight?: string;
  borderColor?: string;
  spotlightOpacity?: {
    start?: number;
    middle?: number;
    end?: number;
  };
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  spotlightColor = "#6600ff",
  spotlightSize = "30%",
  cardBackgroundColor = "#111111",
  cardBorderRadius = "20px",
  cardWidth = "270px",
  cardHeight = "270px",
  borderColor = "#222222",
  spotlightOpacity = { start: 0.3, middle: 0.2, end: 0 },
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [bg, setBg] = useState<string>(cardBackgroundColor);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let rgb = [0, 0, 0];
    if (spotlightColor.startsWith("rgb")) {
      const match = spotlightColor.match(/\d+/g);
      if (match) rgb = match.slice(0, 3).map(Number);
    } else if (spotlightColor.startsWith("#")) {
      const hex = spotlightColor.slice(1);
      const bigint = parseInt(hex, 16);
      rgb = [
        (bigint >> 16) & 255,
        (bigint >> 8) & 255,
        bigint & 255
      ];
    }

    const radialGradient = `radial-gradient(circle at ${x}px ${y}px,
      rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${spotlightOpacity.start}) 0%,
      rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${spotlightOpacity.middle}) ${spotlightSize},
      rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${spotlightOpacity.end}) 80%)`;

    setBg(`${radialGradient}, ${cardBackgroundColor}`);
  };

  useEffect(()=>{
    setBg(cardBackgroundColor);
  },[cardBackgroundColor])
  const handleMouseLeave = () => {
    setBg(cardBackgroundColor);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="border flex items-center justify-center text-xl font-medium transition-all duration-300"
      style={{
        borderRadius: cardBorderRadius,
        background: bg,
        width: cardWidth,
        height: cardHeight,
        border: `2px solid ${borderColor}`,
      }}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;