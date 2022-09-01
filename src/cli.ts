import assert from 'assert';
import yParser from 'yargs-parser';
import {
  disableGenerator,
  enableGenerator,
  getGenerator,
  queryGenerators,
  registerGenerator,
} from './core';

// gimi
// gimi enable prettier
// gimi disable prettier
async function main() {
  // register generators
  await registerGenerator(require('./generators/prettier').default);

  const args = yParser(process.argv);
  const command = args._[2];
  if (!command) {
    // query
    const generators = await queryGenerators({});
    console.log('test', generators);
    [...generators].forEach(([name, _generator]) => {
      console.log(`- ${name}`);
    });
  } else if (command === 'enable') {
    const name = (args._[3] as string) || null;
    assert(name, 'Missing generator name');
    const generator = await getGenerator(name);
    assert(generator, `Generator ${name} not found`);
    await enableGenerator(generator);
  } else if (command === 'disable') {
    const name = (args._[3] as string) || null;
    assert(name, 'Missing generator name');
    const generator = await getGenerator(name);
    assert(generator, `Generator ${name} not found`);
    await disableGenerator(generator);
  }
}

main().catch((err) => {
  console.error(err);
});
