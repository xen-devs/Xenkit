
"use client";
import FlipText from "@/app/_components/text-animations/flip-text/FlipText";
import ComponentPreview from "@/app/_common/ComponentPreview";
import { useState } from "react";

export default function FlipTextDocs() {
  const [componentProps, setComponentProps] = useState<{
    text: string;
    className?: string;
    duration: number;
    stagger: number;
    animateBy: "words" | "letters";
  }>({
    text: "Hover  On",
    className: "text-6xl md:text-8xl font-bold",
    duration: 0.25,
    stagger: 0.025,
    animateBy: "letters",
  });

  const usage = `<FlipText 
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
        component={<FlipText {...componentProps} />}
        title="Flip Text"
        importCode="import FlipText from 'xenkit/FlipText'"
        maxLength={15}
        isVerticallyCentered={true}
        isHorizontallyCentered={true}
        propControls={
          {
            text: {
              type: "text",
              label: "Text"
            },
            animateBy:{
              type: "select",
              label: "Animate By",
              options:["words", "letters"]
            },
            duration:{
              type: "number",
              label: "Duration (s)",
              min: 0,
              step: 0.01,
            },
            stagger:{
              type: "number",
              label: "Stagger (s)",
              min: 0,
              step: 0.001,
            },
            note:{
              type:"note",
              noteText:"This animation is only visible on hover."
            }
          }
        }
      />
    </div>
  );
}
