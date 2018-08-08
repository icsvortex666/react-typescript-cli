const path = require('path');
const fs = require('fs-extra');

const utils = require('./utils');
const Handlebars = require('handlebars');

require('./handlebars-helpers');

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
  const filepath = path.join(path.join(__dirname, '..', 'templates'), 'component.hbs');
  const template = fs.readFileSync(filepath, 'utf8');

  fs.writeFileSync(
    path.join(root, `${utils.capitalize(componentName)}.tsx`),
    Handlebars.compile(template)({
      name: componentName
    })
  )
}

function createContainerFile(componentName, withStyles, withConnect) {
  const root = path.resolve(utils.capitalize(componentName));
  const filepath = path.join(path.join(__dirname, '..', 'templates'), 'container.hbs');
  const template = fs.readFileSync(filepath, 'utf8');

  fs.writeFileSync(
    path.join(root, `${utils.capitalize(componentName)}.container.ts`),
    Handlebars.compile(template)({
      name: componentName,
      withConnect,
      withStyles,
      withStylesOrConnect: withStyles || withConnect,
      withStylesAndConnect: withStyles && withConnect,
      withOnlyStyles: withStyles && !withConnect,
      withOnlyConnect: !withStyles && withConnect,
      withoutConnectAndStyles: !withStyles && !withConnect
    })
  )
}

function createIndexFile(componentName, withContainer) {
  const root = path.resolve(utils.capitalize(componentName));
  const filepath = path.join(path.join(__dirname, '..', 'templates'), 'index.hbs');
  const template = fs.readFileSync(filepath, 'utf8');

  fs.writeFileSync(
    path.join(root, `index.ts`),
    Handlebars.compile(template)({
      name: componentName,
      withContainer
    })
  )
}

function createInterfacesFile(componentName, withStyles, withConnect) {
  const root = path.resolve(utils.capitalize(componentName));
  const filepath = path.join(path.join(__dirname, '..', 'templates'), 'interfaces.hbs');
  const template = fs.readFileSync(filepath, 'utf8');

  fs.writeFileSync(
    path.join(root, `${utils.capitalize(componentName)}.interfaces.ts`),
    Handlebars.compile(template)({
      name: componentName,
      withStyles,
      withConnect
    })
  )
}

function createStylesFile(componentName) {
  const root = path.resolve(utils.capitalize(componentName));
  const filepath = path.join(path.join(__dirname, '..', 'templates'), 'styles.hbs');
  const template = fs.readFileSync(filepath, 'utf8');

  fs.writeFileSync(
    path.join(root, `${utils.capitalize(componentName)}.styles.ts`),
    Handlebars.compile(template)({
      name: componentName
    })
  )
}

module.exports.createComponent = createComponent;
