"use client";
import Tooltip from "@/app/_components/Components/tooltip/Tooltip";
import ComponentPreview from "@/app/_common/ComponentPreview";
import { useState } from "react";

function TooltipContent() {
  return (
      <button
        className='text-md bg-gray-800 text-white py-2 px-4 rounded-lg border border-gray-600'
      >Show Tooltip</button>
  );
}

export default function TooltipDocs() {
  const [componentProps, setComponentProps] = useState<{
    text: string;
    showToolTip: "On Hover" | "On Click";
    arrow?: boolean;
    position?: "top" | "bottom" | "left" | "right";
    backgroundColor?: string;
    textColor?: string;    
  }>({
    text: "Hello",
    showToolTip: "On Hover",
    arrow: true,
    position: "top",
    backgroundColor: "#333",
    textColor: "#fff",
  });

  const usage = `<Tooltip 
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
>
  <button className='text-md bg-gray-800 text-white py-2 px-4 rounded-lg border border-gray-600'>
    Show Tooltip
  </button>
</Tooltip>;`;

  return (
    <div className="p-4">
      <ComponentPreview
        code={usage}
        componentProps={componentProps}
        setComponentProps={setComponentProps}
        component={<Tooltip {...componentProps}>
          <TooltipContent />
        </Tooltip> } 
        
        title="Tooltip"
        importCode="import Tooltip from 'xenkit/Tooltip'"
        maxLength={15}
        isHorizontallyCentered={true}
        isVerticallyCentered={true}
        propControls={
          {
            text: {
              type: "text"
            },
            showToolTip: {
              type: "select",
              options: ["On Hover", "On Click"],
            },
            position: {
              type: "select",
              options: ["top", "bottom", "left", "right"],
            },
            arrow: {
              type: "boolean",
            },
            backgroundColor: {
              type: "color",
            },
            textColor: {
              type: "color",
            },
          }
        }
      />
    </div>
  );
}
