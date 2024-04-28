import type { RuleSetNames, RuleStrategy } from './ruleStrategy/base'
import { DomainListRuleStrategy } from './ruleStrategy/domainList'
import { DomainRuleStrategy } from './ruleStrategy/domain'
import { DomainSuffixRuleStrategy } from './ruleStrategy/domainSuffix'
import { DomainKeywordRuleStrategy } from './ruleStrategy/domainKeyword'
import { DomainSetRuleStrategy } from './ruleStrategy/domainSet'
import { DomainWildcardRuleStrategy } from './ruleStrategy/domainWildcard'
import { IpRuleStrategy } from './ruleStrategy/ip'
import { LogicRuleStrategy } from './ruleStrategy/logic'
import { ProcessNameRuleStrategy } from './ruleStrategy/processName'
import { RemarkRuleStrategy } from './ruleStrategy/remark'
import { ScriptRuleStrategy } from './ruleStrategy/script'
import { UrlRegexRuleStrategy } from './ruleStrategy/urlRegex'
import { UserAgentRuleStrategy } from './ruleStrategy/userAgent'
import { IpASNStrategy } from './ruleStrategy/ipASN'

// 上下文类
export class RuleContext {
  private strategies: RuleStrategy[]
  private sets: Record<RuleSetNames, Set<string>>

  constructor() {
    this.strategies = [
      // 纯域名 一行一个域名 => domainListSet
      new DomainListRuleStrategy(),
      // DOMAIN,www.baidu.com => domainSet
      new DomainRuleStrategy(),
      new DomainSuffixRuleStrategy(),
      new DomainSetRuleStrategy(),
      new DomainKeywordRuleStrategy(),
      new DomainWildcardRuleStrategy(),
      new IpRuleStrategy(),
      new IpASNStrategy(),
      new UserAgentRuleStrategy(),
      new UrlRegexRuleStrategy(),
      new ScriptRuleStrategy(),
      new ProcessNameRuleStrategy(),
      new LogicRuleStrategy(),
      new RemarkRuleStrategy(),

    ]
    this.sets = {
      domainListSet: new Set(),
      domainSet: new Set(),
      domainSuffixSet: new Set(),
      domainSetSet: new Set(),
      domainKeywordSet: new Set(),
      domainWildcardSet: new Set(),
      ipCidrSet: new Set(),
      ipASNSet: new Set(),
      userAgentSet: new Set(),
      urlRegexSet: new Set(),
      scriptSet: new Set(),
      processNameSet: new Set(),
      logicSet: new Set(),
      remarkSet: new Set(),
      unknownSet: new Set(),
    }
  }

  processLine(line: string) {
    const matchedStrategy = this.strategies.find(strategy => strategy.matches(line))
    if (matchedStrategy) {
      const setName = matchedStrategy.getSetName() as RuleSetNames
      if (!this.sets[setName])
        this.sets[setName] = new Set()

      this.sets[setName].add(line)
    }
    else {
      this.sets.unknownSet.add(line)
    }
  }

  getAllSets() {
    return this.sets
  }
}
