import { yParser } from '@umijs/utils';
import fs from 'fs';
import path from 'path';

exports.run = ({ cwd, args }: { cwd: string; args: yParser.Arguments }) => {
  const generator = args._[1];
  const generatorFile = path.join(__dirname, 'generators', generator);
  if (fs.existsSync(generatorFile)) {
    require(generatorFile).generate({ cwd, args });
  }
};
