
const loaderUtils =  require('loader-utils');

module.exports = function loader(source) {  
  const options = loaderUtils.getOptions(this);
  source = source.replace(/\[name\]/g, options.name);
  console.log('options:   ', options)
  console.log('source:   ',source)
  return `${ JSON.stringify(source) }`;
};