import { RuleStrategy } from './base'

export class ProcessNameRuleStrategy extends RuleStrategy {
  matches(line: string) {
    return line.startsWith('PROCESS-NAME')
  }

  getSetName() {
    return 'processNameSet'
  }
}
