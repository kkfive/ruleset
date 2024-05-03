import type { RuleSetNames } from './ruleStrategy/base'
import { ClashWriteStrategy } from './writeStrategy/clash'
import { SurgeWriteStrategy } from './writeStrategy/surge'
import { LoonWriteStrategy } from './writeStrategy/loon'

export class WriteFile {
  private ruleSet: Record<RuleSetNames, Set<string>> = {
    domainSet: new Set(),
    domainSuffixSet: new Set(),
    domainKeywordSet: new Set(),
    domainSetSet: new Set(),
    userAgentSet: new Set(),
    urlRegexSet: new Set(),
    scriptSet: new Set(),
    processNameSet: new Set(),
    logicSet: new Set(),
    remarkSet: new Set(),
    domainListSet: new Set(),
    domainWildcardSet: new Set(),
    ipCidrSet: new Set(),
    unknownSet: new Set(),
    ipASNSet: new Set(),
  }

  private writeStrategy = [
    new SurgeWriteStrategy(),
    new ClashWriteStrategy(),
    new LoonWriteStrategy(),
  ]

  constructor(ruleSet: Record<RuleSetNames, Set<string>>) {
    this.ruleSet = ruleSet
  }

  write(fileName: string) {
    this.writeStrategy.forEach((strategy) => {
      const data = strategy.format(this.ruleSet)
      strategy.write(fileName, data)
    })
  }
}
