import { RuleStrategy } from './base'
import { isRemarkRule } from '@/utils'

export class DomainListRuleStrategy extends RuleStrategy {
  matches(line: string) {
    if (isRemarkRule(line))
      return false

    line = line.trim()
    const strList = line.split(',')
    if (strList.length === 1 && !line.startsWith('DOMAIN,'))
      return true
    return false
  }

  getSetName() {
    return 'domainListSet'
  }
}
