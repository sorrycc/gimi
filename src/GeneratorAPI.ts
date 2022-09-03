import assert from 'assert';
import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import type { $ } from 'zx';

// TODO: add logger for each API
export class GeneratorApi {
  public cwd: string;
  // @ts-ignore
  public $: typeof $;
  public pkgPath: string;

  constructor(cwd: string) {
    this.cwd = cwd;
    this.pkgPath = join(cwd, 'package.json');
    assert(existsSync(this.pkgPath), `package.json not found`);
    // (await import('zx')).$
    // this.$ = $;
  }

  // TODO: 支持权限
  // TODO: 支持非文本文件
  async write(filePath: string, content: string) {
    const absFilePath = join(this.cwd, filePath);
    assert(!existsSync(absFilePath), `File ${filePath} already exists`);
    writeFileSync(absFilePath, content, 'utf-8');
  }

  async remove(filePath: string) {
    const absFilePath = join(this.cwd, filePath);
    if (existsSync(absFilePath)) {
      rmSync(absFilePath);
    }
  }

  async addScript(name: string, content: string) {
    const pkg = this.getPkg();
    pkg.scripts = pkg.scripts || {};
    assert(!pkg.scripts[name], `Script ${name} already exists`);
    pkg.scripts[name] = content;
    this.writePkg(pkg);
  }

  async removeScript(name: string) {
    const pkg = this.getPkg();
    if (pkg.scripts) {
      delete pkg.scripts[name];
    }
    this.writePkg(pkg);
  }

  async addDependency(name: string, version: string) {
    const pkg = this.getPkg();
    pkg.dependencies = pkg.dependencies || {};
    assert(!pkg.dependencies[name], `Dependency ${name} already exists`);
    pkg.dependencies[name] = version;
    this.writePkg(pkg);
  }

  async hasDependency(name: string) {
    const pkg = this.getPkg();
    return pkg.dependencies && pkg.dependencies[name];
  }

  async hasDevDependency(name: string) {
    const pkg = this.getPkg();
    return pkg.devDependencies && pkg.devDependencies[name];
  }

  hasDevDependencySync(name: string) {
    const pkg = this.getPkg();
    return pkg.devDependencies && pkg.devDependencies[name];
  }

  async addDevDependency(name: string, version: string) {
    const pkg = this.getPkg();
    pkg.devDependencies = pkg.devDependencies || {};
    assert(!pkg.devDependencies[name], `Dev dependency ${name} already exists`);
    pkg.devDependencies[name] = version;
    this.writePkg(pkg);
  }

  async removeDependency(name: string) {
    const pkg = this.getPkg();
    if (pkg.dependencies) {
      delete pkg.dependencies[name];
    }
    this.writePkg(pkg);
  }

  async removeDevDependency(name: string) {
    const pkg = this.getPkg();
    if (pkg.devDependencies) {
      delete pkg.devDependencies[name];
    }
    this.writePkg(pkg);
  }

  async install() {
    // TODO: 检测 npm client
    const { $ } = await import('zx');
    await $`pnpm i`;
  }

  private getPkg() {
    return JSON.parse(readFileSync(this.pkgPath, 'utf-8'));
  }

  private writePkg(pkg: any) {
    writeFileSync(this.pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');
  }
}
