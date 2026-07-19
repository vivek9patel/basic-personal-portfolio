/** Webpack loader: turn a module into an empty export (used for CopilotKit CSS). */
module.exports = function emptyModuleLoader() {
  this.cacheable && this.cacheable();
  return 'module.exports = {};';
};
