const utils = require('../lib/utils');

getInterfacesTemplate = (componentName, withStyles, withConnect) => {
  return `${withStyles ? `import { WithStyles } from '@material-ui/core';

import { styles } from './${utils.capitalize(componentName)}.styles';

` : ''}` +
    `interface ${utils.capitalize(componentName)}OwnProps {
  // example: string;
}` +
    `${withConnect ? `

export interface StateToPropsInterface {
  // example: string;
}

export interface DispatchToPropsInterface {
  // example: (payload: ExampleActionPayload) => void;
}
` : ''}` +
    ` 
export type ${utils.capitalize(componentName)}Props =` +
    `  ${withStyles ? `
  WithStyles<typeof styles> &` : ''}` +
    `${withConnect ? "\n" : ''}` +
    `  ${withConnect ? `StateToPropsInterface &\n` : ''}` +
    `  ${withConnect ? `DispatchToPropsInterface &` : ''}` +
    `
  ${utils.capitalize(componentName)}OwnProps;
  `
};

module.exports.getInterfacesTemplate = getInterfacesTemplate;
