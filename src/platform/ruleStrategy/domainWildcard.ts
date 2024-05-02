import { RuleStrategy } from './base'

export class DomainWildcardRuleStrategy extends RuleStrategy {
  matches(line: string) {
    return line.startsWith('DOMAIN-WILDCARD,')
  }

  getSetName() {
    return 'domainWildcardSet'
  }
}
