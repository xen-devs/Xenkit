"use client";
import FadeText from "@/app/_components/text-animations/fade-text/FadeText";
import ComponentPreview from "@/app/_common/ComponentPreview";
import { useState } from "react";

export default function FadeTextDocs() {
  const [componentProps, setComponentProps] = useState<{
    text?: string;
    direction: "left" | "right";
    className?: string;
    variant?: "fadeIn" | "fadeOut";
    animateBy?: "words" | "characters";
    delay?: number;
    duration?: number;
  }>({
    text: "Hello, this is a Fade Text!",
    direction:"right",
    className: "text-2xl",
    variant: "fadeIn",
    animateBy: "characters",
    delay: 0.05,
    duration: 0.5
  });

  const usage = `<FadeText 
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
        component={<FadeText {...componentProps} />}
        title="Fade Text"
        importCode="import FadeText from 'xenkit/FadeText'"
        maxLength={15}
        isHorizontallyCentered={true}
        isVerticallyCentered={true}
        propControls={
          {
            text: {
              type: "text",
              label: "Text"
            },
            direction: {
              type: "select",
              options: ["left", "right"],
              label: "Direction"
            },
            variant: {
              type: "select",
              options: ["fadeIn", "fadeOut"],
              label: "Variant"
            },
            animateBy: {
              type: "select",
              options: ["words", "characters"],
              label: "Animate By"
            },
            delay: {
              type: "number",
              label: "Delay (s)",
              min: 0,
              max: 0.2,
              step: 0.01,
            },
            duration: {
              type: "number",
              label: "Duration (s)",
              min: 0,
              max: 1,
              step: 0.1,
            },
          }
        }
      />
    </div>
  );
}
