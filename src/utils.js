const fsExtra = require("fs-extra");
const path = require('path');

exports.generateJson = (filePath, obj) => {
  fsExtra.mkdirpSync(path.dirname(filePath));
  fsExtra.writeJsonSync(filePath, obj, { spaces: 2 });
}
