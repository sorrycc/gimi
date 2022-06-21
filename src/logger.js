const kleur = require('kleur');

const prefixes = {
  wait: kleur.cyan('wait') + '  -',
  error: kleur.red('error') + ' -',
  warn: kleur.yellow('warn') + '  -',
  ready: kleur.green('ready') + ' -',
  info: kleur.cyan('info') + '  -',
  event: kleur.magenta('event') + ' -',
  debug: kleur.gray('debug') + ' -',
};

exports.wait = (...message) => {
  console.log(prefixes.wait, ...message);
}

exports.error = (...message) => {
  console.error(prefixes.error, ...message);
}

exports.warn = (...message) => {
  console.warn(prefixes.warn, ...message.map((s) => kleur.yellow(s)));
}

exports.ready = (...message) => {
  console.log(prefixes.ready, ...message);
}

exports.info = (...message) => {
  console.log(prefixes.info, ...message);
}

exports.event = (...message) => {
  console.log(prefixes.event, ...message);
}

exports.debug = (...message) => {
  if (process.env.DEBUG) {
    console.log(prefixes.debug, ...message);
  }
}
