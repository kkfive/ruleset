import type { RuleSetNames } from '../ruleStrategy/base'
import { BaseRuleStrategy } from './base'
import { CONF } from '@/config'
import { convertedData, writeFileSync } from '@/utils'

export class SingBoxWriteStrategy extends BaseRuleStrategy {
  outputDir = CONF.outputDir

  getName() {
    return 'singbox'
  }

  format(set: Record<RuleSetNames, Set<string>>): Record<RuleSetNames, Array<string>> {
    const data = convertedData(set)
    return data
  }

  write(fileName: string, ruleSet: Record<RuleSetNames, string[]>): void {
    const data = {
      version: 2,
      rules: [
        {
          domain: ruleSet.domainSet.map(i => i.replace('DOMAIN,', '')),
          domain_suffix: ruleSet.domainSuffixSet.map(i => i.replace('DOMAIN-SUFFIX,', '')),
          domain_keyword: ruleSet.domainKeywordSet.map(i => i.replace('DOMAIN-KEYWORD,', '')),
          process_name: ruleSet.processNameSet.map(i => i.replace('PROCESS-NAME,', '')),
          domain_regex: ruleSet.urlRegexSet.map(i => i.replace('URL-REGEX,', '')),
        },
      ],
    }
    const platform = this.getName()
    // const header = getHeader( 'singbox Rule', '')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_rule.json`, JSON.stringify(data, null, 2))
  }

  writeDomainRule(_fileName: string, _ruleSet: Record<RuleSetNames, Array<string>>): void {
  }

  writeIpNoResolveRule(_fileName: string, _ruleSet: Record<RuleSetNames, Array<string>>): void {
  }

  writeIpResolveRule(_fileName: string, _ruleSet: Record<RuleSetNames, Array<string>>): void {
  }

  writeNoIpRule(_fileName: string, _ruleSet: Record<RuleSetNames, Array<string>>): void {
  }

  writeProcessNameRule(_fileName: string, _ruleSet: Record<RuleSetNames, Array<string>>): void {
  }

  writeUnknownRule(_fileName: string, _ruleSet: Record<RuleSetNames, Array<string>>): void {
  }
}
