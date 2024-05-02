import fs from 'node:fs'
import YAML from 'yaml'
import db from '@db/generate/dns'
import { writeFileSync } from '../utils'
import { CONF } from '@/config'
import parseDnsMap from '@/parse/dns'

const defaultList = {
  'dns.google': '8.8.8.8, 8.8.4.4, 2001:4860:4860::8888, 2001:4860:4860::8844',
  'dns64.dns.google': '2001:4860:4860::6464, 2001:4860:4860::64',
  'cloudflare-dns.com': '104.16.249.249, 104.16.248.249, 2606:4700::6810:f8f9, 2606:4700::6810:f9f9',
  '1dot1dot1dot1.cloudflare-dns.com': '1.1.1.1, 1.0.0.1, 2606:4700:4700::1001, 2606:4700:4700::1111',
  'one.one.one.one': '1.1.1.1, 1.0.0.1, 2606:4700:4700::1001, 2606:4700:4700::1111',
  'dns.alidns.com': '223.5.5.5, 223.6.6.6, 2400:3200:baba::1, 2400:3200::1',
  'doh.pub': '1.12.12.12, 120.53.53.53',
  'dot.pub': '1.12.12.12, 120.53.53.53',
  'doh.360.cn': '101.226.4.6, 218.30.118.6, 123.125.81.6, 140.207.198.6, 101.198.198.198',
  'dot.360.cn': '101.226.4.6, 218.30.118.6, 123.125.81.6, 140.207.198.6, 101.198.198.198',
  'dns.twnic.tw': '101.101.101.101, 2001:de4::101, 2001:de4::102',
  'ordns.he.net': '74.82.42.42, 2001:470:20::2',
  'talk.google.com': '108.177.125.188',
  'mtalk.google.com': '108.177.125.188, 2404:6800:4008:c07::bc, 142.250.31.188',
  'alt1-mtalk.google.com': '3.3.3.3, 2607:f8b0:4023:c0b::bc, 64.233.171.188',
  'alt2-mtalk.google.com': '3.3.3.3, 142.250.115.188',
  'alt3-mtalk.google.com': '74.125.200.188, 173.194.77.188',
  'alt4-mtalk.google.com': '74.125.200.188, 173.194.219.188',
  'alt5-mtalk.google.com': '3.3.3.3, 2607:f8b0:4023:1::bc, 142.250.112.188',
  'alt6-mtalk.google.com': '3.3.3.3, 172.217.197.188',
  'alt7-mtalk.google.com': '74.125.200.188, 2607:f8b0:4002:c03::bc, 108.177.12.188',
  'alt8-mtalk.google.com': '3.3.3.3',

  // 阿里云
  '*.alicdn.com': 'server:quic://dns.alidns.com',
  '*.aliyuncs.com': 'server:quic://dns.alidns.com',
  '*.alikunlun.com': 'server:quic://dns.alidns.com',
  '*.alipay.com': 'server:quic://dns.alidns.com',
  '*.alipay.com.cn': 'server:quic://dns.alidns.com',
  '*.alipayobjects.com': 'server:quic://dns.alidns.com',
  '*.alibabausercontent.com': 'server:quic://dns.alidns.com',
  '*.aliyundrive.com': 'server:quic://dns.alidns.com',
  '*.1688.com': 'server:quic://dns.alidns.com',
  'tb.cn': 'server:quic://dns.alidns.com',
  '*.taobao.com': 'server:quic://dns.alidns.com',
  '*.tbcache.com': 'server:quic://dns.alidns.com',
  '*.tmall.com': 'server:quic://dns.alidns.com',
  '*.mmstat.com': 'server:quic://dns.alidns.com',
  '*.aliapp.org': 'server:quic://dns.alidns.com',
  'upos-sz-mirrorali.bilivideo.com': 'server:quic://dns.alidns.com',

  // 腾讯

  '*.qcloud.com': 'server:https://doh.pub/dns-query',
  '*.gtimg.cn': 'server:https://doh.pub/dns-query',
  '*.idqqimg.com': 'server:https://doh.pub/dns-query',
  '*.myqcloud.com': 'server:https://doh.pub/dns-query',
  '*.qpic.cn': 'server:https://doh.pub/dns-query',
  '*.qlogo.cn': 'server:https://doh.pub/dns-query',
  '*.qq.com': 'server:https://doh.pub/dns-query',
  '*.tencent-cloud.net': 'server:https://doh.pub/dns-query',
  '*.tencent.com': 'server:https://doh.pub/dns-query',
  '*.weixinbridge.com ': 'server:https://doh.pub/dns-query',
  '*.weixin.com': 'server:https://doh.pub/dns-query',
  '*.wechat.com': 'server:https://doh.pub/dns-query',
  '*.weiyun.com': 'server:https://doh.pub/dns-query',
  '*.cdn-go.cn': 'server:https://doh.pub/dns-query',
  '*.qcloudimg.com': 'server:https://doh.pub/dns-query',
  'url.cn': 'server:https://doh.pub/dns-query',
  '*.weixinbridge.com': 'server:https://doh.pub/dns-query',

  // 字节 180.184.1.1 或 180.184.2.2
  '*.toutiaocloud.com': 'server:180.184.1.1',
  '*.toutiaopage.com': 'server:180.184.1.1',
  '*.feiliao.com': 'server:180.184.1.1',
  '*.iesdouyin.com': 'server:180.184.1.1',
  '*.pstatp.com': 'server:180.184.1.1',
  '*.snssdk.com': 'server:180.184.1.1',
  '*.bytegoofy.com': 'server:180.184.1.1',
  '*.toutiao.com': 'server:180.184.1.1',
  '*.douyin.com': 'server:180.184.1.1',
  '*.douyinpic.com': 'server:180.184.1.1',
  '*.douyinstatic.com': 'server:180.184.1.1',
  '*.douyinvod.com': 'server:180.184.1.1',
  '*.huoshan.com': 'server:180.184.1.1',
  '*.huoshanzhibo.com': 'server:180.184.1.1',
  '*.ixigua.com': 'server:180.184.1.1',
  '*.byted-static.com': 'server:180.184.1.1',
  // 360
  'so.com': 'server:https://doh.360.cn/dns-query',
  '*.qhimg.com': 'server:https://doh.360.cn/dns-query',
  '*.qhres.com': 'server:https://doh.360.cn/dns-query',
  '*.qhmsg.com': 'server:https://doh.360.cn/dns-query',
  '*.qhupdate.com': 'server:https://doh.360.cn/dns-query',
  '*.360.cn': 'server:https://doh.360.cn/dns-query',
  '*.360safe.com': 'server:https://doh.360.cn/dns-query',
  '*.360webcache.com': 'server:https://doh.360.cn/dns-query',
  '*.360kuai.com': 'server:https://doh.360.cn/dns-query',
  '*.so.com': 'server:https://doh.360.cn/dns-query',
  '*.yunpan.cn': 'server:https://doh.360.cn/dns-query',
  '*.yunpan.com': 'server:https://doh.360.cn/dns-query',
  '*.yunpan.com.cn': 'server:https://doh.360.cn/dns-query',

  '*.googleapis.com': 'server:dns.google',
}

const fileList = db.includeFiles
async function main() {
  const listMap: Map<string, string> = new Map()
  Object.entries(defaultList).forEach(([key, value]) => {
    listMap.set(key, value)
  })
  fileList.forEach((file) => {
    const content = fs.readFileSync(file, 'utf-8')
    const list = parseDnsMap(content)
    list.forEach((value, key) => {
      const exitsValue = listMap.get(key)
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      if (!defaultList[key] && listMap.has(key) && exitsValue !== value)
        console.warn(`${key}已存在记录${exitsValue}，新的记录为：${value}，已跳过`)
      else
        listMap.set(key, value)
    })
  })

  writeClash(listMap)
  writeSurge(listMap)
}

main()

function writeClash(listMap: Map<string, string>) {
  const payload: Record<string, string[]> = {}
  // host 域名映射
  const hostPayload: Record<string, string[]> = {
    'talk.google.com': ['108.177.125.188'],
    'alt8-mtalk.google.com': ['3.3.3.3'],
  }
  listMap.forEach((value, key) => {
    const newValue = value.split(',').map(item => item.trim().replace('server:', '').replace('syslib', 'system'))
    if (newValue.length > 1)
      hostPayload[key] = newValue
    else if (!hostPayload[key])
      payload[key] = newValue
  })

  writeFileSync(`${CONF.outputDir}/clash/surgio/dnsMap.snippet`, YAML.stringify(payload))
  writeFileSync(`${CONF.outputDir}/clash/surgio/dnsMap.hosts.snippet`, YAML.stringify(hostPayload))
}
function writeSurge(listMap: Map<string, string>) {
  const list: string[] = []
  listMap.forEach((value, key) => {
    list.push(`${key} = ${value}`)
  })

  writeFileSync(`${CONF.outputDir}/surge/module/dnsMap.sgmdule`, `#!name=DNS映射
#!desc=1.域名按所属DNS进行分流解析 2.路由器地址使用系统DNS进行解析 3.特殊地址使用规范DNS进行解析 update:${new Date().toISOString()}
#!author=DreamyTZK
#!category=DreamyTZK

[General]
# ---(DNS 服务器)---
# > 通过代理请求使用本地DNS映射结果
use-local-host-item-for-proxy = true

# > 加密DNS服务器
# 使加密DNS请求通过代理策略执行
encrypted-dns-follow-outbound-mode = false

[Host]
${list.join('\n')}
    `)
}
