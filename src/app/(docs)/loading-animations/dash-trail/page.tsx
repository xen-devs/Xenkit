
"use client";
import DashTrail from "@/app/_components/loading-animations/dash-trail/DashTrail";
import ComponentPreview from "@/app/_common/ComponentPreview";
import { useState } from "react";

export default function DashTrailDocs() {
  const [componentProps, setComponentProps] = useState({
    text: "Hello",
    duration: 0.2,
    repeat: -1,
    className:"text-4xl"
  });

  const usage = `<DashTrail 
  ${Object.entries(componentProps)
    .map(([key, value]) =>
      typeof value === "string" ? `${key}="${value}"` : `${key}={${value}}`
    )
    .join("\n  ")} 
/>;`;

  return (
    <div className="p-4">
      <ComponentPreview
        code={usage}
        componentProps={componentProps}
        setComponentProps={setComponentProps}
        component={<DashTrail {...componentProps} />}
        title="Dash Trail"
        importCode="import DashTrail from 'xenkit/DashTrail'"
        maxLength={15}
        isVerticallyCentered={true}
        isHorizontallyCentered={true}
        propControls={
          {
            text: {
              type: "text",
              label: "Text",
            },
            duration:{
              type:"number",
              label:"Duration",
              min:0.1,
              max:1,
              step:0.1,
            },
            repeat:{
              type:"number",
              label:"Repeat",
              min:-1,
              max:10,
            }
          }
        }
      />
    </div>
  );
}
