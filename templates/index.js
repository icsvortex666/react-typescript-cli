const utils = require('../lib/utils');

getIndexTemplate = (componentName, withContainer) => {
  return `${!withContainer ? `export { default as ${utils.capitalize(componentName)} } from './${utils.capitalize(componentName)}';\n` : ''}` +
    `${withContainer ? `export { default as ${utils.capitalize(componentName)} } from './${utils.capitalize(componentName)}.container';\n` : ''}`;
};

module.exports.getIndexTemplate = getIndexTemplate;
