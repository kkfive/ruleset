import type { RuleSetNames } from '../ruleStrategy/base'

export abstract class BaseRuleStrategy {
  abstract getName(): string
  abstract format(set: Record<RuleSetNames, Set<string>>): Record<RuleSetNames, Array<string>>
  // abstract getHeader(data: Array<string>): string
  abstract write(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>): void
  /**
   * @description 写入纯域名规则
   */
  abstract writeDomainRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>): void
  /**
   * @description 写入不包含 IP类 进程类 未知类 的规则
   */
  abstract writeNoIpRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>): void
  /**
   * @description 写入进程类规则
   */
  abstract writeProcessNameRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>): void
  /**
   * @description 写入未知规则
   */
  abstract writeUnknownRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>): void
  /**
   * @description 写入 IP类 不解析域名规则
   */
  abstract writeIpNoResolveRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>): void
  /**
   * @description 写入 IP类 解析域名规则
   */
  abstract writeIpResolveRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>): void
}
