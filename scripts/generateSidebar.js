import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const docsFolder = path.join(__dirname, "../src/app/(docs)");

function scanDir(dir, relativePath = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    // console.log('entry: ', entry);
    const fullPath = path.join(dir, entry.name);
    const newPath = path.join(relativePath, entry.name).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      const subcategories = scanDir(fullPath, newPath);
    //   console.log('subcategories: ', subcategories);

      results.push({
        name: formatName(entry.name),
        path: newPath,
        subcategories: subcategories.length > 0 ? subcategories : undefined,
      });
    } 
    else if (entry.isFile() && entry.name.endsWith(".tsx") && entry.name !== "layout.tsx" && entry.name !== "page.tsx") {
      results.push({
        name: formatName(entry.name.replace(".tsx", "")),
        path: newPath,
      });
    }
  }
  return results;
}

function formatName(name) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const sidebarData = scanDir(docsFolder);
const outputDir = path.join(__dirname, "../src/app/data");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputFile = path.join(outputDir, "sidebar.json");
fs.writeFileSync(outputFile, JSON.stringify(sidebarData, null, 2));

console.log(`Sidebar data generated at ${outputFile}`);