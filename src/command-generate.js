const path = require('path');
const fs = require('fs');

exports.run = ({ cwd, args }) => {
  const generator = args._[1];
  const generatorFile = path.join(__dirname, 'generators', generator);
  if (fs.existsSync(generatorFile)) {
    require(generatorFile).generate({ cwd, args });
  }
}
