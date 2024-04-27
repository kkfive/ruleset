import { getHostname } from 'tldts'
import type { RuleSetNames } from '../ruleStrategy/base'
import { BaseRuleStrategy } from './base'
import { CONF } from '@/config'
import { convertedData, getHeader, writeFileSync } from '@/utils'

export class SurgeWriteStrategy extends BaseRuleStrategy {
  outputDir = CONF.outputDir

  getName() {
    return 'surge'
  }

  format(set: Record<RuleSetNames, Set<string>>): Record<RuleSetNames, Array<string>> {
    const data = convertedData(set)
    return data
  }

  write(fileName: string, ruleSet: Record<RuleSetNames, string[]>): void {
    this.writeDomainRule(fileName, ruleSet)
    this.writeNoIpRule(fileName, ruleSet)
    this.writeProcessNameRule(fileName, ruleSet)
    this.writeUnknownRule(fileName, ruleSet)
    this.writeIpNoResolveRule(fileName, ruleSet)
    this.writeIpResolveRule(fileName, ruleSet)
    this.writeIpASNNoResolveRule(fileName, ruleSet)
    this.writeIpASNResolveRule(fileName, ruleSet)
    this.writeMITMModeRule(fileName, ruleSet)
  }

  writeDomainRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>) {
    const platform = this.getName()
    const data = [...ruleSet.domainListSet]
    const header = getHeader(data, 'Domain Rule', '')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_domain.list`, `${header}\n${data.join('\n').trim()}`)
  }

  writeNoIpRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>) {
    const platform = this.getName()
    const { remarkSet, ipCidrSet, ipASNSet, domainListSet, unknownSet, processNameSet, ...rest } = ruleSet
    const data = [...Object.values(rest)].flat()
    const header = getHeader(data, 'No IP Rule', '')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_no_ip_rule.list`, `${header}\n${data.join('\n').trim()}`)
  }

  writeProcessNameRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>) {
    const platform = this.getName()
    const data = [...ruleSet.processNameSet]
    const header = getHeader(data, 'Process Name Rule', 'Only available on macOS')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_process_name.list`, `${header}\n${data.join('\n').trim()}`)
  }

  writeUnknownRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>) {
    const platform = this.getName()
    const data = [...ruleSet.unknownSet]
    const header = getHeader(data, 'Unknown Rule', `Here's something unexpected. If he exists, please report back.`)
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_unknown.list`, `${header}\n${data.join('\n').trim()}`)
  }

  writeIpNoResolveRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>) {
    const platform = this.getName()
    const data
    = [...ruleSet.ipCidrSet]
      .map((str) => {
        if (str.includes('no-resolve'))
          return str
        const regex = /([^#;]*)(#|;)/
        const match = str.match(regex)
        if (match) {
          const [, prefix, suffix] = match
          return `${prefix},no-resolve${suffix}`
        }
        else {
          return `${str},no-resolve`
        }
      })
    const header = getHeader(data, 'IP Rule', 'No Resolve')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_ip_rule_no_resolve.list`, `${header}\n${data.join('\n').trim()}`)
  }

  writeIpResolveRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>) {
    const platform = this.getName()
    const data
    = [...ruleSet.ipCidrSet]
      .map((str) => {
        if (str.includes('no-resolve'))
          return str.replace(/\s*,\s*no-resolve\s*/g, '')
        return str
      })
    const header = getHeader(data, 'IP Rule', 'Resolve')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_ip_rule.list`, `${header}\n${data.join('\n').trim()}`)
  }

  writeIpASNNoResolveRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>) {
    const platform = this.getName()
    const data
    = [...ruleSet.ipASNSet]
      .map((str) => {
        if (str.includes('no-resolve'))
          return str
        const regex = /([^#;]*)(#|;)/
        const match = str.match(regex)
        if (match) {
          const [, prefix, suffix] = match
          return `${prefix},no-resolve${suffix}`
        }
        else {
          return `${str},no-resolve`
        }
      })
    const header = getHeader(data, 'IP Rule', 'No Resolve')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_ip_asn_rule_no_resolve.list`, `${header}\n${data.join('\n').trim()}`)
  }

  writeIpASNResolveRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>) {
    const platform = this.getName()
    const data
    = [...ruleSet.ipASNSet]
      .map((str) => {
        if (str.includes('no-resolve'))
          return str.replace(/\s*,\s*no-resolve\s*/g, '')
        return str
      })
    const header = getHeader(data, 'IP Rule', 'Resolve')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_ip_asn_rule.list`, `${header}\n${data.join('\n').trim()}`)
  }

  writeMITMModeRule(fileName: string, ruleSet: Record<RuleSetNames, Array<string>>) {
    const urlRegexPaths: Array<{ origin: string, processed: string }> = []
    const content = ruleSet.urlRegexSet.flat()

    urlRegexPaths.push(
      ...content
        .filter(i => (
          i.startsWith('URL-REGEX')
          && !i.includes('http://')
        ))
        .map(i => i.split(',')[1])
        .map(i => ({
          origin: i,
          processed: i
            .replaceAll('^https?://', '')
            .replaceAll('^https://', '')
            .replaceAll('^http://', '')
            .split('/')[0]
            .replaceAll('\\.', '.')
            .replaceAll('.+', '*')
            .replaceAll('\\d', '*')
            .replaceAll('([a-z])', '*')
            .replaceAll('[a-z]', '*')
            .replaceAll('([0-9])', '*')
            .replaceAll('[0-9]', '*')
            .replaceAll(/{.+?}/g, '')
            .replaceAll(/\*+/g, '*'),
        })),
    )

    const mitmDomains: Set<string> = new Set() // Special case for parsed failed
    const parsedFailures = new Set()

    const dedupedUrlRegexPaths = [...new Set(urlRegexPaths)]

    dedupedUrlRegexPaths.forEach((i) => {
      const result = getHostnameSafe(i.processed)

      if (result)
        mitmDomains.add(result)
      else
        parsedFailures.add(`${i.origin} ${i.processed} ${result}`)
    })

    const mitmDomainsRegExpArray = Array.from(mitmDomains)
      .slice()
      .filter((i) => {
        return i.length > 3
          && !i.includes('.mp4') // Special Case
          && i !== '(www.)' // Special Case
          && !(i !== '*.meituan.net' && i.endsWith('.meituan.net'))
          && !i.startsWith('.')
          && !i.endsWith('.')
          && !i.endsWith('*')
      })
      .map((i) => {
        return new RegExp(
          escapeRegExp(i)
            .replaceAll('{www or not}', '(www.)?')
            .replaceAll('\\*', '(.*)'),
        )
      })

    const parsedDomainsData: Array<[string, string]> = []
    dedupedUrlRegexPaths.forEach((i) => {
      const result = getHostnameSafe(i.processed)

      if (result) {
        if (matchWithRegExpArray(result, mitmDomainsRegExpArray))
          parsedDomainsData.push([result, i.origin])
        else
          parsedDomainsData.push([result, i.origin])
      }
    })

    function getHostnameSafe(input: string) {
      const res = getHostname(input)
      if (res && /[^\s\w*.-]/.test(res))
        return null
      return res
    }

    function matchWithRegExpArray(input: string, regexps: RegExp[] = []) {
      for (const r of regexps) {
        if (r.test(input))
          return true
      }

      return false
    }

    function escapeRegExp(string = '') {
      const reRegExpChar = /[$()*+.?[\\\]^{|}]/g
      const reHasRegExpChar = new RegExp(reRegExpChar.source)

      return string && reHasRegExpChar.test(string)
        ? string.replaceAll(reRegExpChar, '\\$&')
        : string
    }

    const platform = this.getName()
    if (mitmDomains.size === 0)
      return
    const data: string[] = [...mitmDomains] as string[]
    const header = getHeader(data, 'Surge MITM HostName', 'The current rule contains url-regex rules that may require MITM to take effect')
    writeFileSync(`${this.outputDir}/${platform}/rule/${fileName}_hostname.sgmodule`, `${header}

[MITM]
hostname = %APPEND% ${Array.from(mitmDomains).join(', ')}`)
  }
}
