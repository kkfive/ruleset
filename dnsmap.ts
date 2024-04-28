import fs from 'node:fs'
import { writeFileSync } from './utils'
import db from '@/db/generate.dns'

const fileList = db
async function main() {
  fileList.forEach((fileItem) => {
    const listMap: Map<string, string> = new Map()
    fileItem.includeFiles.forEach((file) => {
      const content = fs.readFileSync(file, 'utf-8')
      const body = content.match(/[^\r\n]+/g)
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
            if (listMap.has(key.trim()) && listMap.get(key.trim()) !== value.trim())
              console.warn(`${key.trim()}重复了,本次值为${value.trim()}，上次值为${listMap.get(key.trim())}`)
            else
              listMap.set(key.trim(), value.trim())
          }
        }
      })
    })
    writeClash(listMap)
    writeSurge(listMap)
  })
}

main()

function writeClash(listMap: Map<string, string>) {
  const list: string[] = []
  listMap.forEach((value, key) => {
    list.push(`${key.replace('*', '+')} : ${value.split(',')[0].replace('server:', '')}`)
  })

  writeFileSync(`./dist/clash/surgio/dnsMap.snippet`, list.join('\n'))
}
function writeSurge(listMap: Map<string, string>) {
  const list: string[] = []
  listMap.forEach((value, key) => {
    list.push(`${key} = ${value}`)
  })

  writeFileSync(`./dist/surge/module/dnsMap.sgmdule`, `#!name=DNS映射
#!desc=1.域名按所属DNS进行分流解析 2.路由器地址使用系统DNS进行解析 3.特殊地址使用规范DNS进行解析
#!author=DreamyTZK
#!category=DreamyTZK

[Host]
${list.join('\n')}
    `)
}
