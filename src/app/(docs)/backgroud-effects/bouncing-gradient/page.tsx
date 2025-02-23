
"use client";
import BouncingGradient from "@/app/_components/backgroud-effects/bouncing-gradient/BouncingGradient";
import ComponentPreview from "@/app/_common/ComponentPreview";
import { useState } from "react";

export default function BouncingGradientDocs() {
  const [componentProps, setComponentProps] = useState({
    text: "Hello"
  });

  const usage = `<BouncingGradient 
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
        component={<BouncingGradient {...componentProps} />}
        title="BouncingGradient"
        importCode="import BouncingGradient from 'xenkit/BouncingGradient'"
        maxLength={15}
      />
    </div>
  );
}
