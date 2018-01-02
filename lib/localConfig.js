module.exports = (file) => {
  try {
    const config = require(file)

    return config
  } catch (err) {}

  return {}
}
