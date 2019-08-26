/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const reactDocgen = require('react-docgen');
const ReactDocGenMarkdownRenderer = require('react-docgen-markdown-renderer');

/* Add component name in the list */
const componentsList = ['Button', 'Modal', 'Title', 'Collapse'];
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