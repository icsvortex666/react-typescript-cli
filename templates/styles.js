getStylesTemplate = () => {
  return `import { createStyles, Theme } from '@material-ui/core';

export const styles = ({}: Theme) =>
  createStyles({});
`
};

module.exports.getStylesTemplate = getStylesTemplate;
