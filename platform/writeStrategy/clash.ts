import type { RuleSetNames } from '../ruleStrategy/base'
import { BaseRuleStrategy } from './base'
import { convertedData, getHeader, writeFileSync } from '@/utils'
import { CONF } from '@/config'

export class ClashWriteStrategy extends BaseRuleStrategy {
  outputDir = CONF.outputDir

  getName() {
    return 'clash'
  }

  format(set: Record<RuleSetNames, Set<string>>): Record<RuleSetNames, string[]> {
    const data = convertedData(set)
    return data
  }

  write(fileName: string, ruleSet: Record<RuleSetNames, string[]>): void {
    this.writeDomainRule(fileName, ruleSet)
    this.writeNoIpRule(fileName, ruleSet)
    this.writeProcessNameRule(fileName, ruleSet)
    this.writeUnknownRule(fileName, ruleSet)
    this.writeIpNoResolveRule(fileName, ruleSet)
    this.writeIpResolveRule(fileName, ruleSet)
  }

  writeDomainRule(fileName: string, ruleSet: Record<RuleSetNames, string[]>): void {
    const platform = this.getName()
    const data = [...ruleSet.domainListSet].map(item => item.startsWith('.') ? `+${item}` : item)
    const header = getHeader(data, 'Domain Rule')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_domain.list`, `${header}\n${data.join('\n').trim()}`)
  }

  writeNoIpRule(fileName: string, ruleSet: Record<RuleSetNames, string[]>): void {
    const platform = this.getName()
    // const { remarkSet, ipCidrSet, domainListSet, unknownSet, processNameSet, logicSet, scriptSet, urlRegexSet, ...rest } = ruleSet
    const data = [...ruleSet.domainSetSet, ...ruleSet.domainSuffixSet, ...ruleSet.domainKeywordSet].flat()
    const header = getHeader(data, 'No IP RuleSet')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_no_ip_rule.list`, `${header}\n${data.join('\n').trim()}`)
  }

  writeProcessNameRule(fileName: string, ruleSet: Record<RuleSetNames, string[]>): void {
    const platform = this.getName()
    const data = [...ruleSet.processNameSet]
    const header = getHeader(data, 'Process Name Rule', 'Only available on Desktop')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_process_name.list`, `${header}\n${data.join('\n').trim()}`)
  }

  writeUnknownRule(fileName: string, ruleSet: Record<RuleSetNames, string[]>): void {
    const platform = this.getName()
    const data = [...ruleSet.unknownSet]
    const header = getHeader(data, 'Unknown Rule', 'Here\'s something unexpected. If he exists, please report back.')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_unknown.list`, `${header}\n${data.join('\n').trim()}`)
  }

  writeIpNoResolveRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>) {
    const platform = this.getName()
    const data
    = [...ruleSet.ipCidrSet]
      .map((str) => {
        if (str.includes('no-resolve'))
          return str
        const regex = /([^#;]*)(#|;)/
        const match = str.match(regex)
        if (match) {
          const [, prefix, suffix] = match
          return `${prefix},no-resolve${suffix}`
        }
        else {
          return `${str},no-resolve`
        }
      })
    const header = getHeader(data, 'IP Rule', 'No Resolve')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_ip_rule_no_resolve.list`, `${header}\n${data.join('\n').trim()}`)
  }

  writeIpResolveRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>) {
    const platform = this.getName()
    const data
    = [...ruleSet.ipCidrSet]
      .map((str) => {
        if (str.includes('no-resolve'))
          return str.replace(/\s*,\s*no-resolve\s*/g, '')
        return str
      })
    const header = getHeader(data, 'IP Rule', 'Resolve')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_ip_rule.list`, `${header}\n${data.join('\n').trim()}`)
  }
}
