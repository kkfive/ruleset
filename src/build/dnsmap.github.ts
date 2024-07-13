import YAML from 'yaml'
import { CONF } from '@/config'
import { writeFileSync } from '@/utils'

async function getHostContent(): Promise<[[string, string]]> {
  return new Promise((resolve, reject) => {
    fetch('https://raw.githubusercontent.com/521xueweihan/GitHub520/main/hosts.json')
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

function main() {
  const map = new Map<string, string>()

  getHostContent().then((data) => {
    data.forEach(([ip, host]) => {
      map.set(host, ip)
    })
    writeClash(map)
    writeSurge(map)
    writeLoon(map)
  })
}

main()
function writeClash(listMap: Map<string, string>) {
  const payload: Record<string, string[]> = {}
  // host 域名映射
  listMap.forEach((value, key) => {
    const newValue = value.split(',').map(item => item.trim().replace('server:', '').replace('syslib', 'system'))
    payload[key] = newValue
  })

  writeFileSync(`${CONF.outputDir}/clash/surgio/dnsMap.hosts.github.snippet`, YAML.stringify(payload))
}
function writeSurge(listMap: Map<string, string>) {
  const list: string[] = []
  listMap.forEach((value, key) => {
    list.push(`${key} = ${value}`)
  })

  writeFileSync(`${CONF.outputDir}/surge/module/dnsMap.github.sgmdule`, `#!name=Github Host 映射
#!desc=来源于：https://github.com/521xueweihan/GitHub520 update:${new Date().toISOString()}
#!author=DreamyTZK
#!category=DreamyTZK

[General]
# ---(DNS 服务器)---
# > 通过代理请求使用本地DNS映射结果
use-local-host-item-for-proxy = true

[Host]
${list.join('\n')}`)
}

function writeLoon(listMap: Map<string, string>) {
  const list: string[] = []
  listMap.forEach((value, key) => {
    list.push(`${key} = ${value.replace('server:syslib', 'server:system')}`)
  })

  writeFileSync(`${CONF.outputDir}/loon/plugin/dnsMap.plugin`, `#!name==Github Host 映射
#!desc=来源于：https://github.com/521xueweihan/GitHub520 update:${new Date().toISOString()}
#!author=DreamyTZK
#!category=DreamyTZK

[General]


[Host]
${list.join('\n')}`)
}
