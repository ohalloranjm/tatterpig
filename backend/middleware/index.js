const path = require('path');
const fs = require('fs');

// collect and export custom middleware from each subdirectory
fs.readdirSync(__dirname)
  .filter(folderName => !folderName.endsWith('.js'))
  .map(folderName => path.join(__dirname, folderName))
  .forEach(folderPath =>
    fs
      .readdirSync(folderPath)
      .map(fileName => path.join(folderPath, fileName))
      .map(filePath => require(filePath))
      .forEach(({ name, middle }) => (module.exports[name] = middle))
  );
