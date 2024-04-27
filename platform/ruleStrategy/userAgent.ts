import { RuleStrategy } from './base'

export class UserAgentRuleStrategy extends RuleStrategy {
  matches(line: string) {
    return line.startsWith('USER-AGENT,')
  }

  getSetName() {
    return 'userAgentSet'
  }
}
