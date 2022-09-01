import assert from 'assert';
import { GeneratorApi } from './GeneratorAPI';

const generators = new Map();
// TODO: support config with cli
const cwd = process.cwd();

export interface IGenerator {
  name: string;
  enable: (api: GeneratorApi) => Promise<any>;
  disable: (api: GeneratorApi) => Promise<any>;
  // TODO: use async
  check: (api: GeneratorApi) => Boolean;
}

export async function registerGenerator(generator: IGenerator) {
  const { name } = generator;
  assert(!generators.has(name), `Generator ${name} already registered`);
  generators.set(name, generator);
}

// gimi
// - prettier
// - jest
// - typescript
export async function queryGenerators(opts: {}) {
  opts;
  const generatorApi = new GeneratorApi(cwd);
  // TODO: support async
  return [...generators].filter(([_name, generator]) => {
    return generator.check(generatorApi);
  });
}

// gimi enable prettier
export async function enableGenerator(generator: IGenerator) {
  const generatorApi = new GeneratorApi(cwd);
  await generator.enable(generatorApi);
}

// gimi disable prettier
export async function disableGenerator(generator: IGenerator) {
  const generatorApi = new GeneratorApi(cwd);
  await generator.disable(generatorApi);
}

export async function getGenerator(name: string) {
  return generators.get(name) || null;
}

export function defineGenerator(generator: IGenerator) {
  return generator;
}
