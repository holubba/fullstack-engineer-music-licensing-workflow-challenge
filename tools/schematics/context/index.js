const {
  apply,
  url,
  template,
  move,
  mergeWith,
  chain,
  renameTemplateFiles,
} = require('@angular-devkit/schematics')
const { strings } = require('@angular-devkit/core')

/**
 * @param {{ name: string }} options
 */
function context(options) {
  return (tree, _context) => {
    const sourceTemplates = apply(url('./files'), [
      template({ ...options, ...strings }),
      renameTemplateFiles(), // strips .template → .ts
      move(`src/contexts/${strings.dasherize(options.name)}`), // moves to final folder
    ])

    return mergeWith(sourceTemplates)
  }
}

module.exports = { context }
