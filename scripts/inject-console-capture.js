const fs = require('fs');
const path = require('path');

const htmlDir = path.join(process.cwd(), '.next');
const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('dashboard-console-capture.js')) {
      content = content.replace('</head>', scriptTag + '</head>');
      fs.writeFileSync(filePath, content);
      console.log('Injected console capture script into:', filePath);
    }
  } catch (err) {
    console.error('Error processing file:', filePath, err);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

walkDir(htmlDir);
console.log('Console capture script injection complete.');