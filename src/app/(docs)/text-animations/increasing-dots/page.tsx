"use client";
import IncreasingDots from "@/app/_components/text-animations/increasingdots/IncreasingDots";
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
        propControls={
          {
            word: {
              type: "text",
            },
            repeat: {
              type: "number",
            },
            duration: {
              type: "number",
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
