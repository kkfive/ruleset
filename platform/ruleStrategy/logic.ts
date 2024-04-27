import { RuleStrategy } from './base'

export class LogicRuleStrategy extends RuleStrategy {
  matches(line: string) {
    const list = ['AND', 'OR', 'NOT']
    return list.some(item => line.startsWith(item))
  }

  getSetName() {
    return 'logicSet'
  }
}
