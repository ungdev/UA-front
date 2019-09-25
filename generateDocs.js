const path = require('path');
const fs = require('fs');
const reactDocgen = require('react-docgen');
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');

// Get all UI components
const componentsList = fs.readdirSync('./components/UI')
  .filter((file) => file.substr(-4) === '.jsx')
  .map((file) => file.substr(0, file.length - 4));

componentsList.forEach((component) => {
  const componentPath = path.join(__dirname, `components/UI/${component}.jsx`);
  const renderer = new ReactDocGenMarkdownRenderer();
  fs.readFile(componentPath, (error, content) => {
    const documentationPath = `docs/${component}${renderer.extension}`;
    const doc = reactDocgen.parse(content);
    fs.writeFile(documentationPath, renderer.render(
      componentPath,
      doc,
      [],
    ), () => {});
  });
});