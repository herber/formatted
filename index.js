const prettier = require('prettier');
const fs = require('fs');
const path = require('path');
const globby = require('globby');
const only = require('only');

exports.help = () => {
  console.log(`
formatted [path] [options]

Options:
  -h --help          Print help
  -v --version       Print version

Examples:
  Format current working directory:
    formatted

  Format other directory:
    formatted ./my-project
		`);
};

exports.format = (path, config) => {
  config = only(
    config,
    'semi printWidth tabWidth useTabs singleQuote trailingComma bracketSpacing'
  );

  const code = fs.readFileSync(path).toString();
  const result = formatPrettier(code, config);

  fs.writeFileSync(path, result);
};

const formatPrettier = (code, config) => {
  const result = prettier.format(
    code,
    Object.assign(
      {
        semi: true,
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true
      },
      config
    )
  );

  return result;
};

exports.files = async (path, matches) => {
  return await globby(matches, { cwd: path, absolute: true });
};

exports.fullPath = p => {
  if (!path.isAbsolute(p)) {
    return path.join(process.cwd(), p);
  }

  return p;
};
