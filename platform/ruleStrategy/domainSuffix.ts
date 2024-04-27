import { RuleStrategy } from './base'

export class DomainSuffixRuleStrategy extends RuleStrategy {
  matches(line: string) {
    return line.startsWith('DOMAIN-SUFFIX,')
  }

  getSetName() {
    return 'domainSuffixSet'
  }
}
