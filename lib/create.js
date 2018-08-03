const path = require('path');
const fs = require('fs-extra');

const componentTemplate = require("../templates/component");
const containerTemplate = require("../templates/container");
const indexTemplate = require("../templates/index");
const interfacesTemplate = require("../templates/interfaces");
const stylesTemplate = require("../templates/styles");

const utils = require('./utils');

createComponent = (name, options) => {
  const root = path.resolve(utils.capitalize(name));

  const withStyles = options.styles;
  const withConnect = options.connect;

  if (fs.existsSync(root)) {
    console.log(`${name} component directory already exists`);
  } else {
    fs.mkdirSync(root);

    if (withStyles && withConnect) {
      createIndexFile(name, true);
      createComponentFile(name, true, true);
      createContainerFile(name, true, true);
      createInterfacesFile(name, true, true);
      createStylesFile(name);
    } else if (withStyles && !withConnect) {
      createIndexFile(name, true);
      createComponentFile(name, true, false);
      createContainerFile(name, true, false);
      createInterfacesFile(name, true, false);
      createStylesFile(name);
    } else if (!withStyles && withConnect) {
      createIndexFile(name, true);
      createComponentFile(name, false, true);
      createContainerFile(name, false, true);
      createInterfacesFile(name, false, true);
    } else {
      createIndexFile(name, false);
      createComponentFile(name, false, false);
      createInterfacesFile(name, false, false);
    }

    console.log(`Component ${name} created`);
  }
};

function createComponentFile(componentName) {
  const root = path.resolve(utils.capitalize(componentName));

  fs.writeFileSync(
    path.join(root, `${utils.capitalize(componentName)}.tsx`),
    componentTemplate.getComponentTemplate(componentName)
  )
}

function createContainerFile(componentName, withStyles, withConnect) {
  const root = path.resolve(utils.capitalize(componentName));

  fs.writeFileSync(
    path.join(root, `${utils.capitalize(componentName)}.container.ts`),
    containerTemplate.getContainerTemplate(componentName, withStyles, withConnect)
  )
}

function createIndexFile(componentName, withContainer) {
  const root = path.resolve(utils.capitalize(componentName));

  fs.writeFileSync(
    path.join(root, `index.ts`),
    indexTemplate.getIndexTemplate(componentName, withContainer)
  )
}

function createInterfacesFile(componentName, withStyles, withConnect) {
  const root = path.resolve(utils.capitalize(componentName));

  fs.writeFileSync(
    path.join(root, `${utils.capitalize(componentName)}.interfaces.ts`),
    interfacesTemplate.getInterfacesTemplate(componentName, withStyles, withConnect)
  )
}

function createStylesFile(componentName) {
  const root = path.resolve(utils.capitalize(componentName));

  fs.writeFileSync(
    path.join(root, `${utils.capitalize(componentName)}.styles.ts`),
    stylesTemplate.getStylesTemplate()
  )
}

module.exports.createComponent = createComponent;
