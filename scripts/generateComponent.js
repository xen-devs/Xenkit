import fs from "fs";
import path from "path";
import process from "process";
import readline from "readline";
import inquirer from 'inquirer';
import { fileURLToPath } from "url";
import generateSidebar, {formatName} from "./generateSidebar.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getComponentTypes(){
  const sidebarPath= path.join(__dirname, '../src/app/data/sidebar.json');
  if(!fs.existsSync(sidebarPath)){
    return [];
  }
  const data = JSON.parse(fs.readFileSync(sidebarPath, "utf-8"));
  let types=[];
  data.forEach((category)=>{
    types.push({name:category.name, value:category.path});
  })
  types.push({name:"+ New Component type", value:"new"});
  return types;
}


function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  let args = process.argv.slice(2);
  let componentType, componentName;

  if (args.length < 2) {
    const types = getComponentTypes();
    const {selectedType} = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedType',
        message: 'What type of component do you want to create?',
        choices: types
      }
    ]);
    if(selectedType === "new"){
      const {newType} = await inquirer.prompt([
        {
          type: 'input',
          name: 'newType',
          message: 'Enter new component type:'
        }
      ])
      componentType = newType;
    }else{
      componentType = selectedType;
    }
    const {newComponent} = await inquirer.prompt([
      {
        type: 'input',
        name: 'newComponent',
        message: 'Enter component name:'
      }
    ])
    componentName = newComponent;
  } else {
    componentType = args[0];
    componentName = args[1];
  }

  const componentNameLower = componentName.charAt(0).toLowerCase() + componentName.slice(1);
  const kebabCaseName = componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

  console.log("Component Name Lower: ", componentNameLower);
  console.log("Kebab Case Name: ", kebabCaseName);

  const paths = {
    components: path.join(__dirname, "../src/app/_components", componentType, kebabCaseName),
    docs: path.join(__dirname, "../src/app/(docs)", componentType, kebabCaseName),
  };

  Object.values(paths).forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Component Template
  const tsTemplate = `import React from "react";

interface ${componentName}Props {
  text?: string;
}

const ${componentName}: React.FC<${componentName}Props> = ({ text }) => {
  return <div className="${componentNameLower}">{text || "Hello, ${componentName}!"}</div>;
};

export default ${componentName};
`;

  // Docs Template
  const docsTemplate = `
"use client";
import ${componentName} from "@/app/_components/${componentType}/${kebabCaseName}/${componentName}";
import ComponentPreview from "@/app/_common/ComponentPreview";
import { useState } from "react";

export default function ${componentName}Docs() {
  const [componentProps, setComponentProps] = useState({
    text: "Hello"
  });

  const usage = \`<${componentName} 
  \${Object.entries(componentProps)
    .map(([key, value]) =>
      typeof value === "string" ? \`\${key}="\${value}"\` : \`\${key}={\${value}}\`
    )
    .join("\\n  ")} 
/>;\`;

  return (
    <div className="p-4">
      <ComponentPreview
        code={usage}
        componentProps={componentProps}
        setComponentProps={setComponentProps}
        component={<${componentName} {...componentProps} />}
        title="${formatName(kebabCaseName)}"
        importCode="import ${componentName} from 'xenkit/${componentName}'"
        maxLength={15}
      />
    </div>
  );
}
`;

  const files = [
    { path: path.join(paths.components, `${componentName}.tsx`), content: tsTemplate },
    { path: path.join(paths.docs, `page.tsx`), content: docsTemplate }
  ];

  files.forEach(({ path, content }) => {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, content);
    }
  });

  console.log(`Component "${componentName}" created successfully under "${componentType}".`);
  rl.close();
}

main()
  .then(()=>{
    generateSidebar();    
  })