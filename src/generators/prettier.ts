import { defineGenerator } from '../core';

export default defineGenerator({
  name: 'prettier',
  async enable(api) {
    // add prettier as dev dependency
    await api.addDevDependency('prettier', '^2');
    // write prettier config
    await api.write('.prettierrc', ``);
    // write prettier ignore
    await api.write('.prettierignore', ``);
    // add format script to package.json
    await api.addScript('format', 'prettier --write .');
    // run npm/yarn/pnpm install
    await api.install();
  },
  async disable(api) {
    await api.removeDevDependency('prettier');
    await api.remove('.prettierrc');
    await api.remove('.prettierignore');
    await api.removeScript('format');
    await api.install();
  },
  check(api) {
    return !api.hasDevDependencySync('prettier');
  },
});
