import { yParser } from '@umijs/utils';
import path from 'path';
import * as logger from '../logger';
import { generateJson } from '../utils';

exports.generate = ({
  cwd,
  args,
}: {
  cwd: string;
  args: yParser.Arguments;
}) => {
  args;
  logger.info('Generating tsconfig.json');
  generateJson(path.join(cwd, 'tsconfig.json'), {
    compilerOptions: {
      target: 'esnext',
      module: 'esnext',
      moduleResolution: 'node',
      importHelpers: true,
      jsx: 'react-jsx',
      esModuleInterop: true,
      sourceMap: true,
      baseUrl: '.',
      strict: true,
      allowSyntheticDefaultImports: true,
      skipLibCheck: true,
      declarationMap: false,
      outDir: './dist',
    },
    include: ['src'],
  });
};
