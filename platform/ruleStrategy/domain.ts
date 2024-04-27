import { RuleStrategy } from './base'

export class DomainRuleStrategy extends RuleStrategy {
  matches(line: string) {
    line = line.trim()
    return line.startsWith('DOMAIN,')
  }

  getSetName() {
    return 'domainSet'
  }
}
