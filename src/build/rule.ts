import fs from 'node:fs'
import db from '@db/generate/rule'
import { RuleContext } from '@/platform/rule'
import { WriteFile } from '@/platform/write'
import parseRule from '@/parse/rule'

const globalBlack = ['by_sukkaw.skk.moe', 'ruleset.skk.moe', 'RULESET.SKK.MOE']
const fileList = db

async function main() {
  fileList.forEach((fileItem) => {
    const ruleContext = new RuleContext()
    const writeFile = new WriteFile(ruleContext.getAllSets())
    fileItem.includeFiles.forEach((file) => {
      const data = fs.readFileSync(file, 'utf-8')
      const data2 = parseRule('surge-rule-set', data)
      const lines = data2.split('\n')
      lines.forEach((line) => {
        line = line.trim()
        if (!globalBlack.some(s => line.includes(s)))
          ruleContext.processLine(line)
      })
    })
    writeFile.write(`${fileItem.fileName}/${fileItem.fileName}`)
  })
}

main()
