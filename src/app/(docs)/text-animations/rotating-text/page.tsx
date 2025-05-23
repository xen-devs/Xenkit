"use client";
import RotatingText from "@/app/_components/text-animations/rotating-text/RotatingText";
import ComponentPreview from "@/app/_common/ComponentPreview";
import { useState } from "react";

export default function RotatingTextDocs() {
  const [componentProps, setComponentProps] = useState<{
    constantText: string;
    rotatingWords: string[];
    className: string;
    rotateInterval?: number
    animationDuration?: number
    backGroundColor?: string
    textColor?: string
  }>({
    constantText:"Follow on",
    rotatingWords: ["Twitter", "Instagram", "Linkedln", "Github" ,"Facebook"],
    className:"sm:text-4xl text-2xl",
    rotateInterval: 900,
    animationDuration: 0.5,
    backGroundColor: "#94a3b8",
    textColor: "#000",
  });

  const usage = `<RotatingText 
    ${Object.entries(componentProps)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key}="${value}"`
        } else if (Array.isArray(value)) {
          return `${key}={${JSON.stringify(value)}}`
        } else {
          return `${key}={${value}}`
        }
      })
      .join("\n  ")} 
  />`;


  return (
    <div className="p-4">
      <ComponentPreview
        code={usage}
        componentProps={componentProps}
        setComponentProps={setComponentProps}
        component={<RotatingText {...componentProps} />}
        title="Rotating Text"
        importCode="import RotatingText from 'xenkit/RotatingText'"
        maxLength={15}
        isHorizontallyCentered={true}
        isVerticallyCentered={true}
        propControls={
          {
            rotateInterval:{
              type:"number",
              label:"Rotate Interval",
              min:500,
              max:5000,
              step:100,
            },
            animationDuration:{
              type:"number",
              label:"Animation Duration",
              min:0.2,
              max:0.8,
              step:0.1,
            },
            backGroundColor:{
              type:"color",
              label:"Background Color",
            },
            textColor:{
              type:"color",
              label:"Text Color",
            },

          }
        }
      />
    </div>
  );
}
