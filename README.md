# salak-cli

[![NPM version][npm-image]][npm-url]
[![David deps][david-image]][david-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/salak-cli.svg?style=flat-square
[npm-url]: https://npmjs.org/package/salak-cli
[david-image]: https://img.shields.io/david/SalakJS/salak-cli.svg?style=flat-square
[david-url]: https://david-dm.org/SalakJS/salak-cli
[download-image]: https://img.shields.io/npm/dm/salak-cli.svg?style=flat-square
[download-url]: https://npmjs.org/package/salak-cli

Scaffolding for [SalakJS](https://github.com/SalakJS/salak).

## Install

```bash
$ npm install -g salak-cli
```

The commands list:

- init: generate a new project from a template
- list: list available templates
- set:  set available variables

## Usage

### init

alias: salak-init

Quick to create project.

```bash
$ salak init [template] [project-name]
$ salak init [template] [project-name] -u # force updating templates
$ salak init -d /template-dir [project-name] # create project from local template
```

### list

List the availabel templates from the official templates or the repo which you set.

alias: salak-list

```bash
$ salak list
$ salak list -u # find from online repo, otherwise find from local cache.
```

### set

alias: salak-set

You can use your templates for replacing official templates，you need to create a repo which like [templates](https://github.com/SalakJS/templates).

```bash
$ salak set repo SalakJS/templates
```

If you use in your private repo, you must remove the git@ and .git, such as:

```bash
$ salak set repo git.xxx:username/repo
```

tip: you must use options '--clone' when you use private repo.

## License

MIT
