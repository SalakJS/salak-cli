const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const chalk = require('chalk')
const Handlebars = require('handlebars')
const getOptions = require('./options')
const ask = require('./ask')

module.exports = generate

async function generate (name, src, dest) {
  const opts = getOptions(name, src)
  const { prompts, helpers } = opts
  const data = await ask(prompts)

  if (helpers) {
    Object.keys(helpers).map((key) => {
      Handlebars.registerHelper(key, helpers[key])
    })
  }

  // 开始渲染模板
  const source = path.join(src, 'template')
  console.log()
  readFileAndRender(source, dest, data, dest)
  console.log()
}

function readFileAndRender (dir, dest, data, destDir) {
  const files = fs.readdirSync(dir)

  fse.ensureDirSync(dest)
  for (let file of files) {
    const state = fs.statSync(path.join(dir, file))
    let filename = file

    if (/{{([^{}]+)}}/g.test(file)) {
      filename = Handlebars.compile(file)(data) || file
    }

    if (state.isDirectory()) {
      console.log(chalk.cyan('  generate: ') + chalk.blue(path.relative(destDir, path.join(dest, filename))))
      fse.ensureDirSync(path.join(dest, filename))
      readFileAndRender(path.join(dir, file), path.join(dest, filename), data, destDir)
    } else {
      const html = fs.readFileSync(path.join(dir, file)).toString('utf-8')

      if (/{{([^{}]+)}}/g.test(html)) {
        const template = Handlebars.compile(html)

        fs.writeFileSync(path.join(dest, filename), template(data), {
          mode: state.mode
        })
      } else {
        fs.writeFileSync(path.join(dest, filename), html, {
          mode: state.mode
        })
      }

      console.log(chalk.cyan('  generate: ') + chalk.blue(path.relative(destDir, path.join(dest, filename))))
    }
  }
}
