
"use client";
import IncreasingDots from "@/app/_components/loading-animations/increasing-dots/IncreasingDots";
import ComponentPreview from "@/app/_common/ComponentPreview";
import { useState } from "react";

export default function IncreasingDotsDocs() {
  const [componentProps, setComponentProps] = useState({
    word: "Hello",
    className: "text-2xl",
    repeat: -1,
    duration: 0.15,
  });



  const usage = `<IncreasingDots 
  ${Object.entries(componentProps)
    .map(([key, value]) =>
      typeof value === "string" ? `${key}="${value}"` : `${key}={${value}}`
    )
    .join("\n  ")} 
/>`;

  return (
    <div className="p-4">
      <ComponentPreview
        code={usage}
        componentProps={componentProps}
        setComponentProps={setComponentProps}
        component={<IncreasingDots {...componentProps} />}
        title="Increasing Dots"
        importCode="import IncreasingDots from 'xenkit/IncreasingDots'"
        maxLength={15}
        isVerticallyCentered={true}
        isHorizontallyCentered={true}
        propControls={
          {
            word: {
              type: "text",
              label: "Text",
              min:3,
              max: 15,
            },
            repeat: {
              type: "number",
              label: "Repeat",
              min: -1,
              max: 3,
              step: 1,
            },
            duration: {
              type: "number",
              label: "Duration",
              min: 0.1,
              max: 1,
              step: 0.05,
            },
            className: {
              type: "hidden",
            },
          }

        }
      />
    </div>
  );
}
