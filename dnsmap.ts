import fs from 'node:fs'
import { writeFileSync } from './utils'
import db from '@/db/generate.dns'

const fileList = db
const regex = /\[Host\]([^\[]+)/g
async function main() {
  fileList.forEach((fileItem) => {
    const listMap: Map<string, string> = new Map()
    fileItem.includeFiles.forEach((file) => {
      const data = fs.readFileSync(file, 'utf-8')
      const data2 = data.match(regex)?.length ? data.match(regex)![0] : ''
      const lines = data2.replace('[Host]', '').split('\n').filter(i => !!i).filter(i => !(i.startsWith('#') || i.startsWith('//')))
      lines.forEach((line) => {
        line = line.trim()
        const line2 = line.split('=')
        if (line2.length === 2) {
          const isHasMark = line2[1].split('// ')
          const dns = isHasMark.length === 2 ? isHasMark[0].trim() : line2[1].trim()
          listMap.set(line2[0].trim(), dns)
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
