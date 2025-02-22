import fs from "fs";
import path from "path";
import process from "process";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error("Please provide component type and name.");
  process.exit(1);
}

const [componentType, componentName] = args;
const componentNameLower = componentName.charAt(0).toLowerCase() + componentName.slice(1);

const kebabCaseName = componentName
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .toLowerCase();

console.log('componentNameLower: ', componentNameLower);
console.log('kebabCaseName (for docs): ', kebabCaseName);

const paths = {
  components: path.join(__dirname, "../src/app/_components", componentType, kebabCaseName),
  docs: path.join(__dirname, "../src/app/(docs)", componentType, kebabCaseName),
};

Object.values(paths).forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Templates
const tsTemplate = `import React from "react";
${fs.existsSync(path.join(paths.components, `${componentName}.css`)) ? `import "./${componentName}.css";` : ""}

interface ${componentName}Props {
  text?: string;
}

const ${componentName}: React.FC<${componentName}Props> = ({ text }) => {
  return <div className="${componentNameLower}">{text || "Hello, ${componentName}!"}</div>;
};

export default ${componentName};
`;

const docsTemplate1 =
`
"use client";
import ${componentName} from "@/app/_components/${componentType}/${componentNameLower}/${componentName}";
import ComponentPreview from "@/app/_common/ComponentPreview";
import { useState } from "react";

export default function ${componentName}Docs() {
  const [componentProps, setComponentProps] = useState({
    text: "Hello"
  });`;

const docsTemplate2 =
  "\nconst usage =`<"+`${componentName} `+ 
  "${Object.entries(componentProps)"+
    ".map(([key, value]) =>"+"\n"+
      "typeof value === \"string\" ?"+ "`${key}=\"${value}\"` : `${key}={${value}}`"
    +")"+
    ".join(\"\\n  \")}" 
  +"/>;`\n"+
  `
  return (
    <div className=\"p-4\">
      <ComponentPreview
        code={usage}
        componentProps={componentProps}
        setComponentProps={setComponentProps}
        component={<${componentName} {...componentProps} />}
        title=\"${componentName}\"
        importCode=\"import ${componentName} from \'xenkit/${componentName}'\"
        maxLength={15}
      />
    </div>
  );
}
`;

const docsTemplate = docsTemplate1 + docsTemplate2;
async function createComponentFiles() {
  const needCSS = await askQuestion("Do you want to create a CSS file? (yes/no): ");

  const files = [
    { path: path.join(paths.components, `${componentName}.tsx`), content: tsTemplate },
    { path: path.join(paths.docs, `page.tsx`), content: docsTemplate }
  ];

  if (needCSS.toLowerCase() === "yes") {
    files.push({ path: path.join(paths.components, `${componentName}.css`), content: `.${componentNameLower} {}` });
  }

  files.forEach(({ path, content }) => {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, content);
    }
  });

  console.log(`Component "${componentName}" created successfully under "${componentType}".`);
  rl.close();
}

createComponentFiles();
