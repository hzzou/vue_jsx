const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appBuild:resolveApp('build'),
  appPublic:resolveApp('public'),
  appMain:resolveApp('src/main.js'),
  appHtml:resolveApp('public/index.html')
}
