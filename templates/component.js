const utils = require('../lib/utils');

getComponentTemplate = (name) => {
  return `import * as React from 'react';
    
import { ${utils.capitalize(name)}Props } from './${utils.capitalize(name)}.interfaces';
    
class ${utils.capitalize(name)} extends React.Component<${utils.capitalize(name)}Props> {
  render() {
    return (
      <>${name.toUpperCase()} COMPONENT</>
    );
  }
}
    
export default ${utils.capitalize(name)};
`
};

module.exports.getComponentTemplate = getComponentTemplate;
