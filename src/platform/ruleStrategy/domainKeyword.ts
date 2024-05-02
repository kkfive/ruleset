import { RuleStrategy } from './base'

export class DomainKeywordRuleStrategy extends RuleStrategy {
  matches(line: string) {
    return line.startsWith('DOMAIN-KEYWORD,')
  }

  getSetName() {
    return 'domainKeywordSet'
  }
}
