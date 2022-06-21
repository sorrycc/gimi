const path = require('path');
const logger = require('../logger');
const { generateJson } = require("../utils");

exports.generate = ({ cwd, args }) => {
  logger.info('Generating tsconfig.json');
  generateJson(path.join(cwd, 'tsconfig.json'), {
    "compilerOptions": {
      "target": "esnext",
      "module": "esnext",
      "moduleResolution": "node",
      "importHelpers": true,
      "jsx": "react-jsx",
      "esModuleInterop": true,
      "sourceMap": true,
      "baseUrl": ".",
      "strict": true,
      "allowSyntheticDefaultImports": true,
      "skipLibCheck": true,
      "declarationMap": false,
      "outDir": "./dist"
    },
    "include": ["src"]
  });
}
