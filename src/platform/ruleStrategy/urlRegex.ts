import { RuleStrategy } from './base'

export class UrlRegexRuleStrategy extends RuleStrategy {
  matches(line: string) {
    return line.startsWith('URL-REGEX,')
  }

  getSetName() {
    return 'urlRegexSet'
  }
}
