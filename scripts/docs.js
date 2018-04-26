/**
 * A documentation generator for all of the React component files in
 * this repository, made using
 */
const reactDocs = require('react-docgen');
const fs = require('fs');
var documentation = require('documentation');

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
  let javascriptFiles = [];
  walk(__dirname + '/../' + dir, (err, files) => {
    if (err) done(err);
    files.forEach(file => {
      try {
        const fileText = fs.readFileSync(file);
        docs.push(reactDocs.parse(fileText));
      } catch (err) {
        const lastIndex = file.lastIndexOf('/');
        // ignore index files as they are just for import convenience
        if (file.substring(lastIndex + 1).includes('Store.js')) {
          javascriptFiles.push(file);
        }
      }
    });
    done(null, docs, javascriptFiles);
  });
}

/**
 * Generate a markdown file based on the documentation
 * @param {Object} doc The documentation generated from react-docgen
 */
function generateMarkdown(doc) {
  let content = `## &lt;${doc.displayName} /&gt;\n`;
  if (doc.description !== '') {
    content += `${doc.description}\n`;
  }
  if (doc.props) {
    content += `### Props\n`;
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
    // If there are complex proptypes declared in the file we will display
    // them in the documentation
    const propDefs = Object.keys(doc.props).filter(prop => {
      const typeDef = doc.props[prop].flowType;
      return typeDef.hasOwnProperty('raw') && !/^React\./.test(typeDef.raw);
    });
    if (propDefs.length > 0) {
      let typeDefs = '### Type Definitions\n';
      typeDefs += propDefs
        .map(
          prop =>
            `#### ${prop}\n\`\`\`js\n${doc.props[prop].flowType.raw}\`\`\``,
        )
        .join('\n');
      content += typeDefs;
    }
  }
  if (doc.methods && doc.methods.length > 0) {
    content += `\n### Methods\n`;
    content += doc.methods
      .map(method => {
        const paramList = method.params
          ? method.params.map(param => param.name).join(', ')
          : '';
        let methodContent = `#### \`${method.name}(${paramList})\`\n\n`;
        methodContent += `${
          method.description ? method.description.split('\n').join(' ') : ''
        }\n`;
        if (method.params.length > 0) {
          let table = `| Name | Type | Description |\n`;
          table += `| --- | --- | --- |\n`;
          method.params.forEach(param => {
            table += `| ${param.name} | ${
              param.type ? param.type.name : 'No type'
            } | ${
              param.description
                ? param.description.split('\n').join(' ')
                : 'No description'
            } |\n`;
          });
          methodContent += `\n${table}`;
        }
        return methodContent;
      })
      .join('\n');
  }
  return content + '\n---\n';
}

/**
 * Save the generated markdown files to the docs/ directory
 * @param {Array<Object>} docs Array of the documents
 * @param {String} title Title of the markdown file
 * @param {String} filename The name of the file to be saved
 */
function saveDocs(docs, title, filename, description) {
  let content = `# ${title}\n`;
  if (description !== '') {
    content += `> ${description}\n`;
  }
  docs.forEach(doc => {
    content += `\n${generateMarkdown(doc)}\n`;
  });
  fs.writeFile(__dirname + '/../docs/' + filename, content, err => {
    if (err) {
      console.log(`Error saving file`);
    }
  });
}

/**
 * Document the regular js files (the ones that are not react components)
 * @param {Array<string>} files Array of files to document
 * @param {Function} done Callback for when the files have been documented
 */
function documentJs(files, done) {
  documentation
    .build(files, {})
    .then(documentation.formats.md)
    .then(res => {
      // res is the markdown generated for the code
      done(null, res);
    })
    .catch(err => {
      done(err);
    });
}

// Locations that we are going to traverse
const locations = [
  {
    title: 'Components',
    filename: 'components.md',
    directory: 'src/components',
    description:
      'This file describes all the files in the `src/components` directory. These files are reusable components and are mostly design primitives, such as `<Button />` and `<Input />`.',
  },
  {
    title: 'Scenes',
    filename: 'scenes.md',
    directory: 'src/scenes',
    description:
      'This file describes all the files in the `src/scenes` directory. The top-level components in these directory correspond to application routes. For example the <Statistics /> component is mapped to the "/statistics" route. Note that this mapping happens in `src/scenes/index.js`',
  },
];

// Update the sidebar content
fs.readFile(__dirname + '/../docs/_sidebar-template.md', (err, data) => {
  if (err) throw err;
  let sidebarContent = data.toString() + '\n';
  sidebarContent += locations
    .map(
      loc =>
        `  * [${loc.title}](${loc.filename})\n  * [${
          loc.title
        } Stores](${loc.title.toLowerCase() + '_stores.md'})\n`,
    )
    .join('\n');

  fs.writeFile(__dirname + '/../docs/_sidebar.md', sidebarContent, err => {
    if (err) {
      console.log('Error saving _sidebar.md');
    }
  });
});

// Process the docs and then save them as md files in the docs/ directory
locations.forEach(location => {
  docsifyDirectory(location.directory, (err, docs, javascriptFiles) => {
    if (err) throw err;
    saveDocs(docs, location.title, location.filename, location.description);
    documentJs(javascriptFiles, (err, markdown) => {
      if (err) throw err;
      // Check to make sure the file is not empty before saving it
      if (markdown.split('\n').length <= 2) {
        markdown += '\n No stores found.';
      }
      fs.writeFile(
        __dirname + `/../docs/${location.title.toLowerCase()}_stores.md`,
        markdown,
        err => {
          if (err) {
            console.log(err);
          }
        },
      );
    });
  });
});
