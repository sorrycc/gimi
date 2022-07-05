import kleur from 'kleur';

const prefixes = {
  wait: kleur.cyan('wait') + '  -',
  error: kleur.red('error') + ' -',
  warn: kleur.yellow('warn') + '  -',
  ready: kleur.green('ready') + ' -',
  info: kleur.cyan('info') + '  -',
  event: kleur.magenta('event') + ' -',
  debug: kleur.gray('debug') + ' -',
};

export const wait = (...message: string[]) => {
  console.log(prefixes.wait, ...message);
};

export const error = (...message: string[]) => {
  console.error(prefixes.error, ...message);
};

export const warn = (...message: string[]) => {
  console.warn(prefixes.warn, ...message.map((s) => kleur.yellow(s)));
};

export const ready = (...message: string[]) => {
  console.log(prefixes.ready, ...message);
};

export const info = (...message: string[]) => {
  console.log(prefixes.info, ...message);
};

export const event = (...message: string[]) => {
  console.log(prefixes.event, ...message);
};

export const debug = (...message: string[]) => {
  if (process.env.DEBUG) {
    console.log(prefixes.debug, ...message);
  }
};
