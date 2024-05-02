import { RuleStrategy } from './base'

export class RemarkRuleStrategy extends RuleStrategy {
  matches(line: string) {
    return line.startsWith('#')
  }

  getSetName() {
    return 'remarkSet'
  }
}
