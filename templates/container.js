const utils = require('../lib/utils');

getContainerTemplate = (componentName, withStyles, withConnect) => {
  return `${withConnect ? "import { connect, Dispatch } from 'react-redux';" : ''}` +
    `${withStyles && withConnect ? "\n" : ''}` +
    `${withStyles ? "import { withStyles } from '@material-ui/core';" : ''}` +
    `${withStyles || withConnect ? "\n\n" : ''}` +
    `import ${utils.capitalize(componentName)} from './${utils.capitalize(componentName)}';` +
    `${withConnect ? "\nimport { RootState } from 'store/rootReducer';" : ''}` +
    `${withStyles ? `\nimport { styles } from './${utils.capitalize(componentName)}.styles';` : ''}` +
    `${withConnect ? "\nimport {\n" +
      "  DispatchToPropsInterface,\n" +
      "  StateToPropsInterface\n" +
      `} from './${utils.capitalize(componentName)}.interfaces';` +
      "\n\nconst mapStateToProps = (state: RootState) => ({\n" +
      "  // example: getExample(state)\n" +
      "});\n" +
      "\n" +
      "const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({\n" +
      "  // example: (payload: ExampleActionPayload) => dispatch(exampleAction(payload))\n" +
      "});\n\n" : ''}` +
    `${withConnect && withStyles ? `const ${utils.capitalize(componentName)}Container =\n` +
      '  connect<StateToPropsInterface,\n' +
      '    DispatchToPropsInterface>(mapStateToProps, mapDispatchToProps)(\n' +
      '    withStyles(styles)(\n' +
      `      ${utils.capitalize(componentName)}\n` +
      '    )\n' +
      '  )\n' +
      ';' : ''}` +
    `${withConnect && !withStyles ? `const ${utils.capitalize(componentName)}Container =\n` +
      '  connect<StateToPropsInterface,\n' +
      '    DispatchToPropsInterface>(mapStateToProps, mapDispatchToProps)(\n' +
      `    ${utils.capitalize(componentName)}\n` +
      '  )\n' +
      ';' : ''}` +
    `${!withConnect && withStyles ? `
    
const ${utils.capitalize(componentName)}Container =
  withStyles(styles)(
    ${utils.capitalize(componentName)}
  )
;` : ''}` +
    `${!withConnect && !withStyles ? `
    
const ${utils.capitalize(componentName)}Container =
  ${utils.capitalize(componentName)}
;` : ''}` +
    `
    
export default ${utils.capitalize(componentName)}Container;
`
};

module.exports.getContainerTemplate = getContainerTemplate;
