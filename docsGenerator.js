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
  walk(__dirname + '/' + dir, (err, files) => {
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
 * @param {Object} docs The documentation generated from react-docgen
 */
function generateMarkdown(docs) {
  const content = `
    # ${docs.displayName}
  `;
  return {
    name: docs.displayName + '.md',
    content: content,
  };
}

/**
 * Save the generated markdown files to the docs/ directory
 * @param {Array<Object>} markdownFiles Array of the markdown generated files
 * @param {String} subfolder The folder within docs that the files should be saved in.
 *    If it should be in the root folder then leave as empty string
 */
function saveDocs(markdownFiles, subfolder) {
  markdownFiles.forEach(file => {
    const fileName = __dirname + '/docs/' + subfolder + file.name;
    fs.writeFile(fileName, file.content, err => {
      if (err) {
        console.log(`Error saving file ${file.name}`);
      }
    });
  });
}

docsifyDirectory('src/components', (err, docs) => {
  if (err) throw err;
  const markdownFiles = docs.map(doc => generateMarkdown(doc));
  saveDocs(markdownFiles, 'components');
});
