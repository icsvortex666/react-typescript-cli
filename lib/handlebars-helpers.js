const Handlebars = require('handlebars');

Handlebars.registerHelper('capitalize', ({ data: {root: { name } } }) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
});
