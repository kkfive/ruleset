import { RuleStrategy } from './base'

export class IpRuleStrategy extends RuleStrategy {
  matches(line: string) {
    // 'GEOIP', 'IP-ASN'
    const list = ['IP-CIDR', 'IP-CIDR6']
    return list.some(item => line.startsWith(item))
  }

  getSetName() {
    return 'ipCidrSet'
  }
}
