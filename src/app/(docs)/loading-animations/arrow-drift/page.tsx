"use client";
import ArrowDrift from "@/app/_components/loading-animations/arrow-drift/ArrowDrift";
import ComponentPreview from "@/app/_common/ComponentPreview";
import { useState } from "react";

export default function ArrowDriftDocs() {
  const [componentProps, setComponentProps] = useState({
    text: "Hello",
    repeat: -1,
    className: "text-4xl tracking-wide",
    delimiter: ">>",
    duration: 0.20,
  });

  const usage = `<ArrowDrift 
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
        component={<ArrowDrift {...componentProps} />}
        title="Arrow Drift"
        importCode="import ArrowDrift from 'xenkit/ArrowDrift'"
        maxLength={15}
        isHorizontallyCentered={true}
        isVerticallyCentered={true}
        propControls={
          {
            text: {
              type: "text"
            },
            duration:{
              type: "number",
            },
            repeat:{
              type: "number",
            },
            delimiter:{
              type: "text",
            },
          }
        }
      />
    </div>
  );
}
