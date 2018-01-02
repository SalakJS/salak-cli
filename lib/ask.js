const inquirer = require('inquirer')

module.exports = ask

async function ask (prompts) {
  const data = {}
  for (let key in prompts) {
    const prompt = prompts[key]

    const answers = await inquirer.prompt({
      type: prompt.type,
      name: key,
      message: prompt.message || key,
      default: prompt.default,
      choices: prompt.choices || [],
      validate: prompt.validate || (() => true)
    })

    if (Array.isArray(answers[key])) {
      // 处理多选
      answers[key].forEach((item) => {
        data[key][item] = true
      })
    } else {
      data[key] = answers[key]
    }
  }

  return data
}
