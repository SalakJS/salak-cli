const rm = require('rimraf').sync
const fs = require('fs')
const path = require('path')
const download = require('download-git-repo')
const ora = require('ora')

module.exports = {
  getTemplatePath,
  getTemplatesDesc
}

async function getTemplatePath (repo, tmp, template, useCache, clone) {
  const saveDir = await downloadTemplates(repo, tmp, useCache, clone)

  const templatePath = path.join(saveDir, template)

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Cannot find template: ${template}, you can try [salak-list] to show all templates.`)
  }

  return templatePath
}

async function getTemplatesDesc (repo, tmp, useCache, clone) {
  const saveDir = await downloadTemplates(repo, tmp, useCache, clone)

  const templates = require(path.join(saveDir, 'templates.json'))

  return templates
}

function downloadTemplates (repo, tmp, useCache, clone) {
  const dirname = generateFolderName(repo)
  const saveDir = path.join(tmp, dirname)

  if (fs.existsSync(saveDir)) {
    if (useCache) {
      return saveDir
    }

    rm(saveDir)
  }

  return new Promise((resolve, reject) => {
    const spinner = ora('downloading template')
    spinner.start()

    download(repo, saveDir, { clone }, err => {
      spinner.stop()
      if (err) {
        return reject(new Error(`Failed to download repo ${repo}: ${err.message.trim()}`))
      }

      resolve(saveDir)
    })
  })
}

function generateFolderName (repo = '') {
  let dir
  if (repo.lastIndexOf('/') === -1) {
    dir = repo
  } else {
    dir = repo.slice(repo.lastIndexOf('/') + 1)

    if (dir.indexOf('.') !== -1) {
      dir = dir.slice(0, dir.indexOf('.'))
    }
  }

  if (!dir) {
    // 随机生成一个
    dir = `salak_${Date.now()}`
  }

  return dir
}
