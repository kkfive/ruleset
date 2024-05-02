import { RuleStrategy } from './base'

export class IpASNStrategy extends RuleStrategy {
  matches(line: string) {
    const list = ['IP-ASN']
    return list.some(item => line.startsWith(item))
  }

  getSetName() {
    return 'ipASNSet'
  }
}
