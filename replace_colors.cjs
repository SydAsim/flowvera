const fs = require('fs');
const path = require('path');

const replacements = [
  { find: /bg-brand-bg/g, replace: 'bg-background' },
  { find: /bg-\[\#050816\]/g, replace: 'bg-background' },
  { find: /text-slate-100/g, replace: 'text-foreground' },
  { find: /text-white/g, replace: 'text-foreground' },
  { find: /text-slate-300/g, replace: 'text-muted-foreground' },
  { find: /text-slate-400/g, replace: 'text-muted-foreground' },
  { find: /text-slate-500/g, replace: 'text-muted-foreground' },
  { find: /bg-white\/5/g, replace: 'bg-card' },
  { find: /bg-white\/\[0\.02\]/g, replace: 'bg-card' },
  { find: /bg-white\/\[0\.01\]/g, replace: 'bg-card' },
  { find: /bg-slate-900\/45/g, replace: 'bg-card' },
  { find: /border-white\/5/g, replace: 'border-card-border' },
  { find: /border-white\/8/g, replace: 'border-card-border' },
  { find: /border-white\/10/g, replace: 'border-card-border' },
  { find: /bg-slate-950\/65/g, replace: 'bg-background\/90' },
  { find: /bg-slate-950/g, replace: 'bg-background' },
  { find: /text-\[\#050816\]/g, replace: 'text-background' },
  { find: /text-slate-950/g, replace: 'text-background' },
  { find: /text-zinc-800/g, replace: 'text-foreground' },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  replacements.forEach(r => {
    content = content.replace(r.find, r.replace);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') && !fullPath.includes('ThemeProvider.tsx') && !fullPath.includes('Navbar.tsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'src'));
console.log('Done replacing colors.');
