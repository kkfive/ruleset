import fs from 'node:fs'
import { dirname } from 'node:path'
import type { RuleSetNames } from '@/platform/ruleStrategy/base'

export function writeFileSync(path: string, content: string) {
  const dirPath = dirname(path)
  if (!fs.existsSync(dirPath))
    fs.mkdirSync(dirPath, { recursive: true })

  fs.writeFileSync(path, content)
}
export function convertedData(originalData: Record<RuleSetNames, Set<string>>): Record<RuleSetNames, Array<string>> {
  return Object.fromEntries(Object.entries(originalData).map(([key, set]) => [key, Array.from(set)])) as Record<RuleSetNames, Array<string>>
}

export function isRemarkRule(str: string) {
  const list = ['#', ';']
  return list.some(item => str.includes(item))
}

export function getHeader(data: Array<string>, title: string, content: string = '') {
  return `#########################################
# DreamyTZK's ${title}
# Last Updated: ${new Date().toISOString()}
# Size: ${data.length}
# ${content}
#########################################`
}
