export type RuleSetNames = 'domainListSet' | 'domainWildcardSet' | 'domainSet' | 'domainSuffixSet' | 'domainSetSet' | 'domainKeywordSet' | 'ipCidrSet' | 'ipASNSet' | 'userAgentSet' | 'urlRegexSet' | 'scriptSet' | 'processNameSet' | 'logicSet' | 'remarkSet' | 'unknownSet'
// 策略接口
export abstract class RuleStrategy {
  abstract matches(line: string): boolean

  abstract getSetName(): string
}
