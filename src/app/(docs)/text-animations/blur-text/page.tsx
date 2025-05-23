"use client";
import BlurText from "@/app/_components/text-animations/blur-text/BlurText";
import ComponentPreview from "@/app/_common/ComponentPreview";
import { useState } from "react";

export default function BlurTextDocs() {
  const [componentProps, setComponentProps] = useState<{
    text: string;
    animateBy: "words" | "letters";
    direction: "top" | "bottom";
    delay: number;
    duration?: number;
  }>({
    text: 'Hello, this is Blur Text!',
    animateBy: "words",
    direction: "bottom",
    duration: 0.5,
    delay: 0.1,
  });

  const usage = `<BlurText 
  ${Object.entries(componentProps)
    .map(([key, value]) =>{
      if ( typeof value === "string" ) {
        return `${key}="${value}"`;
      } 
      else if (Array.isArray(value)) {
        return `${key}={${JSON.stringify(value)}}`
      }
      else if (typeof value === "object") {
        return `${key}={${JSON.stringify(value)}}`
      } 
      else if (typeof value === "boolean") {
        return `${key}={${value}}`
      }
      else {
        return `${key}={${value}}`
      }
    })
    .join("\n  ")} 
/>;`;

  return (
    <div className="p-4">
      <ComponentPreview
        code={usage}
        componentProps={componentProps}
        setComponentProps={setComponentProps}
        component={<BlurText {...componentProps} />}
        title="Blur Text"
        importCode="import BlurText from 'xenkit/BlurText'"
        maxLength={15}
        isHorizontallyCentered={true}
        isVerticallyCentered={true}
        propControls={
          {
            text: {
              type: "text",
              label: "Text"
            },
            animateBy: {
              type: "select",
              label: "Animate By",
              options: ["words", "letters"],
            },
            direction: {
              type: "select",
              label: "Direction",
              options: ["top", "bottom"],
            },
            delay: {
              type: "number",
              label: "Delay",
              min: 0.1,
              max: 0.5,
              step: 0.1,
            },
            duration: {
              type: "number",
              label: "Duration",
              min: 0.1,
              max: 1,
              step: 0.1,
            },
          }
        }
      />
    </div>
  );
}
