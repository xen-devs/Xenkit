import React from "react";

interface SpotlightProps {
  text?: string;
}

const Spotlight: React.FC<SpotlightProps> = ({ text }) => {
  return <div className="spotlight">{text || "Hello, Spotlight!"}</div>;
};

export default Spotlight;
