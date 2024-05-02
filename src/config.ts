import path from 'node:path'

export const CONF = {
  ownName: 'DreamyTZK',
  ownRepo: 'DreamyTZK/ruleset',
  outputDir: path.join(__dirname, `/../dist`),
  sgModuleOutPutDir: path.join(__dirname, `/../dist/surge/module`),

  ruleStoragePath: path.join(__dirname, `/../storage/rule`),
  moduleStoragePath: path.join(__dirname, `/../storage/module`),

}
