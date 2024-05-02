export default function parseDnsMap(content: string) {
  const body = content.match(/[^\r\n]+/g)
  const listMap: Map<string, string> = new Map()

  body?.forEach((x) => {
    x = x
      .trim()
      .replace(/^(#|;|\/\/)\s*/, '#')
      .replace(/\s+[^\s]+\s+url-and-header\s+/, ' url ')
      .replace(/(^[^#].+)\x20+\/\/.+/, '$1')
      .replace(/^#!PROFILE-VERSION-REQUIRED\s+[0-9]+\s+/i, '')
      .replace(/^(#)?host-wildcard\s*,.+/i, '')
      .replace(/^(#)?host(-suffix|-keyword|)?\s*,\s*/i, '$1DOMAIN$2,')
      .replace(/^(#)?ip6-cidr\s*,\s*/i, '$1IP-CIDR6,')
      .replace('server:system', 'server:syslib')

    const result = /^#?(?:\*|localhost|[-*?0-9a-z]+\.[-*.?0-9a-z]+)\s*=\s*(?:sever\s*:\s*|script\s*:\s*)?[\s0-9a-z:/,.]+$/g.test(x)
    const result2 = /^(?:#\s*)?(?:\*|localhost|(?:(?:[\w?*-]+\.)+(?:[\w-]+))|\b(?:(?:\d{1,3}\.){3}\d{1,3}(?:\.in-addr\.arpa)?)\b)\s*=\s*(?:server\s*:|script\s*:)?\s*(?:https?|quic|system):\/\/(?:(?:[\w-]+\.)+[\w-]+|(?:\d{1,3}\.){3}\d{1,3})(?::\d+)?\/?(?:[^\s#]*)(?:\?[^\s#]*)?$/g.test(x)

    if (!x.startsWith('#')) {
      if (result || result2) {
        const [key, value] = x.split('=')
        listMap.set(
          key.trim(),
          value.trim()
            .replace('server:quic://223.6.6.6:853', 'server:quic://dns.alidns.com')
            .replace('server:quic://223.5.5.5:853', 'server:quic://dns.alidns.com')
            .replace('https://101.198.198.198/dns-query', 'https://doh.360.cn/dns-query')
            .replace('server:119.29.29.29', 'server:https://doh.pub/dns-query')
            .replace('server:https://120.53.53.53/dns-query', 'server:https://doh.pub/dns-query'),
        )
      }
    }
  })
  return listMap
}
