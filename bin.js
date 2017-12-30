#!/usr/bin/env node

const mri = require('mri');
const ora = require('ora');
const fs = require('fs');
const cosmiconfig = require('cosmiconfig')('formatted');

const { help, fullPath, files, format } = require('./');

let ok = true;

const parsed = mri(process.argv.slice(2), {
  boolean: ['version', 'help'],
  alias: { version: 'v', help: 'h' },
  unknown: () => {
    ok = false;
    help();
  }
});

const main = async () => {
  const spinner = ora('Formating').start();

  try {
    const path = fullPath(parsed['_'][0] || process.cwd());
    let config = {};
    try {
      const c = await cosmiconfig.load(path);
      config = c.config;
    } catch (err) {}

    if (!fs.existsSync(path)) {
      throw new Error('Path does not exist');
    }

    let glob = ['**/**.js', '**/**.jsx', '**/**.ts', '!node_modules/**'];

    if (config != null) {
      if (config.ignore != null) {
        for (c of config.ignore) {
          glob.push(`!${c}`);
        }
      }
    }

    const f = await files(path, glob);

    for (file of f) {
      format(file, config);
    }

    spinner.succeed('Formatted');
  } catch (err) {
    spinner.fail(err);
  }
};

if (ok) {
  if (parsed.v) {
    const pkg = require('./package.json');
    console.log(pkg.version);
  } else if (parsed.h) {
    help();
  } else {
    main();
  }
}
