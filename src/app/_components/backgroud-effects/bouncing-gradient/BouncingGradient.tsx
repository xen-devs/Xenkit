import React from "react";

interface BouncingGradientProps {
  text?: string;
}

const BouncingGradient: React.FC<BouncingGradientProps> = ({ text }) => {
  return <div className="bouncingGradient">{text || "Hello, BouncingGradient!"}</div>;
};

export default BouncingGradient;
