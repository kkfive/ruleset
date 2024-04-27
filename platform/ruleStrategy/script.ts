import { RuleStrategy } from './base'

export class ScriptRuleStrategy extends RuleStrategy {
  matches(line: string) {
    return line.startsWith('SCRIPT,')
  }

  getSetName() {
    return 'scriptSet'
  }
}
