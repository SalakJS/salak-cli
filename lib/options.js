const fs = require('fs')
const path = require('path')
const getGitUser = require('./gitUser')

module.exports = function options (name, dir) {
  const opts = getMetadata(dir)
  setDefault(opts, 'name', name)

  const author = getGitUser()
  if (author) {
    setDefault(opts, 'author', author)
  }

  return opts
}

function getMetadata (dir) {
  const js = path.join(dir, 'meta.js')
  let opts = {}

  if (fs.existsSync(js)) {
    const req = require(path.resolve(js))
    if (req !== Object(req)) {
      throw new Error('meta.js needs to expose an object.')
    }
    opts = req
  }

  return opts
}

function setDefault (opts, key, val) {
  const prompts = opts.prompts || (opts.prompts = {})
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      'type': 'string',
      'default': val
    }
  } else {
    prompts[key]['default'] = val
  }
}
