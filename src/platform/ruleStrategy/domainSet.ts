import { RuleStrategy } from './base'

export class DomainSetRuleStrategy extends RuleStrategy {
  matches(line: string) {
    return line.startsWith('DOMAIN-SET,')
  }

  getSetName() {
    return 'domainSetSet'
  }
}
