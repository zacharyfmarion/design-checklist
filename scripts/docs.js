/**
 * A documentation generator for all of the React component files in
 * this repository, made using
 */
const reactDocs = require('react-docgen');
const fs = require('fs');

/**
 * Traverse all files in a directory
 * https://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
 * @param {String} dir The starting directory for the traversal
 * @param {Function} done Callback function that takes in any errors and the result array
 * @returns {Array<string>} List of files
 */
function walk(dir, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
}

/**
 * Get the documentation for all the components in a given directory
 * @param {String} dir The starting directory for the traversal
 * @param {Function} done Callback function that takes in any errors and the result array
 * @returns {Array<Object>} Returns an array of the generated documentation
 */
function docsifyDirectory(dir, done) {
  let docs = [];
  walk(__dirname + '/../' + dir, (err, files) => {
    if (err) done(err);
    files.forEach(file => {
      try {
        const fileText = fs.readFileSync(file);
        docs.push(reactDocs.parse(fileText));
      } catch (err) {}
    });
    done(null, docs);
  });
}

/**
 * Generate a markdown file based on the documentation
 * @param {Object} doc The documentation generated from react-docgen
 */
function generateMarkdown(doc) {
  let content = `## ${doc.displayName}\n`;
  if (doc.description !== '') {
    content += `${doc.description}\n`;
  }
  if (doc.props) {
    let table = '| Prop Name | Type | Required | Description |\n';
    table += '| --- | --- | --- | --- |\n';
    Object.keys(doc.props).forEach(prop => {
      const propData = doc.props[prop];
      table += `| ${prop} | ${
        propData.flowType ? propData.flowType.name : 'No Type'
      } | ${propData.required.toString()} | ${
        propData.description !== ''
          ? propData.description.split('\n').join('')
          : 'No Description'
      } |\n`;
    });
    content += `\n${table}`;
  } else {
    // content += `> No prop data provided.`;
  }
  return content;
}

/**
 * Save the generated markdown files to the docs/ directory
 * @param {Array<Object>} docs Array of the documents
 * @param {String} title Title of the markdown file
 * @param {String} filename The name of the file to be saved
 */
function saveDocs(docs, title, filename) {
  let content = `# ${title}\n`;
  docs.forEach(doc => {
    content += `\n${generateMarkdown(doc)}\n`;
  });
  fs.writeFile(__dirname + '/../docs/' + filename, content, err => {
    if (err) {
      console.log(`Error saving file`);
    }
  });
}

// Locations that we are going to traverse
const locations = [
  {
    title: 'Components',
    filename: 'components.md',
    directory: 'src/components',
  },
  {
    title: 'Scenes',
    filename: 'scenes.md',
    directory: 'src/scenes',
  },
];

// Update the sidebar content
let sidebarContent = `* [Home](/) \n`;
sidebarContent += locations
  .map(loc => `* [${loc.title}](${loc.filename})`)
  .join('\n');

fs.writeFile(__dirname + '/../docs/_sidebar.md', sidebarContent, err => {
  if (err) {
    console.log('Error saving _sidebar.md');
  }
});

// Process the docs and then save them as md files in the docs/ directory
locations.forEach(location => {
  docsifyDirectory(location.directory, (err, docs) => {
    if (err) throw err;
    saveDocs(docs, location.title, location.filename);
  });
});
