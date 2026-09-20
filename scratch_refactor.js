const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else if (dirPath.endsWith('.tsx')) {
      callback(path.join(dir, f));
    }
  });
}

const targetDir = path.join(__dirname, 'apps/front-end/app');
let modifiedFiles = 0;

walkDir(targetDir, (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(X) }} />
  // Note: layout.tsx uses globalJsonLd, others use jsonLd. We can capture the variable name.
  const scriptRegex = /<script\s+type="application\/ld\+json"\s+dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(([a-zA-Z0-9_]+)\)\s*\}\}\s*\/>/g;
  
  if (scriptRegex.test(content)) {
    content = content.replace(scriptRegex, (match, varName) => {
      // Determine an ID based on the file path or just a generic one based on varName
      const fileName = path.basename(filePath, '.tsx');
      const folderName = path.basename(path.dirname(filePath));
      const id = `schema-${folderName}-${fileName}`;
      return `<JsonLd id="${id}" schema={${varName}} />`;
    });

    // We also need to import JsonLd at the top if not present
    if (!content.includes("import JsonLd")) {
      // Insert right after the last import or at top
      const importMatches = [...content.matchAll(/^import .* from .*$/gm)];
      if (importMatches.length > 0) {
        const lastMatch = importMatches[importMatches.length - 1];
        const lastIndex = lastMatch.index + lastMatch[0].length;
        content = content.slice(0, lastIndex) + "\nimport JsonLd from '@/components/JsonLd';" + content.slice(lastIndex);
      } else {
        content = "import JsonLd from '@/components/JsonLd';\n" + content;
      }
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Modified: ${filePath}`);
    modifiedFiles++;
  }
});

console.log(`Done! Modified ${modifiedFiles} files.`);
