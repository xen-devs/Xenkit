
"use client";
import Spotlight from "@/app/_components/backgroud-effects/spotlight/Spotlight";
import ComponentPreview from "@/app/_common/ComponentPreview";
import { useState } from "react";

export default function SpotlightDocs() {
  const [componentProps, setComponentProps] = useState({
    text: "Hello"
  });

  const usage = `<Spotlight 
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
        component={<Spotlight {...componentProps} />}
        title="Spotlight"
        importCode="import Spotlight from 'xenkit/Spotlight'"
        maxLength={15}
      />
    </div>
  );
}
