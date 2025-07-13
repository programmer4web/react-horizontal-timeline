const fs = require('fs');
const path = require('path');

const cssContent = fs.readFileSync('src/output.css', 'utf8');
const jsContent = `
const css = \`${cssContent}\`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}

export default css;
`;

fs.writeFileSync('src/styles.js', jsContent);